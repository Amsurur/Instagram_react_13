import { Description } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosRequest } from "../../utils/axiosRequest";
import { getData } from "../../api/Message/messageApi";

export const counterSlice = createSlice({
  name: "todo",
  initialState: {
    value: 0,
    data: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
