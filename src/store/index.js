import { configureStore } from '@reduxjs/toolkit';
import gistsReducer from "./gists/gists-slice";

const store = configureStore({
    reducer: {
        gists: gistsReducer
    },
});

export default store;