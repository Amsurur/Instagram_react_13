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

export const getusers = createAsyncThunk("userprofil/getusers", async (id) => {
  try {
    const { data } = await axiosRequest.get(`User/get-users?PageSize=2000`);
    return data.data;
  } catch (error) {
    // console.log(error);
  }
});

export const subscribeer = createAsyncThunk("userprofil/userProf", async (id,{dispatch}) => {
  try {
    const { data } = await axiosRequest.post(
      `FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`
    );
    dispatch(userProf(id))
    
  } catch (error) {
    console.log(error);
  }
})
export const UserProfile = createSlice({
  name: "userprofil",
  initialState: {
    value: 0,
    data: [],
    users:[]
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
    builder.addCase(getusers.fulfilled, (state, action) => {
      state.users = action.payload
    })
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = UserProfile.actions;

export default UserProfile.reducer;
