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