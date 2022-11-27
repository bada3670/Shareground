import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  auth: {
    list: {
      id: string;
      title: string;
    };
  };
}

export default createSlice({
  // This name will be applied to 'type' of 'action'.
  name: 'search',
  initialState: {
    list: [],
  },
  // Don't forget to write 'payload'.
  reducers: {
    add(state, action) {
      state.list = action.payload.list;
    },
  },
});
