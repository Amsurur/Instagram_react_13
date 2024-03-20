import { Description } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosRequest } from "../../utils/axiosRequest";
import { getData, getUsers } from "../../api/home/home";

export const Home = createSlice({
  name: "Home",
  initialState: {
    value: 0,
    data: [],
    data2: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data2 = action.payload;
    });
  },
});

export const {} = Home.actions;

export default Home.reducer;
