import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import reduxPromise from 'redux-promise';
import userSliceReducer from './features/userSlice';

export default configureStore({
  reducer: {
    user: userSliceReducer,
  },
  middleware: [reduxLogger, reduxPromise],
});
