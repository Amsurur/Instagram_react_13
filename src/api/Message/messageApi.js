import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

export const getData = createAsyncThunk("todo/getData", async (text) => {
  try {
    const { data } = await axiosRequest.get(`User/get-users?UserName=${text}`);
    return data.data
  } catch (error) {
    console.log(error);
  }
});