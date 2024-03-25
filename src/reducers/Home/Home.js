import { Description } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosRequest } from "../../utils/axiosRequest";
import {
  getById,
  getData,
  getStories,
  getStoriesById,
  getUsers,
  getYourProfile,
} from "../../api/home/home";

export const Home = createSlice({
  name: "Home",
  initialState: {
    value: 0,
    data: [],
    data2: [],
    // getByIdData: [],
    data3: null,
    stories: [],
    storiesById: [],
    dataYour: [],
    loading: false,
    loadingData2: false,
    loadingYour: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getById.fulfilled, (state, action) => {
      state.data3 = action.payload;
    });
    builder.addCase(getData.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.loadingData2 = false;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data2 = action.payload;
      state.loadingData2 = false;
    });
    builder.addCase(getStories.fulfilled, (state, action) => {
      state.stories = action.payload;
    });
    builder.addCase(getYourProfile.pending, (state, action) => {
      state.loadingYour = true;
    });
    builder.addCase(getYourProfile.fulfilled, (state, action) => {
      state.dataYour = action.payload;
      state.loadingYour = false;
    });
    builder.addCase(getStoriesById.fulfilled, (state, action) => {
      state.storiesById = action.payload;
    });
  },
});

export const { loading } = Home.actions;

export default Home.reducer;
