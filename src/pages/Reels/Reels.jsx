import { Swiper, SwiperSlide } from "swiper/react";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getReels, likeReel } from "../../api/reels/Reels";
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

const Reels = () => {
  let data = useSelector((state) => state.reels?.data);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReels());
  }, []);
  let imageApi = import.meta.env.VITE_APP_FILES_URL;

  const [one, setOne] = useState(false);
  const handleScroll = () => {
    console.log("scrolling is True");
  };

  // function of Modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="p-[20px]">
        <div
          onScroll={() => handleScroll()}
          className="w-[600px] h-[660px] m-[auto]  overflow-y-auto p-[20px] overflow-x-hidden"
        >
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
                  {elem.postLike ? (
                    <Favorite
                      style={{
                        color: "red",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                      }}
                      color="error"
                      onClick={() => dispatch(likeReel(elem.postId))}
                    ></Favorite>
                  ) : (
                    <FavoriteBorder
                      style={{
                        color: "white",
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(likeReel(elem.postId))}
                    ></FavoriteBorder>
                  )}
                  <h1 className="text-[white] pl-[12px] pt-[5px]">
                    <span>{elem.postLikeCount}</span>
                  </h1>
                  <CommentIcon
                    onClick={() => handleClickOpen()}
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{
              width: "400px",
              height: "400px",
              marginLeft: "1070px",
              marginTop: "60px",
            }}
          >
            <div className="p-[20px] rounded-xl">
              <div className="flex items-center gap-[20px]">
                <CloseIcon onClick={() => handleClose()} />
                <h1 className="text-[18px] font-[500] text-[gray]">Comments</h1>
              </div>
              <div className="pt-[5px] pb-[5px] flex items-center">
                <input
                  className="text-[gray] text-[18px] w-[80%] h-[40px] pl-[10px] outline-none"
                  placeholder="Add a comment..."
                  type="text"
                />
                <AddReactionIcon sx={{ color: "gray" }} />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Reels;
