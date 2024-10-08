import css from "./Swiper.module.css";
import "swiper/css";
import p1 from "./d3d353d8672cffbe88252f09c825846f.jpg";
import p2 from "./e8c9b388548a95b409ecfb342148f83e.jpg";
import p3 from "./effect_korean_cosmetics_blog.jpg";
import p4 from "./3300671100_w600_h300_3300671100.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
const SwiperPhoto = () => {
  return (
    <div className={css.swiperBox}>
      <Swiper
        className={css.swiper}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <img className={css.photo} src={p1} alt="q" />
        </SwiperSlide>
        <SwiperSlide>
          <img className={css.photo} src={p2} alt="q" />
        </SwiperSlide>
        <SwiperSlide>
          <img className={css.photo} src={p3} alt="q" />
        </SwiperSlide>
        <SwiperSlide>
          <img className={css.photo} src={p4} alt="q" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperPhoto;
