import { useEffect, useState } from "react";
import CatalogListItem from "../CatalogListItem/CatalogListItem";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import css from "./TopSellingProduct.module.css";
import { Navigation } from "swiper/modules";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { selectTopProducts } from "../../redux/product/selectors";
import { fetchTopProducts } from "../../redux/product/operations";

const TopSellingProduct = () => {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [selectedVolume, setSelectedVolume] = useState({});
  const topProducts = useSelector(selectTopProducts);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  useEffect(() => {
    const initialQuantities = {};
    const initialVolume = {};
    topProducts.forEach((p) => {
      initialQuantities[p._id] = 1;
      // console.log("initialQuantities: ", initialQuantities);
      const defaultVolume = getDefaultVolume(p.volumes);
      if (defaultVolume) {
        initialVolume[p._id] = defaultVolume;
      }
    });
    setQuantities(initialQuantities);
    setSelectedVolume(initialVolume);
  }, [topProducts]);

  const getDefaultVolume = (volumes) =>
    volumes && volumes.length ? Math.max(...volumes.map((v) => v.volume)) : 0;
  const breakpoints = {
    0: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
    481: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
    769: {
      slidesPerView: "auto",
      spaceBetween: 30,
    },
    1025: {
      slidesPerView: "auto",
      spaceBetween: 40,
    },
    1441: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
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
        {topProducts.map((item) => (
          <SwiperSlide key={item._id} className={css.swiperSlide}>
            {/* <CatalogListItem
              product={item}
              quantities={quantities}
              selectedVolume={selectedVolume}
            /> */}
          </SwiperSlide>
        ))}
        {/* <CustomPrevButton slideTo={2} />
        <CustomNextButton slideTo={2} /> */}
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

export default TopSellingProduct;
