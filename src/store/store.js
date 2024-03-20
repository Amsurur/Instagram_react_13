import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "../reducers/Message/Message";
import Home from "../reducers/Home/Home";

export const store = configureStore({
  reducer: {
    message: counterSlice,
    Home: Home,
  },
});
