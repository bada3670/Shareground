import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  auth: {
    status: string;
    id: string | null;
    name: string | null;
    photo: string | null;
    wrote: string[];
    bookmark: string[];
  };
}

export const authStatus = {
  loading: 'loading',
  fetched: 'fetched',
  failed: 'failed',
};

export default createSlice({
  // This name will be applied to 'type' of 'action'.
  name: 'auth',
  initialState: {
    status: 'loading',
    id: null,
    name: null,
    photo: null,
    wrote: [],
    bookmark: [],
  },
  // Don't forget to write 'payload'.
  reducers: {
    changeAll(state, action) {
      state.status = action.payload.status;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.wrote = action.payload.wrote;
      state.bookmark = action.payload.bookmark;
    },
    changeName(state, action) {
      state.name = action.payload.name;
    },
    changePhoto(state, action) {
      state.photo = action.payload.photo;
    },
    changeWrote(state, action) {
      state.wrote = action.payload.wrote;
    },
  },
});
