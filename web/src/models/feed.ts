import { createSlice } from '@reduxjs/toolkit';

export interface FeedState {
    modal: boolean;
}

export const InitFeedState: FeedState = {
    modal: false,
}

export const FeedSlice = createSlice({
    name: 'feed', 
    initialState: InitFeedState,
    reducers: {
        ShowModal: (state: FeedState) => {
            state.modal = true;
        },
        HideModal: (state: FeedState) => {
            state.modal = false;
        },
    }
});

export const { 
    ShowModal,
    HideModal
} = FeedSlice.actions;

export default FeedSlice.reducer;