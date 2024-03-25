import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getToken } from "../../utils/token";
import { loading } from "../../reducers/Home/Home";

export const getData = createAsyncThunk("Home/getData", async () => {
  let userId = getToken().sid;
  // loading = false;
  try {
    const { data } = await axiosRequest.get(
      `Post/get-following-post?UserId=${userId}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUsers = createAsyncThunk("Home/getUsers", async () => {
  try {
    const { data } = await axiosRequest.get(`User/get-users?PageSize=400`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getYourProfile = createAsyncThunk(
  "Home/getYourProfile",
  async () => {
    let id = getToken().sid;
    try {
      let { data } = await axiosRequest.get(
        `UserProfile/get-user-profile-by-id?id=${id}`
      );
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postFolow = createAsyncThunk(
  "Home/postFolow",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.post(
        `FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`
      );
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  }
);

export const getById = createAsyncThunk("Home/getById", async (id) => {
  try {
    let { data } = await axiosRequest.get(`Post/get-post-by-id?id=${id}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const getStories = createAsyncThunk("Home/getStories", async () => {
  let userId = getToken().sid;
  try {
    let { data } = await axiosRequest.get(`Story/get-stories?userId=${userId}`);
    return data.data[0];
  } catch (error) {
    console.error(error);
  }
});

export const getStoriesById = createAsyncThunk(
  "Home/getStoriesById",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.get(`Story/GetStoryById?id=${id}`);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const postLikeStory = createAsyncThunk("Home/postLikeStory", async (id,{dispatch}) => {
  try {
    let { data } = await axiosRequest.post(`Story/LikeStory?storyId=${id}`);
    dispatch(getStoriesById(id))
  } catch (error) {
    console.error(error);
  }
})

export const addComment = createAsyncThunk(
  "Home/addComment",
  async (obj, { dispatch }) => {
    let comments = {
      comment: obj.comment,
      postId: obj.postId,
    };
    try {
      const { data } = await axiosRequest.post(`Post/add-comment`, comments);
      dispatch(getById(obj.postId));
    } catch (error) {
      console.error(error);
    }
  }
);
export const likePost = createAsyncThunk(
  "Home/like",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(`Post/like-post?postId=${id}`);
      dispatch(getData());
      dispatch(getById(id));
    } catch (error) {
      console.error(error);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "Home/addFavorite",
  async (id, { dispatch }) => {
    let user = {
      postId: id,
    };
    try {
      let { data } = await axiosRequest.post(`Post/add-post-favorite`, user);
      dispatch(getById(id));
    } catch (error) {
      console.error(error);
    }
  }
);
// export const
