import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gists: [],
};

const gistsSlice = createSlice({
    name: "gists",
    initialState,
    reducers: {
        setToEmpty(state, action) {
            state.gists = [];
        },
        setGists(state, action) {
            state.gists = action.payload.gists;
        }
      },
});

export const { setGists } = gistsSlice.actions;
export default gistsSlice.reducer;