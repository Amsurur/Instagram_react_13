import React, { useState } from "react";
import phone from "./2phone1.png";
import left from "./left.png";
import right from "./right.png";
import instLogo from "./instLogo.png";
import insText from "./insText.png";
import { useNavigate } from "react-router-dom";
import facebook from "./facebook.png";
import { axiosRequest } from "../../utils/axiosRequest";
import { saveToken } from "../../utils/token";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const userName = e.target["userName"].value;
    const password = e.target["password"].value;

    if (!userName || !password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    try {
      const { data } = await axiosRequest.post("Account/login", {
        userName,
        password,
      });
      if (data.statusCode === 200) {
        saveToken(data.data);
        navigate("/basic");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-white">
      <div className="w-[90%] pt-[10px] grid grid-cols-2 items-center m-auto">
        <div className=" flex flex-col items-center">
          <img className="w-[340px] h-[490px]" src={phone} alt="" />
          <p className="text-[#64748B] text-[17px]">Get the app</p>
          <div className="flex items-center gap-[10px] pt-[30px]">
            <img src={left} alt="" />
            <img src={right} alt="" />
          </div>
        </div>
        <div className="flex justify-center flex-col items-center h-screen">
          <form
            onSubmit={handleLogin}
            className="h-[480px] w-[400px] items-center flex flex-col p-8 rounded-[12px] border border-[#E2E8F0]"
          >
            <div className="flex justify-center items-center">
              <img src={instLogo} alt="" />
              <img src={insText} alt="" />
            </div>
            <div className="flex flex-col gap-[17px] pt-[40px]">
              <input
                className="input-field w-[320px] flex border border-gray-300 rounded-[12px] h-[56px] px-3 py-2 focus:outline-none focus:border-blue-500"
                type="text"
                name="userName"
                placeholder="Username"
              />

              <input
                className="input-field mb-[10px] w-[320px] border border-gray-300 rounded-[12px] h-[56px] px-3 py-2 focus:outline-none focus:border-blue-500"
                type="password"
                name="password"
                placeholder="Password"
              />

              {/* {errorMessage && (
              <div className="text-red-600 text-center text-sm mt-2">
                {errorMessage}
              </div>
            )} */}
              <button
                type="submit"
                className="btn w-[320px] bg-blue-500 h-[48px] rounded-[12px] hover:bg-blue-600 text-white font-semibold py-2 px-4"
              >
                Log in
              </button>
            </div>
            <p className="pt-[10px] text-[#3B82F6] text-[16px] font-[500]">
              Forgot password?
            </p>
            <div className="flex pb-[10px] pt-[20px] justify-between gap-[5px] items-center">
              <p className="h-[1.5px] bg-[#E2E8F0] w-[140px]"></p>
              <p className="pb-[5px]">or</p>
              <p className="h-[1.5px] bg-[#E2E8F0] w-[140px]"></p>
            </div>
            <div className="flex items-center gap-[10px]">
              <img src={facebook} alt="" />
              <p>Log in with Facebook</p>
            </div>
          </form>
          <div className="h-[70px] w-[400px] border border-[#E2E8F0] rounded-[12px] mt-[15px] flex items-center justify-center">
            <p>
              Don't have an account?{" "}
              <a href="./Registration" className="text-[#3B82F6]">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
