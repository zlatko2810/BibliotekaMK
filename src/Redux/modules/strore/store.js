

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

export const storeGenerator = (initialState) => { // Export storeGenerator as a named export
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(epicMiddleware),
        preloadedState: initialState,
        devTools: process.env.NODE_ENV !== 'production',
    });

    return store;
};
