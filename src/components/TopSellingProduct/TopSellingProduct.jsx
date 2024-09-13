import { useEffect, useState } from "react";
import { getTopSellingProduct } from "../../services/productApi";
import CatalogListItem from "../CatalogListItem/CatalogListItem";
import {
  fetchFavoriteProducts,
  handleToggleFavorite,
} from "../../helpers/productActions";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import css from "./TopSellingProduct.module.css";
import { Navigation } from "swiper/modules";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";

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
const TopSellingProduct = () => {
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [selectedVolume, setSelectedVolume] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTopSellingProduct();
        setProducts(result);
        // Ініціалізація кількостей і вибраних обсягів
        const initialQuantities = {};
        const initialVolume = {};
        result.forEach((p) => {
          initialQuantities[p._id] = 1;
          const defaultVolume = getDefaultVolume(p.volumes);
          if (defaultVolume) {
            initialVolume[p._id] = defaultVolume;
          }
        });
        setQuantities(initialQuantities);
        setSelectedVolume(initialVolume);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchFavoriteProducts(setFavoriteProducts);
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
        {products.map((item) => (
          <SwiperSlide key={item._id} className={css.swiperSlide}>
            <CatalogListItem
              product={item}
              favoriteProducts={favoriteProducts}
              quantities={quantities}
              selectedVolume={selectedVolume}
              handleQuantityChange={handleQuantityChange}
              handleQuantityInputChange={handleQuantityInputChange}
              handleVolumeSelect={handleVolumeSelect}
              handleToggleFavorite={handleToggleFavorite}
              setFavoriteProducts={setFavoriteProducts}
              topProducts={products}
            />
          </SwiperSlide>
        ))}
        <CustomPrevButton slideTo={2} />
        <CustomNextButton slideTo={2} />
      </Swiper>
    </div>
  );
};

export default TopSellingProduct;
