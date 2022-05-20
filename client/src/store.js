import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import accessTokenSlice from './features/accessTokenSlice';
import userSlice from './features/userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers(
    {
        accessToken: accessTokenSlice
        ,user: userSlice
    }
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        //   ignoredActionPaths: ['payload.NFT','payload.Marketplace'],
        },
        // serializableCheck: false,
    }),
});