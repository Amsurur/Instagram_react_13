import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "../reducers/Message/Message";
import { videoReels } from "../reducers/reels/Reelse";

export const store = configureStore({
  reducer: {
    reels: videoReels,
    message: counterSlice
  },
});
