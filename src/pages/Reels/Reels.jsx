import { Swiper, SwiperSlide } from "swiper/react";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReels } from "../../api/reels/Reels";

const Reels = () => {
  let data = useSelector((state) => state.reels?.data);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReels());
  }, []);

  return (
    <>
      <div className="bg-blue-500 relative flex">
        <div className="w-[520px] h-[620px] m-auto bg-red-300   ">
          <Swiper
            direction={"vertical"}
            style={{
              border: "1px solid blue",
              borderRadius: "10px",
              width: "450px",
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <div className="w-[50px] bg-red-500 flex ">
              <SwiperSlide>
                <video src=""></video>
              </SwiperSlide>

              <div className="bg-amber-400 w-[40px] h-[300px]  grid absolute z-50 items-end mt-[300px]">
                <FavoriteBorderIcon />
                <CommentIcon />
                <SendIcon />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Reels;
