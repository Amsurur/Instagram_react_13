import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

export const getData = createAsyncThunk("todo/getData", async () => {
  try {
    const { data } = await axiosRequest.get("Post/get-posts");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUsers = createAsyncThunk("todo/getUsers", async () => {
  try {
    const { data } = await axiosRequest.get("User/get-users");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
