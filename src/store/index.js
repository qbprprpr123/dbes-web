import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import userSliceReducer from './features/userSlice';

export default configureStore({
  reducer: {
    user: userSliceReducer,
  },
  middleware: [reduxLogger, reduxPromise, reduxThunk],
});
