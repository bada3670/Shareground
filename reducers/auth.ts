import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  auth: {
    id: string | null;
    name: string | null;
    photo: string | null;
  };
}

export default createSlice({
  // This name will be applied to 'type' of 'action'.
  name: 'auth',
  initialState: {
    id: null,
    name: null,
    photo: null,
  },
  // Don't forget to write 'payload'.
  reducers: {
    changeAll(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
    },
    changeName(state, action) {
      state.name = action.payload.name;
    },
    changePhoto(state, action) {
      state.photo = action.payload.photo;
    },
  },
});
