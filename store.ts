import { configureStore } from '@reduxjs/toolkit';
import auth from 'reducers/auth';
import search from 'reducers/search';

export default configureStore({
  reducer: {
    auth: auth.reducer,
    search: search.reducer,
  },
});
