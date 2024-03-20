import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getUsers } from "../../api/ExploreApi/ExploreApi";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Swiper, SwiperSlide } from "swiper/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "swiper/swiper-bundle.css";
import { Modal, Box, IconButton } from "@mui/material";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Explore = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const imageURL = import.meta.env.VITE_APP_FILES_URL;
  const data = useSelector((state) => state.todo.data);
  const users = useSelector((state) => state.todo.users);
  const token = useSelector((state) => state.todo.token);
  const mainUser = useSelector((state) => state.todo.mainUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(getUsers());
  }, [dispatch]);

  const handleClickOpen = (index) => {
    setOpenIndex(index);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen2 = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };
  const swiper = useRef(null);
  return (
    <div>
      <div className="grid grid-cols-3 mt-[40px]">
        {data.map((el, index) => (
          <div key={index} className="relative">
            <div
              className="absolute inset-0 flex justify-center items-center gap-[40px] opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => handleClickOpen(index)}
            >
              <div className="flex items-center text-white gap-[10px]">
                <FavoriteIcon />
                <p className="text-[20px] font-[700]">{el.postLikeCount}</p>
              </div>
              <div className="flex items-center text-white gap-[10px]">
                <ChatBubbleIcon />
                <p className="text-[20px] font-[700]">{el.commentCount}</p>
              </div>
            </div>
            <img
              className="w-[280px] object-cover h-[280px] m-[5px] mb-[5px] cursor-pointer"
              src={`${imageURL}${el.images}`}
              alt=""
            />
            <Modal
              open={openIndex === index}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="flex justify-center items-center"
            >
              <Box className="bg-[#fff] outline-none border-[#fff]">
                <div className="flex">
                  <div className="w-[550px] h-[518px] border-solid border-[1px] border-gray-400 bg-black">
                    <Swiper ref={swiper} slidesPerView={1} className="relative">
                      {el.images.map((item, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative w-full h-full">
                            <img
                              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                              src={`${imageURL}${item}`}
                              alt=""
                            />
                            {el.images.length > 1 && (
                              <div className="absolute bottom-4 left-0 w-full text-center">
                                <div className="flex justify-center items-center space-x-2">
                                  {el.images.map((_, index) => (
                                    <span
                                      key={index}
                                      className={`w-3 h-3 rounded-full bg-gray-300 cursor-pointer ${
                                        index === i ? "bg-gray-500" : ""
                                      }`}
                                      onClick={() =>
                                        swiper.current.slideTo(index)
                                      }
                                    ></span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                      {users.map((user) => {
                        if (user.id === el.userId && user.avatar) {
                          return (
                            <SwiperSlide key={user.id}>
                              <div className="flex items-center gap-[10px]">
                                <img
                                  src={`${imageURL}${user.avatar}`}
                                  className="w-[30px] h-[30px] rounded-full"
                                  alt={`Avatar of ${user.userName}`}
                                />
                                <h1 className="text-[#000]">
                                  {user.userName || "Anonymous"}
                                </h1>
                              </div>
                            </SwiperSlide>
                          );
                        }
                        return null;
                      })}
                    </Swiper>
                  </div>
                  <div className="bg-[#fff]">
                    <nav className="flex justify-between h-[60px] w-[450px] border-b border-[1px] border-[#dad5d5] items-center px-[2%]">
                      <div className="flex gap-3 items-center">
                        {users.map((user) => {
                          if (user.id === el.userId) {
                            console.log(user);
                            console.log(user.avatar === false);
                            return (
                              <div
                                className="flex items-center gap-[10px]"
                                key={user.id}
                              >
                                {user.avatar ? (
                                  <div>
                                    <img
                                      src={`${imageURL}${user.avatar}`}
                                      className="w-[35px] h-[35px] rounded-full border border-[grey]"
                                    />
                                  </div>
                                ) : (
                                  <img
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    src={
                                      "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                                    }
                                    className="w-[30px] h-[30px] rounded-full"
                                  />
                                )}

                                <div className="flex items-center gap-[190px]">
                                  <div className="flex items-center">
                                    <h1 className="text-[#000] text-[20px]">
                                      {user.userName || "Anonymous"}
                                    </h1>
                                    <p className="text-[#4671f5] text-[20px]">
                                      {user.subscriptions ? "Subscribe" : ""}
                                    </p>
                                  </div>
                                  <div>
                                    <IconButton onClick={handleClickOpen2}>
                                      <MoreHorizIcon />
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}

                        {token?.sid === el.userId && mainUser.image && (
                          <div className="flex items-center gap-[10px]">
                            <img
                              className="w-[40px] border-2 border-[grey] h-[40px] m-[5px] mb-[5px] cursor-pointer"
                              src={`${imageURL}${el.images}`}
                              alt=""
                            />
                            <h1 className="text-[#000] max-w-[200px]">
                              {mainUser.userName}
                            </h1>
                          </div>
                        )}
                      </div>
                    </nav>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
