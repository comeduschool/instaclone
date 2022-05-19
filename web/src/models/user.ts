import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserService } from '../services/UserService';

export interface User{
  pk: number;
  email: string;
  username: string;
  profile: string|null;
  description: string;
  updated: string;
}

export interface UserState {
  user: User;
  error: any;
  loading: boolean;
};

export const InitUser: User = {
  pk: 0,
  email: "",
  username: "",
  profile: "",
  description: "",
  updated: ""
}

export const InitUserState: UserState = {
  user: InitUser,
  error: null,
  loading: false
}

export const UserSlice = createSlice({
  name: "user",
  initialState: InitUserState,
  reducers: {
    UpdateUser: (state: UserState, { payload }: PayloadAction<User>)=> {
      state.user = {...payload}
    },
  },
  extraReducers: {
    [UserService.retrieve.pending.type]: (state, { payload }: PayloadAction<User>) =>{
      state.loading = true;
      state.user = InitUser;
      state.error = null;
    },
    [UserService.retrieve.fulfilled.type]: (state, { payload }: PayloadAction<User>) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    },
    [UserService.retrieve.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.loading = false;
      state.user = InitUser;
      state.error = payload;
    }
  }
});

export const { UpdateUser } = UserSlice.actions;
export default UserSlice.reducer;