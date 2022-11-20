import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import { setGists } from './gists-slice';

export const fetchGists = createAsyncThunk("fetchGists", async ({page = null, per_page = null, user}, thunkAPI) => {
    const options = {
        url: `https://api.github.com/users/${user}/gists`,
        method: "GET",
        params: {per_page, page},
    }

    try {
        const response = await axios(options);
        const data = response.data;
        thunkAPI.dispatch(setGists({ gists: data }));
    } catch (e)
    {
        console.log(e);
        return thunkAPI.rejectWithValue({error: true, message: "SomethingWentWrong"});
    }
})

export const fetchOneGist = createAsyncThunk("fetchOneGist", async ({}, thunkAPI) => {
    const options = {
        url: `https://gist.githubusercontent.com/emreoemreo/f3be3fd2d3ab34da6cfd9988841abaec/raw/4bd45e606c3fa24fea9b56d0cca15d99e679daa9/UIPanelFader`,
        method: "GET",
    }

    try {
        console.log("here")
        const response = await axios(options);
        const data = response.data;
        console.log(response);
        // thunkAPI.dispatch(setGists({ gists: data }));
    } catch (e)
    {
        console.log(e);
        return thunkAPI.rejectWithValue({error: true, message: "SomethingWentWrong"});
    }
})