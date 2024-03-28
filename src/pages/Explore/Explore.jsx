import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getpostById,
  addLike,
  addComment,
  deleteComment,
  postFollowingRelationShip,
} from "../../api/ExploreApi/ExploreApi";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "swiper/swiper-bundle.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import Slide from "@mui/material/Slide";
import { Box, Dialog, Modal } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// import Dialog from "@mui/material/Dialog";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CancelIcon from "@mui/icons-material/Cancel";
import { Delete } from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Explore = () => {
  const [openInfo, setOpenInfo] = useState(false);

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const openComment = Boolean(anchorEl);
  const handleClickComment = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDeleteComment = () => {
    setAnchorEl(null);
  };

  const imageURL = import.meta.env.VITE_APP_FILES_URL;
  const data = useSelector((state) => state.explore.data);
  const ById = useSelector((state) => state.explore.ById);
  const users = useSelector((state) => state.explore.users);
  // console.log(ById);
  const [comments, setComment] = useState("");
  const dispatch = useDispatch();
  const [idx, setIdx] = useState();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(getpostById(idx));
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const swiper = useRef(null);

  const formatDate = (publishedDate) => {
    const dateObj = new Date(publishedDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const formattedDate = formatDate(ById && ById.datePublished);

  const [white, setwhite] = useState(false);
  const clicker = () => {
    setwhite(!white);
  };

  const [fol, setFol] = useState(false);
  const clickerFollower = () => {
    setFol(!fol);
  };
  return (
    <div>
      <Dialog
        open={openInfo}
        onClose={handleCloseInfo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <button className="w-[400px]  hover:bg-[#f3f3f3] h-[50px] text-[#ff0000]">
          Пожаловаться
        </button>
        <button className="w-[400px] hover:bg-[#f3f3f3] h-[50px] text-[#363434] border-t-[1px]">
          Перейти к публикации
        </button>
        <button className="w-[400px] hover:bg-[#f3f3f3] h-[50px] text-[#363434] border-t-[1px]">
          Поделиться
        </button>
        <button className="w-[400px] hover:bg-[#f3f3f3] h-[50px] text-[#363434] border-t-[1px]">
          Копировать ссылку
        </button>
        <button className="w-[400px] hover:bg-[#f3f3f3] h-[50px] text-[#363434] border-t-[1px]">
          Вставить в сайт
        </button>
        <button className="w-[400px] hover:bg-[#f3f3f3] h-[50px] text-[#363434] border-t-[1px]">
          Об аккаунте
        </button>
        <button
          onClick={() => handleCloseInfo()}
          className="w-[400px] hover:bg-[#f3f3f3] h-[50px] text-[#363434] border-t-[1px]"
        >
          Отмена
        </button>
      </Dialog>



      <div className="grid grid-cols-3 mt-[40px]">
        {data.map((el, index) => (
          <div key={index} className="relative">
            <div
              className="absolute inset-0 flex justify-center items-center gap-[40px] opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => {
                handleClickOpen();
                setIdx(el.postId);
                dispatch(getpostById(el.postId));
              }}
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
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className="w-[280px] object-cover border border-[#e7e5e5] h-[280px] m-[5px] mb-[5px] cursor-pointer"
              src={`${imageURL}${el.images}`}
              alt=""
            />
          </div>
        ))}
      </div>

      

      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-[#fff] h-[700px] border-[#fff]">
          <div className="flex h-[542px]">
            <div className="w-[100%] border-solid border-[1px] border-gray-400 bg-black">
              <div>
                <Swiper
                  pagination={true}
                  modules={[Pagination]}
                  className="mySwiper w-[532px]"
                >
                  {ById?.images?.map((el, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative w-[100%] h-[540px] object-cover">
                        <img
                          className="inset-0 w-[100%] h-[280px] object-cover cursor-pointer"
                          src={`${imageURL}${el}`}
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="border w-[100%] border-[#d7d7d7]">
              <div
                id="fixed"
                className="flex border-b  pr-[20px] pl-[20px] gap-[15px]  items-center h-[70px] bg-white"
                style={{ position: "sticky", top: 0 }}
              >
                <img
                  className="w-[40px] rounded-full h-[40px]"
                  src={
                    length == ""
                      ? "https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=220"
                      : ById?.images
                  }
                  alt=""
                />
                <div className="flex w-[430px] justify-between items-center">
                  <div className="flex w-[300px] gap-[7px] items-center">
                    <p className="text-[15px] font-[560]">
                      {length === "" ? "Anonymous" : ById?.title}
                    </p>
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: "10px",
                        color: "grey",
                      }}
                    />
                    <p
                      onClick={() => {
                        clickerFollower();
                        dispatch(postFollowingRelationShip(ById.userId));
                      }}
                      className="text-[15px] rounded-[5px] h-[30px] pt-[3px] hover:bg-[#dff4fa] w-[110px] text-center text-[#34a5eb] font-[550]"
                    >
                      {fol ? "Подписаться" : "Подписан"}
                    </p>
                  </div>
                  <MoreHorizIcon
                    onClick={handleClickOpenInfo}
                    className="hover:opacity-60"
                  />
                </div>
              </div>


              {/* COMMENTS */}
              <div className="">
                <div className="center -z-20 w-[500px] flex flex-col gap-[15px] pl-[23px] pt-[10px]">
                  {ById?.comments?.map((el) => (
                    <div
                      key={el.postId}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-[17px]">
                        <img
                          className="w-[35px] h-[35px]"
                          src={
                            length == 0
                              ? "https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=220"
                              : ById?.images
                          }
                          alt=""
                        />
                        <div>
                          <div className="flex gap-[10px]">
                            <h1 className="font-[600] text-[15px] hover:opacity-50">
                              {ById?.title}
                            </h1>
                            <h1>{el?.comment}</h1>
                          </div>
                          <div className="flex items-center gap-[320px]">
                            <p>{el.dateCommented.slice(0, 10)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center flex-col-reverse">
                        <MoreHorizIcon
                          id="basic-button"
                          aria-controls={openComment ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openComment ? "true" : undefined}
                          onClick={handleClickComment}
                          sx={{ fontSize: "15px" }}
                          className="cursor-pointe  hover:opacity-50"
                        />
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openComment}
                          className="z-50 ml-[-70px]"
                          onClose={handleCloseDeleteComment}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleCloseDeleteComment}>
                            <div
                              onClick={() =>
                                dispatch(deleteComment(el.postCommentId))
                              }
                              className="flex hover:text-[#ce5151] items-center gap-[10px]"
                            >
                              <Delete />
                              Delete comment
                            </div>
                          </MenuItem>
                          <MenuItem onClick={handleCloseDeleteComment}>
                            <div className="flex hover:text-[#40a940] items-center gap-[10px]">
                              <CancelIcon />
                              Cancel action
                            </div>
                          </MenuItem>
                        </Menu>
                        <FavoriteBorderIcon
                          className="hover:opacity-50"
                          sx={{ cursor: "pointer", fontSize: "15px" }}
                        ></FavoriteBorderIcon>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                id="bottom"
                style={{
                  position: "fixed",
                  bottom: "32px",
                  zIndex: "20",
                  left: "620px",
                  width: "520px",
                  backgroundColor: "white",
                }}
                className="border-t pt-[7px] mt-[180px]"
              >
                <div
                  style={{ position: "sticky", top: 0 }}
                  className="four pr-[20px] pl-[30px] flex items-center justify-between sticky top-0 bg-white z-10"
                >
                  <div className="three flex items-center gap-[20px]">
                    {ById?.postLike ? (
                      <FavoriteIcon
                        className="hover:opacity-50 text-[#e83535]"
                        sx={{ cursor: "pointer", fontSize: "32px" }}
                        onClick={() => {
                          dispatch(addLike(ById?.postId));
                        }}
                      ></FavoriteIcon>
                    ) : (
                      <FavoriteBorderRoundedIcon
                        className="hover:opacity-50"
                        sx={{ cursor: "pointer", fontSize: "32px" }}
                        onClick={() => dispatch(addLike(ById?.postId))}
                      ></FavoriteBorderRoundedIcon>
                    )}
                    <ChatBubbleOutlineRoundedIcon
                      className="hover:opacity-60"
                      sx={{ fontSize: "32px" }}
                    />
                    <img
                      className="w-[55px] h-[55px] ml-[-12px] mt-[-5px]"
                      src="https://th.bing.com/th/id/OIP.Yluy23lF40SO9aZpzYmykgHaHa?rs=1&pid=ImgDetMain"
                      alt=""
                    />
                  </div>
                  <div>
                    <div onClick={clicker}>
                      {white ? (
                        <BookmarkBorderIcon
                          className="hover:opacity-60"
                          sx={{ fontSize: "32px" }}
                        />
                      ) : (
                        <BookmarkIcon
                          className="hover:opacity-60"
                          sx={{ fontSize: "32px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="like pl-[30px] and date">
                  <p className="text-[17px] mt-[-3px] font-[550]">
                    {ById?.postLikeCount == 0
                      ? "Don't have like yet"
                      : ById?.postLikeCount + " likes"}
                  </p>
                  <h1 className="text-[#737373] font-[300] pb-[10px] text-[12px]">
                    {formattedDate}
                  </h1>
                </div>
                <div className="addcomment pl-[30px] border-t">
                  <div className="flex items-center gap-[15px]">
                    <SentimentSatisfiedAltIcon sx={{ fontSize: "28px" }} />
                    <input
                      onChange={(el) => dispatch(setComment(el.target.value))}
                      type="text"
                      value={comments}
                      className="w-[330px] mr-[43px] text-[16px] outline-none h-[50px]"
                      placeholder="Add Comments..."
                    />
                    <div
                      onClick={() => {
                        dispatch(
                          addComment({
                            comment: comments,
                            postId: ById?.postId,
                          })
                        );
                        dispatch(setComment(""));
                      }}
                    >
                      <p className="text-[#0062ff]">Publich</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};
export default Explore;
