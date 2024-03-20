import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
// import axiosRequest from "../../src/utils/axiosRequest";

export const getReels = createAsyncThunk("reels/getReels", async () => {
  try {
    const { data } = await axiosRequest.get("Post/get-reels");
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const likeReel = createAsyncThunk(
  "reels/likeReel",
  async (postId, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(
        `Post/like-post?postId=${postId}`
      );
      dispatch(getReels(postId));
    } catch (error) {
      console.log(error);
    }
  }
);
