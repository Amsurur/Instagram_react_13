import { configureStore } from "@reduxjs/toolkit";
import { videoReels } from "../reducers/reels/Reelse";

export const store = configureStore({
  reducer: {
    reels: videoReels,
  },
});
