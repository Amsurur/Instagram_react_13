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

const Reels = () => {
  let data = useSelector((state) => state.reels?.data);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReels());
  }, []);
  let imageApi = import.meta.env.VITE_APP_FILES_URL;

  const [one, setOne] = useState(false);

  return (
    <>
      <div className=" relative flex mt-2">
        <div className="w-[520px] h-[620px] m-auto   ">
          <Swiper
            slidesPerView={1}
            spaceBetween={40}
            mousewheel={true}
            direction={"vertical"}
            style={{
              border: "1px solid blue",
              borderRadius: "10px",
              width: "450px",
            }}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <div>
              {data?.map((el) => {
                return (
                  <SwiperSlide key={el.postId}>
                    <div className="bg-slate-900 ">
                      <video
                        controls
                        style={{ height: "650px", width: "600px" }}
                      >
                        <source
                          className="w-[full] h-[full]"
                          type="video/mp4"
                          src={`${imageApi}${el.images}`}
                        />
                      </video>
                    </div>
                    <div className="w-[40px] h-[300px]  grid absolute left-[390px] mt-[290px]">
                      {/* <VolumeOffIcon /> */}
                      <p></p>
                      <button
                        onClick={() => dispatch(likeReel(el.postId))}
                        className="w-[30px]"
                      >
                        {el.postLike ? (
                          <Favorite
                            style={{ color: "red" }}
                            sx={{ width: "40px", height: "30px" }}
                            color="error"
                          ></Favorite>
                        ) : (
                          <FavoriteBorder
                            sx={{ width: "40px", height: "30px" }}
                            style={{ color: "white" }}
                          ></FavoriteBorder>
                        )}
                        <span style={{ color: "white", margin: "50%" }}>
                          {el.postLikeCount}
                        </span>
                      </button>
                      <CommentIcon
                        style={{ color: "white" }}
                        sx={{ width: "40px", height: "30px" }}
                        color="info"
                      />
                      <SendIcon
                        style={{ color: "white" }}
                        sx={{ width: "40px", height: "30px" }}
                        color="info"
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Reels;
