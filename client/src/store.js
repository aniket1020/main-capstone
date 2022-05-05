import { configureStore } from '@reduxjs/toolkit'

import accessTokenSlice from './features/accessTokenSlice';
import walletAddressSlice from './features/walletAddressSlice';

export default configureStore({
  reducer: 
  {
      accessToken: accessTokenSlice
      ,walletAddress: walletAddressSlice
  }
});