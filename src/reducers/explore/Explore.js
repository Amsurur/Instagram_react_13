import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, getUsers } from "../../api/ExploreApi/ExploreApi";

export const exploreSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default exploreSlice.reducer;
