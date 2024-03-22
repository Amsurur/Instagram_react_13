import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getToken } from "../../utils/token";

export const getData = createAsyncThunk("Home/getData", async () => {
  let userId = getToken().sid;
  try {
    const { data } = await axiosRequest.get(
      `Post/get-following-post?UserId=${userId}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("Home/like", async (id, { dispatch }) => {
  try {
    const { data } = await axiosRequest.post(`Post/like-post?postId=${id}`);
    dispatch(getData());
  } catch (error) {
    console.error(error);
  }
});


export const getUsers = createAsyncThunk("Home/getUsers", async () => {
  try {
    const { data } = await axiosRequest.get(`User/get-users`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
