import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

export const getData = createAsyncThunk("todo/getData", async (text) => {
  try {
    const { data } = await axiosRequest.get(`User/get-users?UserName=${text}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const Data = createAsyncThunk("todo/Data", async (text) => {
  try {
    const { data } = await axiosRequest.get(`Chat/get-chats`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
export const addchat = createAsyncThunk(
  "todo/Data",
  async (text, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(
        `Chat/create-chat?receiverUserId=${text}`
      );
      dispatch(Data());
    } catch (error) {
      console.log(error);
    }
  }
);
