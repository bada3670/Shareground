import { createSlice } from '@reduxjs/toolkit';

export interface Item {
  id: string;
  title: string;
}

export interface SearchState {
  search: {
    list: Item[];
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
