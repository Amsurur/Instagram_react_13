import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "../reducers/Message/Message";

export const store = configureStore({
  reducer: {
    message: counterSlice
  },
});
