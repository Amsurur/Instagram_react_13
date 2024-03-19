import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBars,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faThreads } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import navMessages from "../assets/icons/nav-messages.svg";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Avatar, TextField } from "@mui/material";
import navProfile from "../assets/images/nav-profile.jpg";

import ClearIcon from "@mui/icons-material/Clear";

// import search from "../pages/search/search";

import AOS from "aos";
import "aos/dist/aos.css";
import HomeIcon from "../icons/Layout/HomeIcon";
import ReelsIcon from "../icons/Layout/ReelsIcon";
import MessageIcon from "../icons/Layout/MessageIcon";
import { getToken } from "../utils/token";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import SearchUser from "../components/SearchUser";

import instLogo from "../pages/Login/instLogo.png";
import insText from "../pages/Login/insText.png";

export const Layout = () => {
  // Функция для модального окна "Еще"
  const [modal,setSearcModal]=useState(false)

  const location = useLocation();
  const dispatch = useDispatch();
  let [followingState, setFollowingState] = useState(false);

  const myId = getToken().sid;

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    // Главный контейнер
    <main className="flex dark:bg-[black] dark:text-white">
      {/* Флекс контейнер */}
      {/* Navbar */}
      <aside
        className={`${
          location.pathname === "/basic/message" ||
          location.pathname === "/basic/message/newMessage"|| modal  
            ? "w-[6%]"
            : "w-[19%]"
        }`}
      >
        {/* Панель навигации */}
        <div
          className={`${
            location.pathname === "/basic/message" ||
            location.pathname === "/basic/message/newMessage"|| modal 
              ? "w-[6%]"
              : "w-[18.91%]"
          } panel-navigation fixed py-[33px] px-[15px] h-[100%] border-r-[1px] border-[#d8d8d8]`}
        >
          <ul
            className={`${
              "modalSearch" ? "items-start gap-[16.5px]" : "items-stretch"
            } flex flex-col gap-[12px]`}
          >
            {/* Logo */}
            <Link to="/basic">
              <li
                className={`${
                  location.pathname === "/basic/message" ||
                  location.pathname === "/basic/message/newMessage"|| modal 
                    ? "hidden"
                    : "block"
                }mb-[15px]`}
              >
                {/* <img
                  src=""
                  alt="adasd"
                  className={`w-[55%] ${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"
                      ? "hidden"
                      : "block"
                  }`}
                /> */}
              </li>
              {/* instagram icon */}
              <li className="px-[9px] flex gap-[4px] items-center">
                {/* <InstagramIcon sx={{ fontSize: "30px" }} /> */}
                <img className={`h-[30px] w-[30px]`} src={instLogo} alt="" />
                <img
                  className={`h-[40px] w-[55%] ${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"|| modal 
                      ? "hidden"
                      : "block"
                  }`}
                  src={insText}
                  alt=""
                />
              </li>
            </Link>
            <NavLink
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
              to="/basic"
            >
              <li className="one flex w-[215px] hover:text-[#3B82F6] items-center gap-[15px]  p-[10px] transition-all duration-300">
                {/* <img src={navHome} alt="" /> */}
                <HomeIcon />
                {/* <FontAwesomeIcon icon={faHouse} className="text-[25px]" /> */}
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" || modal 
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Главная
                </p>
              </li>
            </NavLink>

 {/* <search/> */}
{
  modal?(
    <NavLink onClick={()=>setSearcModal(false)}
            
    className={
      "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
    }
  >
    {/* <search/> */}
    <li className="flex items-center hover:text-[#3B82F6] w-[215px] gap-[15px]  rounded-[7px] p-[10px] transition-all duration-300 cursor-pointer">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-[22px]"
      />

      <p
        className={`${
          location.pathname === "/basic/message" ||
          location.pathname === "/basic/message/newMessage"|| modal 
            ? "hidden"
            : "block"
        }`}
      >
        Поисковой запрос
      </p>
    </li>
  </NavLink>
  ):(
    <NavLink onClick={()=>setSearcModal(true)}
            
    className={
      "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
    }
  >
   
    <li className="flex items-center hover:text-[#3B82F6] w-[215px] gap-[15px]  rounded-[7px] p-[10px] transition-all duration-300 cursor-pointer">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-[22px]"
      />

      <p
        className={`${
          location.pathname === "/basic/message" ||
          location.pathname === "/basic/message/newMessage"|| modal 
            ? "hidden"
            : "block"
        }`}
      >
        Поисковой запрос
      </p>
    </li>
  </NavLink>
  )
}
            {/* <NavLink onClick={()=>setSearcModal(true)}
            
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              {/* <search/> */}
              {/* <li className="flex items-center hover:text-[#3B82F6] w-[215px] gap-[15px]  rounded-[7px] p-[10px] transition-all duration-300 cursor-pointer">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-[22px]"
                />

                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Поисковой запрос
                </p>
              </li>
            </NavLink>  */}

            <NavLink
              to="explore"
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex items-center hover:text-[#3B82F6] w-[215px] gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                <ExploreOutlinedIcon sx={{ fontSize: "25px" }} />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"|| modal 
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Интересное
                </p>
              </li>
            </NavLink>
            <NavLink
              to="reels"
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex items-center hover:text-[#3B82F6] w-[215px] gap-[15px]  rounded-[7px] p-[10px] transition-all duration-300">
                {/* <img src={navReels} alt="" className="w-[25px]" /> */}
                <ReelsIcon />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"|| modal 
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Reels
                </p>
              </li>
            </NavLink>
            <NavLink
              to="message"
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex items-center hover:text-[#3B82F6]  w-[55px] gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                {/* <img src={navMessages} alt="" className="w-[25px]" /> */}
                <MessageIcon />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"|| modal 
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Сообщения
                </p>
              </li>
            </NavLink>
            <NavLink
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex cursor-pointer hover:text-[#3B82F6] w-[215px] items-center gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                <FontAwesomeIcon icon={faHeart} className="text-[25px]" />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"|| modal 
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Уведомления
                </p>
              </li>
            </NavLink>
            <NavLink
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex items-center hover:text-[#3B82F6] w-[215px] cursor-pointer gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                <AddBoxOutlinedIcon />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"|| modal 
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Создать
                </p>
              </li>
            </NavLink>

            <NavLink
              to="profile"
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex items-center hover:text-[#3B82F6] w-[215px] gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                <Avatar
                  src={navProfile}
                  sx={{ width: "25px", height: "25px" }}
                />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage"|| modal 
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Профиль
                </p>
              </li>
            </NavLink>
            <li className="flex items-center focus:bg-[red] w-[215px] gap-[15px] hover:text-[#3B82F6] rounded-[7px] p-[10px] transition-all duration-300 cursor-pointer">
              <FontAwesomeIcon icon={faBars} className="text-[20px]" />
              <p
                className={`${
                  location.pathname === "/basic/message" ||
                  location.pathname === "/basic/message/newMessage"|| modal 
                    ? "hidden"
                    : "block"
                }`}
              >
                Ещё
              </p>
            </li>
          </ul>
        </div>
        {/* Modal More */}

        {/* Modal Create */}
      </aside>
      {/* searchmodal  */}
                {modal?(
                  <SearchUser/>
                ):null

                }
      <div></div>

      {/* Контентная часть */}
      <aside className="flex justify-center w-[100%]">
        <Outlet />
        {/* Футер */}


        

        {/* <footer  className="py-[10px]">
  
          <ul className="flex flex-wrap items-center justify-center gap-x-[10px] mx-auto w-[55%]">
            <li>
              <a
                href=""
                className="text-[12px] text-[#8D8D86] hover:border-b-[1px] hover:border-[#8D8D86]"
              >
                Meta
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-[12px] text-[#8D8D86] hover:border-b-[1px] hover:border-[#8D8D86]"
              >
                Информация
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-[12px] text-[#8D8D86] hover:border-b-[1px] hover:border-[#8D8D86]"
              >
                Блог
              </a>
            </li>
            <li>
              <a href="" className="text-[12px] text-[#8D8D86]">
                Вакансии
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-[12px] text-[#8D8D86] hover:border-b-[1px] hover:border-[#8D8D86]"
              >
                Помощь
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-[12px] text-[#8D8D86] hover:border-b-[1px] hover:border-[#8D8D86]"
              >
                API
              </a>
            </li>
            <li>
              <a href="" className="text-[12px] text-[#8D8D86]">
                Конфиденциальность
              </a>
            </li>
            <li>
              <a href="" className="text-[12px] text-[#8D8D86]">
                Условия
              </a>
            </li>
            <li>
              <a href="" className="text-[12px] text-[#8D8D86]">
                Места
              </a>
            </li>
            <li>
              <a href="" className="text-[12px] text-[#8D8D86]">
                Instagram Lite

              </a>
            </li>
            <li>
              <a
                href=""
                className="text-[12px] text-[#8D8D86] hover:border-b-[1px] hover:border-[#8D8D86]"
              >
                Threads
              </a>
            </li>
            <li>
              <a href="" className="text-[12px] text-[#8D8D86]">
                Загрузка контактов и лица, не являющиеся пользователями
              </a>
            </li>
            <li>
              <a href="" className="text-[12px] text-[#8D8D86]">
                Meta Verified
              </a>
            </li>
          </ul>
          <div className="product-info flex justify-center gap-[10px] mx-auto mt-[20px]">
       
            <div className="localization flex gap-[10px]">
              <a href="" className="text-[12px] text-[#8D8D86]">
                Русский
              </a>
            </div>
            <p className="text-[12px] text-[#8D8D86]">
              © 2023 Instagram from Meta
            </p>
          </div>
        </footer> */}
      </aside>
    </main>
  );
};
