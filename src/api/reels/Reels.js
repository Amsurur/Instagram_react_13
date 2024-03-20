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
