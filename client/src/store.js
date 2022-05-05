import { configureStore } from '@reduxjs/toolkit'

import accessTokenSlice from './features/accessTokenSlice';
import userSlice from './features/userSlice';

export default configureStore({
  reducer: 
  {
      accessToken: accessTokenSlice
      ,user: userSlice
  }
});