// React modules
import { User } from '../models/user'; 
import { createAsyncThunk } from '@reduxjs/toolkit';

// External modeuls/
import axios from 'axios';

export const UserService = {
  signup: createAsyncThunk(
    'user/signup',
    async (credentials, {rejectWithValue})=>{
      try {
        const resp = await axios.post('/users/signup', credentials);
        return resp.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  ),
  signin: createAsyncThunk(
    'user/signin',
    async (credentials, {rejectWithValue})=>{
      try {
        const resp = await axios.post('/users/signin', credentials);
        return resp.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  ),
  
  retrieve: createAsyncThunk(
    'user/retrieve',
    async (userId: any, {rejectWithValue})=>{
      try {
        const resp = await axios.get(`/users/${userId}`);
        return resp.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  ),

  update: createAsyncThunk(
    'user/update',
    async (user: User, {rejectWithValue})=>{
      try {
        if (user.pk === 0) {
          //
        }
        const resp = await axios.patch(`/users/${user.pk}`, user);
        return resp.data;
      } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data);
      }
    }
  )
}