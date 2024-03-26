import React, { useRef } from "react";
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
import { Avatar, Box, Modal, TextField, Typography } from "@mui/material";
import navProfile from "../assets/images/nav-profile.jpg";

import ClearIcon from "@mui/icons-material/Clear";

// import search from "../pages/search/search";

import AOS from "aos";
import "aos/dist/aos.css";
import HomeIcon from "../icons/Layout/HomeIcon";
import ReelsIcon from "../icons/Layout/ReelsIcon";
import MessageIcon from "../icons/Layout/MessageIcon";
import { destroyToken, getToken } from "../utils/token";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import SearchUser from "../components/SearchUser";

import instLogo from "../pages/Login/instLogo.png";
import insText from "../pages/Login/insText.png";
import ModalPost from "../components/ModalPost";
import LogOut from "../components/logOut/LogOut";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Post Modal

import LogoutIcon from '@mui/icons-material/Logout';

import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Switcher from "../components/switcher/Switcher";

import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
const style = {
  position: 'fixed',
  top: '50%',
  left: '20%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:"100vh",
  bgcolor: 'background.paper',
  border: 'px solid #000',
  boxShadow: 10,
  p: 4,
  overflow: 'scroll'
};


 export const Layout = () => {
  const [modal,setSearcModal]=useState(false)
  const [open1, setOpen1] =useState(false);
  const handleOpen = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  
 const forclose=()=>{
  setSearcModal(false)
 }

 const onWrapperClick=(event)=>{
if(event.target.classlist.contains("searchModal"))forclose()
 }

const closeModalSearch=useRef()
// console.log(tooltiRef);
// useEffect(()=>{

//  if(!modal) return
//   const handleClick=(e)=>{
//     if(!tooltiRef.current) return;
//     if(!tooltiRef.current.contains(e.target)) {
//       forclose()
//     }
//   }
// document.addEventListener('click', handleClick)
// return ()=>{
// document.removeEventListener('click', handleClick)

// }
// },[modal,forclose])

const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const location = useLocation();
  const dispatch = useDispatch();
  let [followingState, setFollowingState] = useState(false);

  // const myId = getToken().sid;
  // const myId = getToken().sid;


 

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    // Главный контейнер
    <main className="flex dark:bg-gray-950 dark:text-white">
      {/* Флекс контейнер */}
      {/* Navbar */}
      <aside
        className={`${
          location.pathname === "/basic/message" ||
          location.pathname === "/basic/message/newMessage" ||
          modal
            ? "w-[6%]"
            : "w-[19%]"
        }`}
      >
        {/* Панель навигации */}
        <div
          className={`${
            location.pathname === "/basic/message" ||
            location.pathname === "/basic/message/newMessage" ||
            modal
              ? "w-[6%]"
              : "w-[18.91%]"
          } panel-navigation fixed py-[33px] px-[15px] h-[100%] border-r-[1px] border-[#d8d8d8]`}
        >
          <ul
            className={`${
              "modalSearch" ? "items-start gap-[15px]" : "items-stretch"
            } flex flex-col gap-[12px]`}
          >
            {/* Logo */}
            <Link to="/basic">
              <li
                className={`${
                  location.pathname === "/basic/message" ||
                  location.pathname === "/basic/message/newMessage" ||
                  modal
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
                    location.pathname === "/basic/message/newMessage" ||
                    modal ||
                    open1
                      ? "hidden"
                      : "block"
                  }`}
                  src={insText}
                  alt=""
                />
              </li>
            </Link>
            <NavLink
              onClick={() => setSearcModal(false)}
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
                    location.pathname === "/basic/message/newMessage" ||
                    modal ||
                    open1
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Главная
                </p>
              </li>
            </NavLink>

            {/* <search/> */}
            {modal ? (
              <NavLink
                onClick={() => setSearcModal(false)}
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
                      location.pathname === "/basic/message/newMessage" ||
                      modal ||
                      open1
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    Поисковой запрос
                  </p>
                </li>
              </NavLink>
            ) : (
              <NavLink
                onClick={() => setSearcModal(true)}
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
                      location.pathname === "/basic/message/newMessage" ||
                      modal ||
                      open1
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    Поисковой запрос
                  </p>
                </li>
              </NavLink>
            )}
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
              onClick={() => setSearcModal(false)}
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex items-center hover:text-[#3B82F6] w-[215px] gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                <ExploreOutlinedIcon sx={{ fontSize: "25px" }} />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    modal ||
                    open1
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
              onClick={() => setSearcModal(false)}
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
                    location.pathname === "/basic/message/newMessage" ||
                    modal ||
                    open1
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Reels
                </p>
              </li>
            </NavLink>
            <NavLink
              onClick={() => setSearcModal(false)}
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
                    location.pathname === "/basic/message/newMessage" ||
                    modal ||
                    open1
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Сообщения
                </p>
              </li>
            </NavLink>
            <NavLink
              onClick={() => {
                setSearcModal(false), handleOpen();
              }}
              className={
                "focus:bg-[#EFF6FF] focus:border-r-2 focus:text-[#3B82F6] border-[#3B82F6]"
              }
            >
              <li className="flex cursor-pointer hover:text-[#3B82F6] w-[215px] items-center gap-[15px] rounded-[7px] p-[10px] transition-all duration-300">
                <FontAwesomeIcon icon={faHeart} className="text-[25px]" />
                <p
                  className={`${
                    location.pathname === "/basic/message" ||
                    location.pathname === "/basic/message/newMessage" ||
                    modal ||
                    open1
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Уведомления
                </p>
              </li>
            </NavLink>
            <ModalPost />

            <NavLink
              to="profile"
              onClick={() => setSearcModal(false)}
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
                    location.pathname === "/basic/message/newMessage" ||
                    modal ||
                    open1
                      ? "hidden"
                      : "block"
                  }`}
                >
                  Профиль
                </p>
              </li>
            </NavLink>

            <li
              onClick={() => {
                setSearcModal(false), handleClickOpen();
              }}
              className="flex items-center gap-[15px] hover:bg-[#00000010] rounded-[7px] p-[10px] transition-all duration-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={faBars} className="text-[20px]" />
              <p
                className={`${
                  location.pathname === "/basic/message" ||
                  location.pathname === "/basic/message/newMessage" ||
                  modal ||
                  open1
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

      {modal ? (
        <SearchUser onCloseModal={setSearcModal} />
      ) : null}

      {/* Контентная часть */}
      <aside
        className={`${
          location.pathname === "/basic/message"
            ? "rigth"
            : "flex justify-center "
        } w-[100%]`}
      >
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h6">
              Уведомления
            </Typography>
            На этой неделе
            <p></p>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>

        {/* <div className=''> */}
        {/* <button onClick={()=> destroyToken()}>Logout</button> */}
        <Dialog
          className=" mt-[17vh] h-full  pr-[76%]"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // fullWidth={true}
          // maxWidth="lg"
        >
          <DialogTitle id="alert-dialog-title">{""}</DialogTitle>

          <DialogContent>
            <DialogContentText
              className=" w-[210px] text-center"
              id="alert-dialog-description"
            >
              <div className="flex flex-col gap-[25px]   text-black">
                <div className="flex items-center gap-[10px] ">
                  <SettingsOutlinedIcon />
                  <h1 className="text-[19px] ">Настройки</h1>
                </div>
                <div className="flex gap-[10px] items-center">
                  <BookmarkBorderRoundedIcon />
                  <h2 className="text-[18px] ">Ваши cохраненное</h2>
                </div>
                <div className="flex gap-[10px]">
                  <HistoryToggleOffOutlinedIcon />
                  <h2 className="text-[18px]">Ваши действия</h2>
                </div>
                <div className="flex gap-[10px] items-center">
                  <Switcher />

                  <h2 className="text-[18px] ">Ночной режим</h2>
                </div>
                <div
                  onClick={() => destroyToken()}
                  className="flex items-center gap-[10px]"
                >
                  <LogoutIcon color="error" />
                  <h2 className="text-[17px] text-red-600">Выйти</h2>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}></Button>
            <Button onClick={handleClose}></Button>
          </DialogActions>
        </Dialog>
        {/* </div> */}

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