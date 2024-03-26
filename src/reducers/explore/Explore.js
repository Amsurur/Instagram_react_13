import { createSlice } from "@reduxjs/toolkit";
import {
  getData,
  getpostById,
  getUsers,
} from "../../api/ExploreApi/ExploreApi";

export const exploreSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    ById: [],
    users: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getpostById.fulfilled, (state, action) => {
      state.ById = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
export const { setComment } = exploreSlice.actions;

export default exploreSlice.reducer;
