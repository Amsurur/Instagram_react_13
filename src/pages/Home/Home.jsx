import React, { useEffect } from "react";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VolumeDownSharpIcon from "@mui/icons-material/VolumeDownSharp";
import VolumeOffSharpIcon from "@mui/icons-material/VolumeOffSharp";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
// dialog information
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getData, getUsers, likePost } from "../../api/home/home";
import { getToken } from "../../utils/token";

const Home = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  let users = [
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/621.jpg",
      name: "Natasha Wiza",
      isComplite: false,
      desc: "Producer",
      likes: 11,
      id: 1,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/171.jpg",
      name: "Miss Darrell Barrows",
      isComplite: false,
      desc: "equally",
      likes: 13,
      id: 2,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/471.jpg",
      name: "Gene Ryan",
      isComplite: false,
      desc: "South",
      likes: 5,
      id: 3,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/964.jpg",
      name: "Tanya Corwin",
      isComplite: false,
      desc: "Japan",
      likes: 7,
      id: 4,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/398.jpg",
      name: "Muriel Rice",
      isComplite: false,
      desc: "enterprise",
      likes: 28,
      id: 5,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/119.jpg",
      name: "Elsa Schaden",
      isComplite: false,
      desc: "bypassing",
      likes: 4,
      id: 6,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/673.jpg",
      name: "Lionel Sanford",
      isComplite: false,
      desc: "black",
      likes: 3,
      id: 7,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/203.jpg",
      name: "Sonja Quitzon MD",
      isComplite: false,
      desc: "parse",
      likes: 17,
      id: 8,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/244.jpg",
      name: "Kristy McClure",
      isComplite: false,
      desc: "Borders",
      likes: 19,
      id: 9,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1160.jpg",
      name: "Omar Lynch Jr.",
      isComplite: false,
      desc: "overriding",
      likes: 6,
      id: 10,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/865.jpg",
      name: "Miss Doreen Schiller",
      isComplite: false,
      desc: "quirkily",
      likes: 2,
      id: 11,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/74.jpg",
      name: "Darlene Predovic",
      isComplite: false,
      desc: "District",
      likes: 22,
      id: 12,
    },
  ];
  const suggesteds = [
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/203.jpg",
      name: "Sonja Quitzon MD",
      isComplite: false,
      desc: "parse",
      id: 8,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/244.jpg",
      name: "Kristy McClure",
      isComplite: false,
      desc: "Borders",
      id: 9,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1160.jpg",
      name: "Omar Lynch Jr.",
      isComplite: false,
      desc: "overriding",
      id: 10,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/865.jpg",
      name: "Miss Doreen Schiller",
      isComplite: false,
      desc: "quirkily",
      id: 11,
    },
    {
      img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/74.jpg",
      name: "Darlene Predovic",
      isComplite: false,
      desc: "District",
      id: 12,
    },
  ];
  let dispatch = useDispatch();

  let data = useSelector((state) => state.Home.data);
  useEffect(() => {
    dispatch(getData());
  }, []);
  let data2 = useSelector((state) => state.Home.data2);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  let img = import.meta.env.VITE_APP_FILES_URL;

  const [commentPublic, setCommentPublic] = useState();
  const [savePublic, setSavePublic] = useState(false);

  const [moreInformations, setMoreInformations] = useState(false);

  const [commentInput, setCommentInput] = useState("");

  const [commetModal, setCommetModal] = useState(false);

  console.log(commentPublic);
  return (
    <>
      <div className="w-full flex justify-around mt-7">
        <div className="w-[570px]   ">
          <div className=" w-[100%] h-[110px] m-auto flex items-center bg-transparent relative z-0">
            <Swiper
              style={{ width: "100%", height: "90%", zIndex: "0" }}
              onSwiper={setSwiperRef}
              slidesPerView={7}
              // centeredSlides={true}
              spaceBetween={0}
              // pagination={{
              //   type: "fraction",
              // }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {users.map((el) => {
                return (
                  <div className="w-[60px] h-[95%] " key={el.id}>
                    <SwiperSlide
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "transparent",
                      }}
                    >
                      <div className="w-[70px] h-[70%] rounded-full border flex items-center justify-center bgGradient">
                        <img
                          src={el.img}
                          className="w-[90%] h-[90%] rounded-full bg-cover"
                          alt=""
                        />
                      </div>
                      <p className="w-[70px] text-[15px]  h-[25px] overflow-hidden">
                        {el.name}
                      </p>
                    </SwiperSlide>
                  </div>
                );
              })}
            </Swiper>
          </div>
          <div className=" border-t-2 mt-2">
            {data?.map((el, i) => {
              return (
                <div key={i} className="w-full h-[900px] border-b-[1px] ">
                  {data2.map((item, ii) => {
                    if (item.id == el.userId) {
                      return (
                        <>
                          <div className="h-[60px]  flex items-center w-full ">
                            <div className=" h-[90%] w-full flex justify-between items-center  ">
                              <div className="flex h-full items-center justify-between w-[250px]">
                                <div
                                  key={ii}
                                  className="w-[50px] h-[50px] border rounded-full bgGradient flex items-center justify-center"
                                >
                                  <div className="w-[90%] h-[90%] bg-[white] rounded-full flex items-center justify-center">
                                    <img
                                      src={`${img}${item.avatar}`}
                                      className="w-[90%] h-[90%] rounded-full"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div className="w-[190px] h-[90%] flex flex-col justify-center ">
                                  <h1>{item.fullName}</h1>
                                  <p className="text-[gray]">{item.userName}</p>
                                </div>
                              </div>

                              <div className="w-[30px] h-[50px]  flex items-center justify-center">
                                <MoreHorizIcon
                                  onClick={() => {
                                    setMoreInformations(true);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                  <div className="h-[600px] border rounded  ">
                    {el.images[0].at(-1) == "4" ? (
                      <video
                        controls
                        autoPlay
                        muted
                        type="video/mp4"
                        style={{
                          objectFit: "contain",
                          width: "100%",
                        }}
                        className="w-[100%] h-full rounded"
                        src={`${img}${el.images[0]}`}
                      ></video>
                    ) : (
                      <img
                        src={`${img}${el.images[0]}`}
                        className="w-full h-full rounded"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="h-[45px]  flex justify-between items-center">
                    <div className="w-[130px] h-[35px]  flex justify-between items-center">
                      <div
                        onClick={() => {
                          dispatch(likePost(el.postId));
                        }}
                        className="w-[30px] h-[30px]  flex items-center justify-center"
                      >
                        {el.postLike ? (
                          <FavoriteRoundedIcon
                            sx={{ fontSize: 30, color: "red" }}
                          />
                        ) : (
                          <FavoriteBorderRoundedIcon sx={{ fontSize: 30 }} />
                        )}
                      </div>
                      <div
                        onClick={() => {
                          setCommetModal(true);
                          setCommentPublic(el);
                        }}
                        className="w-[30px] h-[30px]  flex items-center justify-center"
                      >
                        <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                      </div>
                      <div
                        onClick={() => {
                          // setCommentPublic(!commentPublic);
                        }}
                        className="w-[30px] h-[30px]  flex items-center justify-center"
                      >
                        <SendOutlinedIcon sx={{ fontSize: 30 }} />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setSavePublic(!savePublic);
                      }}
                      className="w-[35px] h-[35px]  flex items-center justify-center"
                    >
                      {savePublic ? (
                        <BookmarkOutlinedIcon sx={{ fontSize: 30 }} />
                      ) : (
                        <BookmarkBorderOutlinedIcon sx={{ fontSize: 30 }} />
                      )}
                    </div>
                  </div>
                  <div className="h-[50px]  flex items-center">
                    <div className="w-[40px] h-[40px] border rounded-full bgGradient flex items-center justify-center">
                      <img
                        src={el.img}
                        className="w-[90%] h-[90%] rounded-full"
                        alt=""
                      />
                    </div>
                    <h1 className="ml-2">{el.postLikeCount} likes</h1>
                  </div>
                  <div className="h-[50px] flex  items-center">
                    <h1 className="font-bold">{el.name}</h1>
                    <p className="text-[gray] ml-3">{el.desc}</p>
                  </div>
                  <div className="h-[50px] flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="h-[30px] w-[80%] outline-none"
                      value={commentInput}
                      onChange={(ev) => setCommentInput(ev.target.value)}
                    />
                    <div className="flex">
                      {commentInput != "" ? (
                        <h1 className="text-blue-500 cursor-pointer mr-2 text-[15px] ">
                          Sent
                        </h1>
                      ) : null}
                      <SentimentSatisfiedAltOutlinedIcon />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" w-[30%]">
          <div className=" flex justify-between h-[95px] items-center">
            <div className="w-[50px] h-[50px] border rounded-full">
              <img
                src={users[0].img}
                className="w-full h-full rounded-full "
                alt=""
              />
            </div>
            <div className=" w-[335px]">
              <h1>{users[0].name}</h1>
              <p className="text-[gray]">{users[0].desc}</p>
            </div>
          </div>
          <div className="text-[gray] flex justify-between  h-[40px] items-center">
            <p>Suggested for you</p>
            <p>See all</p>
          </div>
          {suggesteds.map((el) => {
            return (
              <div
                key={el.id}
                className=" flex justify-between h-[75px] items-center"
              >
                <div className="w-[50px] h-[50px] border rounded-full">
                  <img
                    src={el.img}
                    className="w-full h-full rounded-full "
                    alt=""
                  />
                </div>
                <div className=" w-[270px]">
                  <h1>{el.name}</h1>
                  <p className="text-[gray]">{el.desc}</p>
                </div>
                <h1 className="text-[#3B82F6] font-bold ">Follow</h1>
              </div>
            );
          })}
        </div>
      </div>
      {/* information */}
      <React.Fragment>
        <Dialog
          open={moreInformations}
          onClose={() => setMoreInformations(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <button className="w-[400px] h-[50px] text-[#ff0000] font-bold">
            Пожаловаться
          </button>
          <button className="w-[400px] h-[50px] text-[#ff0000] font-bold border-t-[1px]">
            Отменить подписку
          </button>
          <button className="w-[400px] h-[50px] border-t-[1px]">
            Добавить в избранное
          </button>
          <button className="w-[400px] h-[50px] border-t-[1px]">
            Перейти к публикации
          </button>
          <button className="w-[400px] h-[50px] border-t-[1px]">
            Поделиться
          </button>
          <button className="w-[400px] h-[50px] border-t-[1px]">
            Копировать ссылку
          </button>
          <button className="w-[400px] h-[50px] border-t-[1px]">
            Вставить на сайт
          </button>
          <button className="w-[400px] h-[50px] border-t-[1px]">
            Об аккаунте
          </button>
          <button
            onClick={() => setMoreInformations(false)}
            className="w-[400px] h-[50px] border-t-[1px]"
          >
            Отмена
          </button>
        </Dialog>
      </React.Fragment>
      {/* comment */}
      <React.Fragment>
        <Dialog
          maxWidth="none"
          open={commetModal}
          onClose={() => setCommetModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // style={{ maxWidth: "none" }}
        >
          <div className="w-[90%] flex justify-between m-auto items-center h-[50px]">
            <h1></h1>
            <h1
              onClick={() => {
                setCommetModal(false);
              }}
              className="font-bold text-[15px] cursor-pointer "
            >
              X
            </h1>
          </div>
          <div className="w-[1000px] h-[500px] bg-white flex items-center justify-between">
            <div className="w-[500%] h-full">
              {commentPublic?.images[0].at(-1) == "4" ? (
                <video
                  controls
                  autoPlay
                  muted
                  type="video/mp4"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                  }}
                  className="w-[100%] h-full rounded"
                  src={`${img}${commentPublic?.images[0]}`}
                ></video>
              ) : (
                <img
                  src={`${img}${commentPublic?.images[0]}`}
                  className="w-full h-full"
                  alt=""
                />
              )}
            </div>
            <div className="w-[500%] h-full">
              <div className="h-[400px] overflow-scroll">
                {commentPublic?.comments?.map((el) => {
                  return (
                    <div className="w-[95%] m-auto h-[50px] bg-orange-400"></div>
                  );
                })}
              </div>
              <div className="w-[95%] m-auto h-[100px] bg-[gray]">
                <div className="h-[45px]  flex justify-between items-center">
                  <div className="w-[130px] h-[35px]  flex justify-between items-center">
                    <div
                      onClick={() => {
                        dispatch(likePost(el.postId));
                      }}
                      className="w-[30px] h-[30px]  flex items-center justify-center"
                    >
                      {/* {el.postLike ? ( */}
                        {/* <FavoriteRoundedIcon
                          sx={{ fontSize: 30, color: "red" }}
                        />
                      ) : ( */}
                        <FavoriteBorderRoundedIcon sx={{ fontSize: 30 }} />
                      {/* )} */}
                    </div>
                    <div
                      onClick={() => {
                        setCommetModal(true);
                        setCommentPublic(el);
                      }}
                      className="w-[30px] h-[30px]  flex items-center justify-center"
                    >
                      <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <div
                      onClick={() => {
                        // setCommentPublic(!commentPublic);
                      }}
                      className="w-[30px] h-[30px]  flex items-center justify-center"
                    >
                      <SendOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setSavePublic(!savePublic);
                    }}
                    className="w-[35px] h-[35px]  flex items-center justify-center"
                  >
                    {/* {savePublic ? (
                      <BookmarkOutlinedIcon sx={{ fontSize: 30 }} />
                    ) : ( */}
                      <BookmarkBorderOutlinedIcon sx={{ fontSize: 30 }} />
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Home;
