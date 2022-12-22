import { configureStore } from "@reduxjs/toolkit";
import appDataReducer from './slices/app-slice';

const store = configureStore({
    reducer: {
        store : appDataReducer
    }
});

export default store;
