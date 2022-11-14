import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  // This name will be applied to 'type' of 'action'.
  name: 'auth',
  initialState: {
    name: null,
    photo: null,
  },
  reducers: {
    changeName(state, action) {
      // Don't forget to write 'payload'.
      state.name = action.payload.name;
    },
    changePhoto(state, action) {
      state.photo = action.payload.photo;
    },
  },
});
