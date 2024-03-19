import React from "react";
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

  const [playPublic, setPlayPublic] = useState(false);
  const [likePublic, setLikePublic] = useState(false);
  const [commentPublic, setCommentPublic] = useState(false);
  const [savePublic, setSavePublic] = useState(false);

  const [moreInformations, setMoreInformations] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [commentInput, setCommentInput] = useState("");

  return (
    <>
      <div className="w-full flex justify-around mt-7">
        <div className="w-[620px]   ">
          <div className=" w-[100%] h-[110px] m-auto flex items-center bg-transparent">
            <Swiper
              style={{ width: "100%", height: "90%" }}
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
            {users.map((el) => {
              return (
                <div key={el.id} className="w-full h-[900px] border-b-[1px] ">
                  <div className="h-[60px]  flex items-center justify-between">
                    <div className=" h-[95%] flex justify-between items-center">
                      <div className="w-[50px] h-[50px] border rounded-full bgGradient flex items-center justify-center">
                        <img
                          src={el.img}
                          className="w-[90%] h-[90%] rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="w-[190px] h-[90%] flex flex-col justify-center">
                        <h1>{el.name}</h1>
                        <p className="text-[gray]">{el.desc}</p>
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
                  <div className="h-[600px] border rounded ">
                    <img
                      src={el.img}
                      className="w-full h-full rounded"
                      alt=""
                    />
                    <div
                      onClick={() => {
                        setPlayPublic(!playPublic);
                      }}
                      className="w-[50px] h-[50px] rounded-full bg-[#000000a9]  relative top-[-65px] left-[555px] flex items-center justify-center"
                    >
                      {playPublic ? (
                        <VolumeDownSharpIcon
                          style={{
                            color: "white",
                          }}
                        />
                      ) : (
                        <VolumeOffSharpIcon
                          style={{
                            color: "white",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="h-[45px]  flex justify-between items-center">
                    <div className="w-[130px] h-[35px]  flex justify-between items-center">
                      <div
                        onClick={() => {
                          setLikePublic(!likePublic);
                        }}
                        className="w-[30px] h-[30px]  flex items-center justify-center"
                      >
                        {likePublic ? (
                          <FavoriteRoundedIcon sx={{ fontSize: 30 }} />
                        ) : (
                          <FavoriteBorderRoundedIcon sx={{ fontSize: 30 }} />
                        )}
                      </div>
                      <div
                        onClick={() => {
                          setCommentPublic(!commentPublic);
                        }}
                        className="w-[30px] h-[30px]  flex items-center justify-center"
                      >
                        {commentPublic ? (
                          <ChatBubbleOutlinedIcon sx={{ fontSize: 30 }} />
                        ) : (
                          <ChatBubbleOutlineOutlinedIcon
                            sx={{ fontSize: 30 }}
                          />
                        )}
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
                    <h1 className="ml-2">
                      {likePublic ? 1 + el.likes : el.likes} likes
                    </h1>
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
        <div className=" w-[400px]">
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
      {moreInformations ? (
        <div className="w-full h-full absolute top-0 left-0 bg-[#80808066] z-10 "></div>
      ) : null}
      {/* information */}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Home;
