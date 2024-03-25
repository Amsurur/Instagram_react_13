import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
import { getToken } from "../../utils/token";

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
export const chatData = createAsyncThunk("todo/chatData", async (id) => {
  console.log(id);
  try {
    const { data } = await axiosRequest.get(
      `/Chat/get-chat-by-id?chatId=${id}`
    );
    return data.data.reverse();
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

export const deleteChat = createAsyncThunk(
  "todo/deleteChat",
  async (id, { dispatch }) => {
    try {
      let { data } = await axiosRequest.delete(`Chat/delete-chat?chatId=${id}`);
      dispatch(getUser());
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "todo/deleteMessage",
  async ({ id, chatId }, { dispatch }) => {
    try {
      let { data } = await axiosRequest.delete(
        `Chat/delete-message?massageId=${id}`
      );
      dispatch(chatData(chatId));
    } catch (error) {
      console.error(error);
    }
  }
);
