import React from "react";
import { axiosRequest } from "../../utils/axiosRequest";
import { saveToken } from "../../utils/token";
import { Link, useNavigate } from "react-router-dom";

import phone from "./2phone1.png";
import left from "./left.png";
import right from "./right.png";
import instLogo from "./instLogo.png";
import insText from "./insText.png";
const Registration = () => {
  let navigate = useNavigate();

  async function handleRegistration(e) {
    e.preventDefault();

    const formData = {
      userName: e.target.userName.value,
      password: e.target.password.value,
      email: e.target.email.value,
      fullName: e.target.fullName.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    try {
      const response = await axiosRequest.post("Account/register", formData);
      const { data, statusCode } = response.data;

      if (statusCode === 200) {
        saveToken(data);
        navigate("/home");
      } else {
        console.error("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="bg-white">
      <div className="w-[90%] pt-[10px] grid grid-cols-2 items-center m-auto">
        <div className="flex flex-col items-center">
          <img className="w-[340px] h-[490px]" src={phone} alt="" />
          <p className="text-[#64748B] text-[17px]">Get the app</p>
          <div className="flex items-center gap-[10px] pt-[30px]">
            <img src={left} alt="" />
            <img src={right} alt="" />
          </div>
        </div>
        <div className="flex items-center justify-center h-screen">
          <form
            onSubmit={handleRegistration}
            className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="flex justify-center items-center">
              <img src={instLogo} alt="" />
              <img src={insText} alt="" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userName"
              >
                Username
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                type="text"
                name="userName"
                id="userName"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                type="password"
                name="password"
                id="password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                type="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                type="text"
                name="fullName"
                id="fullName"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
              />
            </div>
            <div className="flex flex-col items-center justify-between">
              <Link
                to={"/"}
                className="bg-blue-600 w-[380px] mb-[10px] hover:bg-blue-700 text-white font-bold py-2 px-4 text-center rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="submit"
              >
                Sign Up
              </Link>
              <Link
                to={"/"}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition duration-300 ease-in-out"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
