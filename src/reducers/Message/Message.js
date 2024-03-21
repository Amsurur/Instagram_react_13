import { Description } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosRequest } from "../../utils/axiosRequest";
import { getData, Data, chatData } from "../../api/Message/messageApi";

export const counterSlice = createSlice({
  name: "todo",
  initialState: {
    value: 0,
    data: [],
    data1: [],
    data2: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(Data.fulfilled, (state, action) => {
      state.data1 = action.payload;
    });
    builder.addCase(chatData.fulfilled, (state, action) => {
      state.data2 = action.payload;
    });
  },
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
