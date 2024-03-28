import { createSlice } from "@reduxjs/toolkit";
import {
  getComment,
  getPostById,
  getReels,
  getUsers,
  likeReel,
} from "../../api/reels/Reels";

export const videoReels = createSlice({
  name: "reels",
  initialState: {
    cnt: 0,
    data: [],
    user: [],
    byId: [],
    commentData: [],
    setComment: "",
    users: [],
    // followingsUser: [],
    // followersUser: [],
  },
  reducers: {
    setComment: (state, action) => {
      state.setComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReels.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(likeReel.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.byId = action.payload;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.commentData = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    // builder.addCase(getComment.fulfilled, (state, action) => {
    //   state.data = action.payload;
    // });
    // builder.addCase(getLike.fulfilled, (state, action) => {
    //   state.user = action.payload;
    // });
  },
});

export const { setComment } = videoReels.actions;

export default videoReels.reducer;
