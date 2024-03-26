import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

export const getData = createAsyncThunk("explore/getData", async () => {
  try {
    const { data } = await axiosRequest.get("Post/get-posts");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

let idx = null;
export const getpostById = createAsyncThunk(
  "explore/getpostById",
  async (id) => {
    try {
      let { data } = await axiosRequest.get(`Post/get-post-by-id?id=${id}`);
      idx = id;
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addLike = createAsyncThunk(
  "explore/addLike",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(`Post/like-post?postId=${id}`);
      dispatch(getpostById(idx));
    } catch (error) {
      console.error(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "explore/addComment",
  async (newComment, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post("Post/add-comment", {
        comment: newComment.comment,
        postId: newComment.postId,
      });
      dispatch(getpostById(idx));
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUsers = createAsyncThunk("explore/getUsers", async () => {
  try {
    const { data } = await axiosRequest.get(`User/get-users`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteComment = createAsyncThunk(
  "explore/deleteComment",
  async (id) => {
    try {
      const { data } = await axiosRequest.delete(
        `Post/delete-comment?commentId=${id}`
      );
    } catch (error) {
      console.error(error);
    }
  }
);

export const postFollowingRelationShip = createAsyncThunk(
  "explore/postFollowingRelationShip",
  async (id) => {
    try {
      const { data } = await axiosRequest.post(
        `FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`
      );
    } catch (error) {
      console.error(error);
    }
  }
);

{
  /* <h1 className="">{ById?.title}</h1> */
}
