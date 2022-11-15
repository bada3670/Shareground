import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  // This name will be applied to 'type' of 'action'.
  name: 'auth',
  initialState: {
    id: null,
    name: null,
    photo: null,
  },
  reducers: {
    changeID(state, action) {
      state.id = action.payload.id;
    },
    changeName(state, action) {
      // Don't forget to write 'payload'.
      state.name = action.payload.name;
    },
    changePhoto(state, action) {
      state.photo = action.payload.photo;
    },
  },
});
