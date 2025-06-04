import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img
          className="w-screen h-screen"
          src="https://i.ibb.co/cX7SyNHM/teddy-bear-1835598-1920.jpg"
          alt="teddy"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-screen h-screen"
          src="https://i.ibb.co/VYhkf3SJ/ballet-4673922-1280.jpg"
          alt="ballet"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="w-screen h-screen"
          src="https://i.ibb.co/LXsHh99m/eyeliner-4713577-1920.jpg"
          alt="eyeliner"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
