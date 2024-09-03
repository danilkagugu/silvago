import { useEffect, useState } from "react";
import { getDiscountProducts } from "../../services/productApi";

import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import CatalogListItem from "../CatalogListItem/CatalogListItem";
import { Navigation } from "swiper/modules";
import {
  fetchFavoriteProducts,
  handleAddToBasket,
  handleToggleFavorite,
} from "../../helpers/productActions";
import "swiper/css";
import css from "./DiscountProduct.module.css";

const CustomPrevButton = ({ slideTo }) => {
  const swiper = useSwiper();
  return (
    <button
      className={css.swiperButtonPrev}
      onClick={() => swiper.slideTo(swiper.activeIndex - slideTo)}
    >
      <CiSquareChevLeft className={css.chevrone} />
    </button>
  );
};

const CustomNextButton = ({ slideTo }) => {
  const swiper = useSwiper();
  return (
    <button
      className={css.swiperButtonNext}
      onClick={() => swiper.slideTo(swiper.activeIndex + slideTo)}
    >
      <CiSquareChevRight className={css.chevrone} />
    </button>
  );
};

const DiscountProduct = () => {
  const [discountProducts, setDiscountProducts] = useState();
  // console.log("discountProducts: ", discountProducts);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [selectedVolume, setSelectedVolume] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDiscountProducts();
        // console.log("data: ", data);
        setDiscountProducts(data);
        const initialQuantities = {};
        const initialVolume = {};
        data.forEach((p) => {
          initialQuantities[p._id] = 1;
          const defaultVolume = getDefaultVolume(p.volumes);
          if (defaultVolume) {
            initialVolume[p._id] = defaultVolume;
          }
        });
        setQuantities(initialQuantities);
        setSelectedVolume(initialVolume);
        fetchFavoriteProducts(setFavoriteProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };

  const handleQuantityChange = (productId, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const handleQuantityInputChange = (productId, value) => {
    const newValue = Math.max(1, parseInt(value, 10) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newValue,
    }));
  };

  const handleVolumeSelect = (productId, volume) => {
    setSelectedVolume((prev) => ({
      ...prev,
      [productId]: volume,
    }));
  };

  return (
    <div className={css.swiperContainer}>
      <Swiper
        className={css.swiper}
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={5}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          // для екранів від 0px до 480px
          0: {
            slidesPerView: "auto",
            spaceBetween: 10,
          },
          // для екранів від 481px до 768px
          481: {
            slidesPerView: "auto",
            spaceBetween: 20,
          },
          // для екранів від 769px до 1024px
          769: {
            slidesPerView: "auto",
            spaceBetween: 30,
          },
          // для екранів від 1025px до 1440px
          1025: {
            slidesPerView: "auto",
            spaceBetween: 40,
          },
          // для екранів від 1441px і більше
          1441: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {discountProducts &&
          discountProducts.map((item) => (
            <SwiperSlide key={item._id} className={css.swiperSlide}>
              <CatalogListItem
                product={item}
                favoriteProducts={favoriteProducts}
                quantities={quantities}
                selectedVolume={selectedVolume}
                handleQuantityChange={handleQuantityChange}
                handleQuantityInputChange={handleQuantityInputChange}
                handleVolumeSelect={handleVolumeSelect}
                handleAddToBasket={handleAddToBasket}
                handleToggleFavorite={handleToggleFavorite}
                setFavoriteProducts={setFavoriteProducts}
              />
            </SwiperSlide>
          ))}
        <CustomPrevButton slideTo={2} />
        <CustomNextButton slideTo={2} />
      </Swiper>
    </div>
  );
};

export default DiscountProduct;
