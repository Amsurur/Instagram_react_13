import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

export const userProf = createAsyncThunk("userprofil/userProf", async (id) => {
  try {
    const { data } = await axiosRequest.get(
      `UserProfile/get-user-profile-by-id?id=${id}`
    );
    return data.data
  } catch (error) {
    // console.log(error);
  }
});

export const UserProfile = createSlice({
  name: "userprofil",
  initialState: {
    value: 0,
    data: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userProf.fulfilled, (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = UserProfile.actions;

export default UserProfile.reducer;
