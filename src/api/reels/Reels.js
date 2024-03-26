import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { videoReels } from "../../reducers/reels/Reelse";

export const postComment = createAsyncThunk(
  "reels/postComment",
  async function (obj, { dispatch }) {
    try {
      const { data } = await axiosRequest.post("Post/add-comment", obj);
      dispatch(getComment());
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
    const { data } = await axiosRequest.get("Post/get-reels?PageSize=2000");

    return data.data;
  } catch (error) {
    console.log(error);
  }
});
export const getUsers = createAsyncThunk("reels/getUsers", async () => {
  try {
    let { data } = await axiosRequest.get(`User/get-users?PageSize=2000`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});
export const getPostById = createAsyncThunk("reels/getPostById", async (id) => {
  try {
    let { data } = await axiosRequest.get(`Post/get-post-by-id?id=${id}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});
// export const  getCommentByid = createAsyncThunk("reels/getCommenById", async (id, { dispatch }) => {
//  try {
//   let {data}= await axiosRequest.get()
//  } catch (error) {

//  }
// }
export const addPostFavorite = createAsyncThunk(
  "reels/addPostFavorite",
  async (postId, { dispatch }) => {
    let user = {
      postId: postId,
    };
    try {
      let { data } = await axiosRequest.post(`Post/add-post-favorite`, user);
      dispatch(getReels(postId));
    } catch (error) {
      console.error(error);
    }
  }
);
export const postFolow = createAsyncThunk(
  "reels/postFolow",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(
        `FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`
      );
      dispatch(getReels());
    } catch (error) {
      console.error(error);
    }
  }
);

export const likeReel = createAsyncThunk(
  "reels/likeReel",
  async (Id, dispatch) => {
    try {
      const { data } = await axiosRequest.post(`Post/like-post?postId=${Id}`);
      dispatch(getReels());
    } catch (error) {
      console.log(error);
    }
  }
);
export const AddComent = createAsyncThunk("reels/addComent", async (user,{dispatch}) => {
  let obj = {
    comment: user.com,
    postId: user.id,
  };
  try {
    const { data } = await axiosRequest.post(`Post/add-comment`, obj);
    dispatch(getPostById(user.id));
  } catch (error) {
    console.log(error);
  }
});
