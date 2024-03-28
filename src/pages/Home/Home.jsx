import React, { useEffect } from "react";
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
// dialog information
import Dialog from "@mui/material/Dialog";

import Menu from "@mui/material/Menu";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// panding
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import Stories from "stories-react";
import "stories-react/dist/index.css";

import "./style.css";



// import required modules
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  addFavorite,
  ckeckFolow,
  deleteFolow,
  getById,
  getData,
  getStories,
  getStoriesById,
  getUsers,
  getYourProfile,
  likePost,
  postFolow,
  postLikeStory,
} from "../../api/home/home";
import { getToken } from "../../utils/token";

const Home = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  // istoia
  const stories = [
    {
      type: "image",
      url: "https://images.pexels.com/photos/9470805/pexels-photo-9470805.jpeg?w=300",
      duration: 5000,
    },
  ];
  let myId = getToken()?.sid;
  const [storiesModal, setStoriesModal] = useState(false);

  let dispatch = useDispatch();

  let data = useSelector((state) => state.Home.data);
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  let data2 = useSelector((state) => state.Home.data2);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  // console.log(data2);

  let getByIdData = useSelector((state) => state.Home.data3);
  useEffect(() => {
    dispatch(getById());
  }, [dispatch]);
  // console.log("------------>>>>>", getByIdData);

  let getStoriesData = useSelector((state) => state.Home.stories);
  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);
  // console.log("---------------->>>>>>>>>>>>>", getStoriesData);

  const getStoriesByIdData = useSelector((state) => state.Home.storiesById);
  useEffect(() => {
    dispatch(getStoriesById());
  }, [dispatch]);

  let getYourData = useSelector((state) => state.Home.dataYour);
  useEffect(() => {
    dispatch(getYourProfile());
  }, [dispatch]);

  let checkFollowData = useSelector((state) => state.Home.checkFollowData);
  useEffect(() => {
    dispatch(ckeckFolow());
  }, [dispatch]);

  let loading = useSelector((state) => state.Home.loading);
  let panding = [1, 2, 3, 4, 5, 6];
  let loadingData2 = useSelector((state) => state.Home.loadingData2);
  let loadingYour = useSelector((state) => state.Home.loadingYour);

  // console.log("your--->>>>", getYourData);

  let img = import.meta.env.VITE_APP_FILES_URL;

  // const [commentPublic, setCommentPublic] = useState();

  const [moreInformations, setMoreInformations] = useState(false);

  const [commentInput, setCommentInput] = useState("");

  const [commetModal, setCommetModal] = useState(false);

  // icons

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="w-full flex justify-around  mt-7">
        <div className="w-[570px]   ">
          <div className=" w-[100%] h-[110px] m-auto flex items-center bg-transparent relative z-0">
            <Swiper
              style={{ width: "100%", height: "90%" }}
              onSwiper={setSwiperRef}
              slidesPerView={7}
              // centeredSlides={true}
              spaceBetween={0}
              pagination={{
                type: "fraction",
              }}
              // navigation={true}
              // modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {/* <SwiperSlide
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "transparent",
                }}
              >
                <div className="w-[70px] h-[70px] rounded-full border flex items-center justify-center bgGradient ">
                  <img
                    onClick={() => {
                      setStoriesModal(true);
                    }}
                    src={`${img}${""}`}
                    className="bgGradient p-[3px] rounded-full "
                    alt=""
                  />
                </div>
                <p className="w-[70px] text-[15px]  h-[25px] overflow-hidden">
                  Your story
                </p>
              </SwiperSlide> */}

              {getStoriesData?.stories
                ?.filter((e) => {
                  return e?.fileName && e.userId != getToken().id;
                })

                ?.map((el) => {
                  // console.log(el);
                  return (
                    <>
                      <div className="w-[60px] h-[95%] " key={el.id}>
                        <SwiperSlide
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "transparent",
                          }}
                        >
                          <div className="w-[70px] h-[70px] rounded-full border flex items-center justify-center bgGradient ">
                            {data2?.map((item) => {
                              if (item.id === el.userId) {
                                return (
                                  <>
                                    <img
                                      onClick={() => {
                                        setStoriesModal(true);
                                        dispatch(getStoriesById(el.id));
                                      }}
                                      src={`${img}${item.avatar}`}
                                      className="bgGradient p-[3px] rounded-full "
                                      alt=""
                                    />
                                  </>
                                );
                              }
                            })}
                          </div>
                          {data2?.map((item) => {
                            if (item.id === el.userId) {
                              return (
                                <>
                                  <p className="w-[70px] text-[15px]  h-[25px] overflow-hidden">
                                    {item.userName}
                                  </p>
                                </>
                              );
                            }
                          })}
                        </SwiperSlide>
                      </div>
                    </>
                  );
                })}
            </Swiper>
          </div>
          <div className=" border-t-2 mt-2">
            {loading ? (
              <>
                {panding.map((el) => {
                  return (
                    <>
                      <Stack
                        key={el.id}
                        spacing={1}
                        style={{
                          width: "450px",
                          margin: "auto",
                          marginTop: "5px",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", width: "450px" }}
                        />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton
                          variant="rectangular"
                          width={450}
                          height={200}
                        />
                        <Skeleton variant="rounded" width={450} height={60} />
                      </Stack>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {data?.map((el, i) => {
                  return (
                    <div
                      key={el.id}
                      className="w-[450px] m-auto h-[900px] border-b-[1px]  "
                    >
                      {data2?.map((item, ii) => {
                        if (item.id == el.userId) {
                          return (
                            <>
                              <div className="h-[60px]  flex items-center w-full  ">
                                <div className=" h-[90%] w-full flex justify-between items-center  ">
                                  <div className="flex h-full items-center justify-between w-[250px]">
                                    <div
                                      key={ii}
                                      className="w-[50px] h-[50px] border rounded-full bgGradient flex items-center justify-center"
                                    >
                                      <div className="w-[90%] h-[90%] bg-[white] rounded-full flex items-center justify-center">
                                        {item.avatar == "" ? (
                                          <img
                                            src="https://tse1.mm.bing.net/th/id/OIP.BHI-bf_xIJUNIsSCsVH58AHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                            className="w-[90%] h-[90%] rounded-full"
                                            alt=""
                                          />
                                        ) : (
                                          <img
                                            src={`${img}${item.avatar}`}
                                            className="w-[90%] h-[90%] rounded-full"
                                            alt=""
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="w-[190px] h-[90%] flex flex-col justify-center ">
                                      <h1>{item.fullName}</h1>
                                      <p className="text-[gray]">
                                        {item.userName}
                                      </p>
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
                        <Swiper
                          pagination={{
                            dynamicBullets: true,
                          }}
                          modules={[Pagination]}
                          className="mySwiper"
                        >
                          {el.images?.map((e) => {
                            // console.log(e);
                            return (
                              <>
                                <SwiperSlide key={e.id}>
                                  {e.at(-1) == "4" ? (
                                    <video
                                      controls
                                      autoPlay
                                      muted
                                      type="video/mp4"
                                      style={{
                                        objectFit: "cover",
                                        width: "100%",
                                      }}
                                      className="w-[100%] h-full rounded"
                                      src={`${img}${e}`}
                                    ></video>
                                  ) : (
                                    <img
                                      src={`${img}${e}`}
                                      className="w-full h-full rounded object-cover"
                                      alt=""
                                    />
                                  )}
                                </SwiperSlide>
                              </>
                            );
                          })}
                        </Swiper>
                      </div>
                      <div className="h-[45px]  flex justify-between items-center">
                        <div className="w-[90px] h-[35px]  flex justify-between items-center">
                          <div
                            onClick={() => {
                              dispatch(likePost(el.postId));
                              // loading = false;
                            }}
                            className="w-[30px] h-[30px]  flex items-center justify-center"
                          >
                            {el.postLike ? (
                              <FavoriteRoundedIcon
                                sx={{ fontSize: 20, color: "red" }}
                              />
                            ) : (
                              <FavoriteBorderRoundedIcon
                                sx={{ fontSize: 20 }}
                              />
                            )}
                          </div>
                          <div
                            onClick={() => {
                              setCommetModal(true);
                              dispatch(getById(el.postId));
                            }}
                            className="w-[30px] h-[30px]  flex items-center justify-center"
                          >
                            <img
                              className="w-[20px]"
                              src="src\icons\home\comentIcon.svg"
                              alt=""
                            />
                          </div>
                          <div
                            onClick={() => {}}
                            className="w-[30px] h-[30px]  flex items-center justify-center "
                          >
                            <SendOutlinedIcon sx={{ fontSize: 20 }} />
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            dispatch(addFavorite(el.postId));
                          }}
                          className="w-[35px] h-[35px]  flex items-center justify-center"
                        >
                          {el.postFavorite ? (
                            <BookmarkOutlinedIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <BookmarkBorderOutlinedIcon sx={{ fontSize: 20 }} />
                          )}
                        </div>
                      </div>
                      <div className="h-[110px]   bg--600">
                        {data2?.map((item) => {
                          if (item.id == el.userId) {
                            return (
                              <div key={item.id} className="">
                                <div className="flex items-center bg--500">
                                  <div className="w-[25px] h-[25px] border rounded-full bgGradient flex items-center justify-center">
                                    <div className="w-[90%] h-[90%] rounded-full bg-[white] flex items-center justify-center">
                                      {item.avatar == "" ? (
                                        <img
                                          src="https://tse1.mm.bing.net/th/id/OIP.BHI-bf_xIJUNIsSCsVH58AHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                          className="w-[90%] h-[90%] rounded-full"
                                          alt=""
                                        />
                                      ) : (
                                        <img
                                          src={`${img}${item.avatar}`}
                                          className="w-[90%] h-[90%] rounded-full"
                                          alt=""
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <h1 className="ml-2 font-bold ">
                                    {el.postLikeCount} отметок "Нравится"
                                  </h1>
                                </div>
                                <div className="flex items-center bg--500 h-[30px] ">
                                  <h1 className="font-bold tracking-[0.5px]">
                                    {item.userName}:
                                  </h1>
                                  <h1 className="ml-2 tracking-[0.5px]">
                                    {el.title}
                                  </h1>
                                </div>
                                <div className="">
                                  <p className="text-[gray] tracking-[1px]">
                                    Все комментарии: {el.commentCount}
                                  </p>
                                </div>
                                <div className="">
                                  <p className="text-[gray] tracking-[0.5px]">
                                    {el.content}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                      <div className="h-[50px] flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="Добавьте комментарий..."
                          className="h-[30px] w-[80%] outline-none"
                          value={commentInput}
                          onChange={(ev) => setCommentInput(ev.target.value)}
                        />
                        <div className="flex">
                          {commentInput != "" ? (
                            <h1
                              onClick={() => {
                                dispatch(
                                  addComment({
                                    comment: commentInput,
                                    postId: el.postId,
                                  })
                                );
                                setCommentInput("");
                              }}
                              className="text-blue-500 cursor-pointer mr-2 text-[15px] "
                            >
                              Sent
                            </h1>
                          ) : null}
                          <SentimentSatisfiedAltOutlinedIcon
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className=" w-[30%]">
          {loadingYour ? (
            <>
              <Stack
                spacing={1}
                style={{
                  width: "450px",
                  margin: "auto",
                  marginTop: "5px",
                  display: "flex",
                }}
              >
                <div className="flex justify-between ">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rounded" width={400} height={35} />
                </div>
              </Stack>
            </>
          ) : (
            <>
              <div className=" flex justify-between h-[95px] items-center">
                <div className="w-[50px] h-[50px] border rounded-full">
                  {getYourData?.image == "" ? (
                    <img
                      src="https://tse1.mm.bing.net/th/id/OIP.BHI-bf_xIJUNIsSCsVH58AHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                      className="w-full h-full rounded-full "
                      alt=""
                    />
                  ) : (
                    <img
                      src={`${img}${getYourData?.image}`}
                      className="w-full h-full rounded-full "
                      alt=""
                    />
                  )}
                </div>
                <div className=" w-[335px] ml-2">
                  <h1>{getYourData?.userName}</h1>
                  <p className="text-[gray]">{getYourData?.fullName}</p>
                </div>
              </div>
            </>
          )}

          <div className="text-[gray] flex justify-between  h-[40px] items-center">
            <p>Suggested for you</p>
            <p>See all</p>
          </div>
          {loadingData2 ? (
            <>
              <Stack
                spacing={1}
                style={{
                  width: "450px",
                  margin: "auto",
                  marginTop: "5px",
                  display: "flex",
                }}
              >
                {panding?.map((el) => {
                  return (
                    <div key={el} className="flex justify-between ">
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rounded" width={400} height={35} />
                    </div>
                  );
                })}
              </Stack>
            </>
          ) : (
            <>
              {data2
                ?.filter((e) => {
                  return e.id != myId;
                })
                ?.slice(0, 6)
                ?.map((el) => {
                  return (
                    <div
                      key={el.id}
                      className=" flex justify-between h-[75px] items-center"
                    >
                      <div className="w-[50px] h-[50px] border rounded-full">
                        {el.avatar == "" ? (
                          <img
                            src="https://tse1.mm.bing.net/th/id/OIP.BHI-bf_xIJUNIsSCsVH58AHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                            className="w-full h-full rounded-full "
                            alt=""
                          />
                        ) : (
                          <img
                            src={`${img}${el.avatar}`}
                            className="w-full h-full rounded-full "
                            alt=""
                          />
                        )}
                      </div>
                      <div className=" w-[270px]">
                        <h1>{el.userName}</h1>
                        <p className="text-[gray]">{el.fullName}</p>
                      </div>

                      {el.subscriptions ? (
                        <>
                          {checkFollowData?.map((item) => {
                            if (item.userShortInfo.userId == el.id) {
                              return (
                                <>
                                  <h1
                                    onClick={() => {
                                      dispatch(deleteFolow(item.id));
                                    }}
                                    className="text-[#3B82F6] font-bold cursor-pointer border p-[3px_15px] rounded border-blue-300 "
                                  >
                                    Unfollow
                                  </h1>
                                </>
                              );
                            }
                          })}
                        </>
                      ) : (
                        <h1
                          onClick={() => {
                            dispatch(postFolow(el.id));
                          }}
                          className="bg-[#3B82F6] text-white rounded p-[3px_23px]  font-bold cursor-pointer "
                        >
                          Follow
                        </h1>
                      )}
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
      {/* histoty */}
      <React.Fragment>
        <Dialog
          open={storiesModal}
          onClose={() => setStoriesModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="none"
          sx={{ bgcolor: "black" }}
        >
          <div className="w-[500px] h-[700px] overflow-y-hidden bg-white">
            <p className="hidden">
              {(stories[0].url = img + getStoriesByIdData?.fileName)}
            </p>

            <Stories width="100%" height="100%" stories={stories} />
            <div className="w-[90%] h-[60px]  absolute top-[610px] left-6 flex items-center justify-between">
              <input
                type="text"
                className="bg-transparent border w-[350px] h-[40px] rounded-xl text- z-50 outline-none "
                placeholder="Отправить..."
              />
              {getStoriesByIdData?.viewerDto?.viewLike > 0 ? (
                <div
                  onClick={() => {
                    dispatch(postLikeStory(getStoriesByIdData?.id));
                  }}
                  className="z-50 w-[50px] h-[40px] flex justify-center items-center"
                >
                  <FavoriteRoundedIcon
                    onClick={() => {
                      dispatch(postLikeStory(getStoriesByIdData?.id));
                    }}
                    sx={{ color: "red", fontSize: 30 }}
                  />
                </div>
              ) : (
                <div
                  onClick={() => {
                    dispatch(postLikeStory(getStoriesByIdData?.id));
                  }}
                  className="z-50 w-[50px] h-[40px] flex justify-center items-center"
                >
                  <FavoriteBorderRoundedIcon
                    sx={{ color: "white", fontSize: 30 }}
                  />
                </div>
              )}

              <SendOutlinedIcon sx={{ color: "white", fontSize: 30 }} />
            </div>
          </div>
        </Dialog>
      </React.Fragment>
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
          <div className="w-[1000px] h-[600px] bg-white flex items-center justify-between">
            <div className="w-[50%] h-full">
              {getByIdData && getByIdData?.images[0].at(-1) == "4" ? (
                <video
                  controls
                  autoPlay
                  muted
                  type="video/mp4"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                  }}
                  className="w-[100%] h-full rounded"
                  src={`${img}${getByIdData?.images[0]}`}
                ></video>
              ) : (
                <img
                  src={`${img}${getByIdData?.images[0]}`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              )}
            </div>
            <div className="w-[50%] h-full">
              <div className="h-[80px] w-[95%] m-auto bg--500 border-b-[1px] flex items-center ">
                <div className="w-[37px] h-[37px] rounded-full border ">
                  {data2?.map((item) => {
                    if (getByIdData?.userId == item.id) {
                      return (
                        <>
                          <img
                            src={`${img}${item.avatar}`}
                            className="w-full h-full rounded-full"
                            alt=""
                          />
                        </>
                      );
                    }
                  })}
                </div>
                {data2?.map((item) => {
                  if (getByIdData?.userId == item.id) {
                    return (
                      <>
                        <h1 className="ml-3">{item.userName}</h1>
                      </>
                    );
                  }
                })}
              </div>
              <div className="h-[380px] bg--500 overflow-x-hidden">
                {getByIdData?.comments?.map((el) => {
                  return (
                    <div className="w-[95%] m-auto h-[50px] flex items-center">
                      <div className="h-[90%]   w-full flex items-center ">
                        {data2?.map((item, ii) => {
                          if (item.id === el.userId) {
                            return (
                              <>
                                <div className="w-[37px] h-[37px] border rounded-full">
                                  {item.avatar == "" ? (
                                    <img
                                      src="https://tse1.mm.bing.net/th/id/OIP.BHI-bf_xIJUNIsSCsVH58AHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                      className="w-full h-full rounded-full"
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      src={`${img}${item.avatar}`}
                                      className="w-full h-full rounded-full"
                                      alt=""
                                    />
                                  )}
                                </div>
                                <div className="">
                                  <div className="flex">
                                    <h className=" ml-3 text-[15px]">
                                      {item.userName}:
                                    </h>
                                    <p className="text-[gray] ml-3 text-[14px]">
                                      {el.comment}
                                    </p>
                                  </div>
                                  <p className="text-[10px] ml-6">
                                    {el.dateCommented.slice(0, 10)}
                                  </p>
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-[95%] m-auto h-[120px] bg--700 ">
                <div className="h-[45px]  flex justify-between items-center">
                  <div className="w-[90px] h-[35px]  flex justify-between items-center">
                    <div
                      onClick={() => {
                        dispatch(likePost(getByIdData?.postId));
                      }}
                      className="w-[30px] h-[30px]  flex items-center justify-center"
                    >
                      {getByIdData?.postLike ? (
                        <FavoriteRoundedIcon
                          sx={{ fontSize: 20, color: "red" }}
                        />
                      ) : (
                        <FavoriteBorderRoundedIcon sx={{ fontSize: 20 }} />
                      )}
                    </div>
                    <div
                      onClick={() => {}}
                      className="w-[30px] h-[30px]  flex items-center justify-center"
                    >
                      <img
                        className="w-[20px]"
                        src="src\icons\home\comentIcon.svg"
                        alt=""
                      />
                    </div>
                    <div
                      onClick={() => {}}
                      className="w-[30px] h-[30px]  flex items-center justify-center"
                    >
                      <SendOutlinedIcon sx={{ fontSize: 20 }} />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      dispatch(addFavorite(getByIdData?.postId));
                    }}
                    className="w-[35px] h-[35px]  flex items-center justify-center"
                  >
                    {getByIdData?.postFavorite ? (
                      <BookmarkOutlinedIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <BookmarkBorderOutlinedIcon sx={{ fontSize: 20 }} />
                    )}
                  </div>
                </div>
                <div className=" h-[40px]  bg--500 ">
                  <h1 className="font-bold">
                    {getByIdData?.postLikeCount} отметок "Нравится"
                  </h1>
                  <p className="text-[12px] text-[gray]">
                    {getByIdData?.datePublished.slice(0, 10)}
                  </p>
                </div>
                <div className="  flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Добавьте комментарий..."
                    className="h-[30px] w-[80%] outline-none"
                    value={commentInput}
                    onChange={(ev) => setCommentInput(ev.target.value)}
                  />
                  <div className="flex">
                    {commentInput != "" ? (
                      <h1
                        onClick={() => {
                          dispatch(
                            addComment({
                              comment: commentInput,
                              postId: getByIdData?.postId,
                            })
                          );
                          setCommentInput("");
                        }}
                        className="text-blue-500 cursor-pointer mr-2 text-[15px] "
                      >
                        Sent
                      </h1>
                    ) : null}
                    <SentimentSatisfiedAltOutlinedIcon onClick={handleClick} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
      {/* Icons */}
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div className="w-[300px] h-[100px]">
            <div className=" h-[30px] flex">
              <p
                onClick={() => setCommentInput(commentInput + "😂")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😂
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😳")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😳
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😒")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😒
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😔")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😔
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😃")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😃
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😡")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😡
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😏")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😏
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "🙈")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                🙈
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😘")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😘
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "👍")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                👍
              </p>
            </div>
            <div className="h-[30px] flex">
              <p
                onClick={() => setCommentInput(commentInput + "😞")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😞
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😱")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😱
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😝")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😝
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😢")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😢
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😉")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😉
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😜")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😜
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😍")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😍
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😊")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😊
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😁")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😁
              </p>
              <p
                onClick={() => setCommentInput(commentInput + "😄")}
                className="w-[30px] h-[30px] hover:bg-[#80808029] cursor-pointer flex items-center justify-center rounded"
              >
                😄
              </p>
            </div>
          </div>
        </Menu>
      </div>
    </>
  );
};

export default Home;
