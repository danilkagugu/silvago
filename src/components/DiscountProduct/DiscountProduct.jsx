import { useEffect, useState } from "react";

import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";
import CatalogListItem from "../CatalogListItem/CatalogListItem";
import { Navigation } from "swiper/modules";

import "swiper/css";
import css from "./DiscountProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectDiscountProducts } from "../../redux/product/selectors";
import { fetchDiscountProducts } from "../../redux/product/operations";

const DiscountProduct = () => {
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});

  const [selectedVolume, setSelectedVolume] = useState({});

  const discountProducts = useSelector(selectDiscountProducts);

  useEffect(() => {
    dispatch(fetchDiscountProducts());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities = {};
    const initialVolume = {};
    discountProducts.forEach((p) => {
      initialQuantities[p._id] = 1;
      const defaultVolume = getDefaultVolume(p.volumes);
      if (defaultVolume) {
        initialVolume[p._id] = defaultVolume;
      }
    });
    setQuantities(initialQuantities);
    setSelectedVolume(initialVolume);
  }, [discountProducts]);

  const getDefaultVolume = (volumes) =>
    volumes && volumes.length ? Math.max(...volumes.map((v) => v.volume)) : 0;

  const breakpoints = {
    0: { slidesPerView: "auto", spaceBetween: 10 },
    481: { slidesPerView: "auto", spaceBetween: 20 },
    769: { slidesPerView: "auto", spaceBetween: 30 },
    1025: { slidesPerView: "auto", spaceBetween: 40 },
    1441: { slidesPerView: 5, spaceBetween: 50 },
  };

  const navigation = {
    prevEl: `.${css.swiperButtonPrev}`,
    nextEl: `.${css.swiperButtonNext}`,
  };

  return (
    <div className={css.swiperContainer}>
      <Swiper
        className={css.swiper}
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={5}
        navigation={navigation}
        freeMode={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={breakpoints}
      >
        {discountProducts &&
          discountProducts.map((item) => (
            <SwiperSlide key={item._id} className={css.swiperSlide}>
              {/* <CatalogListItem
                product={item}
                quantities={quantities}
                selectedVolume={selectedVolume}
              /> */}
            </SwiperSlide>
          ))}
        <button className={css.swiperButtonPrev}>
          <CiSquareChevLeft className={css.chevrone} />
        </button>
        <button className={css.swiperButtonNext}>
          <CiSquareChevRight className={css.chevrone} />
        </button>
      </Swiper>
    </div>
  );
};

export default DiscountProduct;
