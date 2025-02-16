import css from "./ProductMedia.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
// import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Thumbs } from "swiper/modules";

const ProductMedia = ({ volume }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className={css.productColumnContainer}>
      <div className={css.productColumnItem}>
        <div className={css.productGallery}>
          <section className={css.galerry}>
            <div className={css.titlePhoto}>
              {volume?.images?.length > 0 && (
                <Swiper
                  spaceBetween={10}
                  thumbs={{ swiper: thumbsSwiper }}
                  className={css.titlePhotoContainer}
                  modules={[Thumbs, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  wrapperTag="ul"
                  watchSlidesProgress={true}
                >
                  {volume?.images.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      tag="li"
                      className={css.galerryItem}
                    >
                      <div className={css.galleryLink}>
                        <img
                          className={css.galleryPhotoImg}
                          src={image}
                          alt={`Product image ${index}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className={css.productSticker}>
                <div className={css.productStickerImage}>
                  <span className={css.productStickerImageWrap}>
                    <img
                      src="#"
                      alt="Стікер"
                      className={css.productStickerImg}
                    />
                  </span>
                </div>
              </div>
              <a href="#" className={css.galleryProductLogo}>
                <img src="#" alt="Бренд" width={60} height={60} />
              </a>
            </div>
            <div className={css.photoCarusel}>
              <div className={css.galleryThumbnailsContainer}>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  // spaceBetween={10}
                  slidesPerView={"auto"} // Кількість слайдів за шириною
                  centeredSlides={true} // Вимикає центровані слайди
                  freeMode={true}
                  watchSlidesProgress={true}
                  className={css.thumbsSwiper}
                  modules={[Thumbs]}
                  wrapperTag="ul"
                  wrapperClass={css.galleryThumbnailsList}
                >
                  {volume &&
                    volume?.images.map((image, index) => (
                      <SwiperSlide
                        key={index}
                        tag="li"
                        className={`${css.galleryThumb}`}
                      >
                        <div
                          className={`${css.galleryThumbSpan}  `} // Перевірка активного індексу
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index}`}
                            className={css.galleryThumbImg}
                            width={78}
                            height={78}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductMedia;
{
  // ${
  //             activeIndex === index ? css.activeThumbnail : ""
  //         }
  /* <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className={css.thumbsSwiper}
                    modules={[Thumbs]}
                  >
                    {volume &&
                      volume?.images.map((image, index) => (
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
                  </Swiper> */
}
