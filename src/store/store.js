import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/Message/Message";

import videoReels from "../reducers/reels/Reelse";
import { postSlice } from "../reducers/post/post";
import searchSlice from "../api/search/searchSlice";
import Explore from "../reducers/explore/Explore";
import Home from "../reducers/Home/Home";

export const store = configureStore({
  reducer: {
    reels: videoReels,
    message: counterSlice,
    Home: Home,
    post: postSlice,

    search:searchSlice,
    Home: Home,

    explore: Explore,

  },
});
