import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css/bundle";
import "swiper/css";

import css from "./ProductPhotoCarusel.module.css";
import { Thumbs } from "swiper/modules";

const ProductPhotoCarusel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Додаємо стан для активного індексу

  return (
    <div>
      {/* Головна карусель */}

      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className={css.mainSwiper}
        modules={[Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Оновлення активного індексу
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Product image ${index}`} />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Мініатюри */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className={css.thumbsSwiper}
        modules={[Thumbs]}
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className={`${css.swipe} ${
                  activeIndex === index ? css.activeThumbnail : ""
                }`} // Перевірка активного індексу
              >
                <img src={image} alt={`Thumbnail ${index}`} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductPhotoCarusel;
