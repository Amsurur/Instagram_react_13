import { Swiper, SwiperSlide } from "swiper/react";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  AddComent,
  addPostFavorite,
  getPostById,
  getReels,
  getUsers,
  likeReel,
  postComment,
} from "../../api/reels/Reels";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

// import of Modal
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { setComment } from "../../reducers/reels/Reelse";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

const Reels = () => {
  const dispatch = useDispatch();

  const byId = useSelector((state) => state.reels.byId);
  useEffect(() => {
    dispatch(getPostById());
  }, [dispatch]);

  const users = useSelector((state) => state.reels.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  let data = useSelector((state) => state.reels.data);
  // console.log(data);
  const comments = useSelector((state) => state.reels.setComment);
  // console.log("data is", data);
  useEffect(() => {
    dispatch(getReels());
  }, [dispatch]);
  let imageApi = import.meta.env.VITE_APP_FILES_URL;

  const [one, setOne] = useState(false);
  let [idx, setIdx] = useState(null);

  const likedId = (id, el) => {
    // console.log("post-like", el);
    dispatch(likeReel(id, el));
    // console.log(data, "state.reels.data");
  };

  const unLikedId = (id, el) => {
    // console.log("post-like", el);
    dispatch(likeReel(id, el));
    // console.log(data, "state.reels.data");
  };

  let [commentModal, setCommentModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  let com = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <>
      <div className="p-[20px]">
        <div className="w-[600px] h-[660px] m-[auto]  overflow-y-auto p-[20px] overflow-x-hidden">
          {data?.map((elem) => {
            return (
              <div className="w-[90%] m-[auto] mt-[20px] ">
                <video controls muted autoPlay loop>
                  <source
                    type="video/mp4"
                    className="w-[80%] relative"
                    src={`${imageApi}/${elem.images}`}
                    alt=""
                    onError={(error) => console.log(error)}
                  />
                </video>

                <div className="relative bottom-[350px] z-1 left-[420px]">
                  {elem?.postLike ? (
                    <Favorite
                      style={{
                        color: "red",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                      }}
                      color="error"
                      onClick={() => likedId(elem.postId, elem)}
                    ></Favorite>
                  ) : (
                    <FavoriteBorder
                      style={{
                        color: "white",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                      }}
                      onClick={() => unLikedId(elem.postId, elem)}
                    ></FavoriteBorder>
                  )}
                  <h1 className="text-[white] pl-[12px] pt-[5px]">
                    <span>{elem.postLikeCount}</span>
                  </h1>
                  <CommentIcon
                    onClick={() => {
                      setCommentModal(true);
                      console.log(elem.postId);
                      dispatch(getPostById(elem.postId));
                    }}
                    sx={{
                      color: "white",
                      display: "block",
                      marginTop: "20px",
                      width: "35px",
                      height: "35px",
                      cursor: "pointer",
                    }}
                  />
                  <SendIcon
                    sx={{
                      color: "white",
                      display: "block",
                      marginTop: "20px",
                      width: "35px",
                      height: "35px",
                      cursor: "pointer",
                    }}
                  />
                  {elem.postFavorite ? (
                    <BookmarkIcon
                      onClick={() => {
                        dispatch(addPostFavorite(elem.postId));
                      }}
                      sx={{
                        color: "white",
                        display: "block",
                        marginTop: "20px",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        zIndex: "50",
                      }}
                    />
                  ) : (
                    <BookmarkBorderIcon
                      onClick={() => {
                        dispatch(addPostFavorite(elem.postId));
                      }}
                      sx={{
                        color: "white",
                        display: "block",
                        marginTop: "20px",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                        zIndex: "50",
                      }}
                    />
                  )}
                </div>
                <div className="relative bottom-[330px] p-[10px]  ml-[10px]">
                  <div className="flex items-center w-[300px]  gap-[20px] ">
                    <img
                      className="w-[45px] h-[45px] rounded-full object-cover"
                      src="data:image/png;base64,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"
                      alt="user"
                    />
                    <h1 className="text-[white]">Terry Lucas</h1>
                    <button className="pl-[10px] hover:bg-[gray]  hover:text-[white] text-[white] pr-[10px] pt-[3px] pb-[3px] rounded-2xl border-[2px] border-[white]">
                      follow
                    </button>
                  </div>
                  <p className="text-[17px] text-[white] pt-[10px]">
                    {elem.title}
                  </p>
                </div>
              </div>
            );
          })}
          {/* coment */}

          <React.Fragment>
            <Dialog
              open={commentModal}
              onClose={() => setCommentModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              sx={{ ml: "1070px" }}
              maxWidth="none"
              bg
            >
              <div className="flex justify-around">
                <button
                  onClick={() => setCommentModal(false)}
                  className="w-[50px] h-[50px] font-bold"
                >
                  X
                </button>
                <h1 className="w-[220px] bg--500 h-[50px] flex items-center justify-start cursor-pointer ">
                  Comments
                </h1>
              </div>
              <div className="w-[300px] h-[300px]">
                <div className="h-[230px] w-[270px] m-auto bg-red-600 overflow-x-hidden">
                  {byId?.comments?.map((el) => {
                    return (
                      <>
                        <div className="h-[50px] bg-purple-800 my-3 flex items-center">
                          <div className="w-[40px] h-[40px] rounded-full border">
                            {users?.map((item) => {
                              if (item.id == el.userId) {
                                return (
                                  <>
                                    {item.avatar == "" ? (
                                      <img
                                        src="data:image/jpeg;base64,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"
                                        alt=""
                                        className="w-full h-full rounded-full"
                                      />
                                    ) : (
                                      <img
                                        src={`${imageApi}${item.avatar}`}
                                        alt=""
                                        className="w-full h-full rounded-full"
                                      />
                                    )}
                                  </>
                                );
                              }
                            })}
                          </div>
                          <div className="w-[150px]  ml-2 overflow-hidden ">
                            {users?.map((item) => {
                              if (item.id == el.userId) {
                                return (
                                  <>
                                    <h1 className="font-bold">
                                      {item.userName}
                                    </h1>
                                  </>
                                );
                              }
                            })}

                            <p className="text-[gray]">{el.comment}</p>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="bg--400 h-[50px] w-[90%] m-auto border-t-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="h-[30px] outline-none text-[17px] bg--300 w-[180px]"
                    value={commentInput}
                    onChange={(ev) => setCommentInput(ev.target.value)}
                  />
                  {commentInput == "" ? null : (
                    <h1 onClick={() => { setCommentInput(""); dispatch(AddComent({ com: commentInput, id: byId.postId }));}} className="text-blue-400 cursor-pointer">Sent</h1>
                  )}
                  <button>
                    <SentimentSatisfiedAltIcon />
                  </button>
                </div>
              </div>
            </Dialog>
          </React.Fragment>

          {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{
              width: "400px",
              height: "400px",
              marginLeft: "1070px",
              marginTop: "60px",
              // backgroundColor: "white",
            }}
          >
            <div>
              <div className="flex items-center p-[10px] gap-[20px]">
                <CloseIcon onClick={() => handleClose()} />
                <h1 className="text-[18px] font-[500] text-[gray]">Comments</h1>
              </div>
              {data?.map((el) => {
                return (
                  <div key={el.id}>
                    {el.comments?.map((el) => {
                      return (
                        <div className="flex overflow-hidden">
                          <img
                            className="w-[30px] h-[30px]"
                            src={
                              length == 0
                                ? "https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=220"
                                : `${imageApi}${elem.images}`
                            }
                            alt=""
                          />
                          <div className="">
                            <h1 className="ml-2 font-bold">Name</h1>
                            <h1 className="ml-2 w-[200px]">{el.comment}</h1>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className=" bg-white rounded-xl">
              <div
                className="pt-[5px]  pb-[5px] flex items-center"
                style={{ position: "fixed", bottom: "38%" }}
              >
                <input
                  className="text-[gray] text-[18px] w-[80%] h-[40px] pl-[10px] outline-none"
                  placeholder="Add a comment..."
                  type="text"
                  onChange={(e) => dispatch(setComment(e.target.value))}
                  value={comments}
                />
                <button
                  className="text-[#2121eeb0] mr-4"
                  onClick={(e) => {
                    dispatch(
                      postComment({
                        comment: comments,
                        postId: idx, // <- Issue here, e.postId is likely undefined
                      })
                    );
                    dispatch(setComment(""));
                  }}
                >
                  post
                </button> */}
          {/* <input
                  className="text-[gray] text-[18px] w-[80%] h-[40px] pl-[10px] outline-none"
                  placeholder="Add a comment..."
                  type="text"
                  onChange={(e) => dispatch(setComment(e.target.value))}
                  value={comments}
                /> */}
          {/* <button
                  className="text-[#2121eeb0] mr-4"
                  onClick={(e) => {
                    dispatch(
                      postComment({
                        comment: comments,
                        postId: e.postId,
                      })
                    );
                    dispatch(setComment(""));
                  }}
                >
                  post
                </button> */}

          {/* <AddReactionIcon sx={{ color: "gray" }} />
              </div>
            </div>
          </Dialog> */}
        </div>
      </div>
    </>
  );
};

export default Reels;
