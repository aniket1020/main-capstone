import { createSlice } from '@reduxjs/toolkit';

export const walletAddressSlice = createSlice
({
    name: 'walletAddress'
    ,initialState: 
    {
        value: null,
    }
    ,reducers: 
    {
      setWalletAddress: (state, action) => {state.value = action.payload}
    }
});

export const { setWalletAddress } = walletAddressSlice.actions;

export default walletAddressSlice.reducer;