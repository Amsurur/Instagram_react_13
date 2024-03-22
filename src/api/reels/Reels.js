import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
// import axiosRequest from "../../src/utils/axiosRequest";
let idx = null;



export const postComment = createAsyncThunk(
  "reels/postComment",
  async function (e, { dispatch }) {
    try {
      const { data } = await axiosRequest.post("Post/add-comment", {
        comment: e.comment,
        postId: e.postId,
      });

      dispatch(getComment(idx));
    } catch (error) {
      console.error(error);
    }
  }
);

export const getComment = createAsyncThunk("reels/getComment", async () => {
  try {
    const { data } = await axiosRequest.get("Post/get-reels");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
export const getReels = createAsyncThunk("reels/getReels", async () => {
  try {
    const { data } = await axiosRequest.get("Post/get-reels");

    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const likeReel = createAsyncThunk(
  "reels/likeReel",
  async (Id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(`Post/like-post?postId=${Id}`);
      console.log(Id, "jdjfkdjfkdj");
      dispatch(getReels(Id));
    } catch (error) {
      console.log(error);
    }
  }
);
export const AddComent = createAsyncThunk("reels/addComent", async () => {
  try {
    const { data } = await axiosRequest.post(`Post/add-comment`);
  } catch (error) {
    console.log(error);
  }
});
