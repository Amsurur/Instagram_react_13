import { configureStore,  } from "@reduxjs/toolkit";
import  counterSlice  from "../reducers/Message/Message";

import Home from "../reducers/Home/Home";

import { videoReels } from "../reducers/reels/Reelse";
import { postSlice } from "../reducers/post/post";
import searchSlice from "../api/search/searchSlice";

export const store = configureStore({
  reducer: {
    reels: videoReels,
    message: counterSlice,
    post: postSlice,
    todo:searchSlice,
                                        Home: Home,

  },

});

