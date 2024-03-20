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
import { getReels } from "../../api/reels/Reels";
import { IconButton } from "@mui/material";

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
                  <SwiperSlide>
                    <span></span>
                    <video controls>
                      <source
                        type="video/mp4"
                        src={`${imageApi}${el.images}`}
                      />
                    </video>

                    <div className="w-[40px] h-[300px]  grid absolute left-[390px] mt-[290px]">
                      {/* <VolumeOffIcon /> */}
                      <p>
                        <VolumeOffIcon className="text-[white]" />

                        <VolumeUpIcon className="text-[white]" />
                      </p>
                      <IconButton
                        sx={{
                          flexDirection: "column-reverse",
                          gap: "30px",
                          marginTop: "20px",
                        }}
                      >
                        <SendIcon
                          sx={{ width: "40px", height: "40px" }}
                          color="primary"
                        />

                        <CommentIcon
                          sx={{ width: "40px", height: "40px" }}
                          color="info"
                        />
                        <FavoriteBorderIcon
                          sx={{ width: "40px", height: "40px" }}
                          color="primary"
                        />
                      </IconButton>
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
