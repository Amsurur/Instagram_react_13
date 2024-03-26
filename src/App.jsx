import React from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Reels from "./pages/Reels/Reels";
import Message from "./pages/Message/Message";
import Natification from "./pages/natification/Natification";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import Registration from "./pages/Registration/Registration";
import AuthCheck from "./utils/AuthChek";
import ProtectedRoute from "./utils/ProtectedRoute";
import EditProfile from "./pages/editProfile/editProfile";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthCheck>
          <Login />
        </AuthCheck>
      ),
    },
    {
      path: "/basic",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "reels",
          element: <Reels />,
        },
        {
          path: "message/*",
          element: <Message />,
        },
        {
          path: "notifications",
          element: <Natification />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/editProfile", // Correct casing
          element: <EditProfile />,
        },
        {
          path: "profile/account/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/Registration",
      element: (
        <AuthCheck>
          <Registration />
        </AuthCheck>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};
