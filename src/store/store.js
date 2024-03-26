import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/Message/Message";
<<<<<<< HEAD

import Home from "../reducers/Home/Home";
=======
>>>>>>> 6c9f86080e3d862fad8a06ea88df419701898a70

import videoReels from "../reducers/reels/Reelse";
import { postSlice } from "../reducers/post/post";
import searchSlice from "../api/search/searchSlice";
import Home from "../reducers/Home/Home";

export const store = configureStore({
  reducer: {
    reels: videoReels,
    message: counterSlice,
    Home: Home,
    post: postSlice,
    todo: searchSlice,
<<<<<<< HEAD
    Home: Home,
=======
>>>>>>> 6c9f86080e3d862fad8a06ea88df419701898a70
  },
});
