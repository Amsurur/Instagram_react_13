import React from "react";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Home = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
    ]);
  };
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="w-[850px] bg-orange-400">
          <div className="border w-[90%] h-[70px] m-auto">
            <Swiper
              style={{ width: "100%", height: "90%" }}
              onSwiper={setSwiperRef}
              slidesPerView={3}
              // centeredSlides={true}
              spaceBetween={30}
              // pagination={{
              //   type: "fraction",
              // }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
              <SwiperSlide></SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className=" w-[400px] h-[400px]">
          <div className="bg-red-400 flex justify-between h-[95px] items-center">
            <div className="w-[50px] h-[50px] border rounded-full"></div>
            <div className="bg-slate-400 w-[335px]">
              <h1>Name</h1>
              <p className="text-[gray]">Description</p>
            </div>
          </div>
          <div className="text-[gray] flex justify-between bg-slate-400 h-[40px] items-center">
            <p>Suggested for you</p>
            <p>See all</p>
          </div>
          <div className="bg-red-400 flex justify-between h-[75px] items-center">
            <div className="w-[50px] h-[50px] border rounded-full"></div>
            <div className="bg-slate-400 w-[270px]">
              <h1>Name</h1>
              <p className="text-[gray]">Description</p>
            </div>
            <h1 className="text-[#3B82F6] font-bold ">Follow</h1>
          </div>
          <div className="bg-red-400 flex justify-between h-[75px] items-center">
            <div className="w-[50px] h-[50px] border rounded-full"></div>
            <div className="bg-slate-400 w-[270px]">
              <h1>Name</h1>
              <p className="text-[gray]">Description</p>
            </div>
            <h1 className="text-[#3B82F6] font-bold ">Follow</h1>
          </div>
          <div className="bg-red-400 flex justify-between h-[75px] items-center">
            <div className="w-[50px] h-[50px] border rounded-full"></div>
            <div className="bg-slate-400 w-[270px]">
              <h1>Name</h1>
              <p className="text-[gray]">Description</p>
            </div>
            <h1 className="text-[#3B82F6] font-bold ">Follow</h1>
          </div>
          <div className="bg-red-400 flex justify-between h-[75px] items-center">
            <div className="w-[50px] h-[50px] border rounded-full"></div>
            <div className="bg-slate-400 w-[270px]">
              <h1>Name</h1>
              <p className="text-[gray]">Description</p>
            </div>
            <h1 className="text-[#3B82F6] font-bold ">Follow</h1>
          </div>
          <div className="bg-red-400 flex justify-between h-[75px] items-center">
            <div className="w-[50px] h-[50px] border rounded-full"></div>
            <div className="bg-slate-400 w-[270px]">
              <h1>Name</h1>
              <p className="text-[gray]">Description</p>
            </div>
            <h1 className="text-[#3B82F6] font-bold ">Follow</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
