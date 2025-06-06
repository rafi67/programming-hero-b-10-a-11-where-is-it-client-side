import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <motion.div initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
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
    </motion.div>
  );
};

export default Banner;
