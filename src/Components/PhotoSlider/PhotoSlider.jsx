import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderFoto1 from "../../Img/slideShow-1.jpg";
import sliderFoto2 from "../../Img/slideShow-2.jpg";
import sliderFoto3 from "../../Img/slideShow-3.jpg";
import sliderFoto4 from "../../Img/slideShow-4.jpg";
import css from "./PhotoSlider.module.css";

const PhotoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div className={css.fullWidthImageContainer}>
        <img
          className={css.fullWidthImage}
          src={sliderFoto1}
          alt="Image 1"
          width="100"
          height="100"
        />
      </div>
      <div className={css.fullWidthImageContainer}>
        <img
          className={css.fullWidthImage}
          src={sliderFoto2}
          alt="Image 2"
          width="100"
          height="100"
        />
      </div>
      <div className={css.fullWidthImageContainer}>
        <img
          className={css.fullWidthImage}
          src={sliderFoto3}
          alt="Image 2"
          width="100"
          height="100"
        />
      </div>
      <div className={css.fullWidthImageContainer}>
        <img
          className={css.fullWidthImage}
          src={sliderFoto4}
          alt="Image 2"
          width="100"
          height="100"
        />
      </div>
    </Slider>
  );
};

export default PhotoSlider;
