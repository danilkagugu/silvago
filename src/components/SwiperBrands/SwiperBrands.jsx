import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getBrands } from "../../services/productApi";
import BrandItem from "../BrandItem/BrandItem";
import css from "./SwiperBrands.module.css";
import { Navigation, Pagination } from "swiper/modules";

const SwiperBrands = () => {
  const [brands, setBrands] = useState([]);
  const [visibleBrandsCount, setVisibleBrandsCount] = useState(5);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await getBrands();
        setBrands(brands);
      } catch (error) {
        console.log("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const toggleOpenList = () => {
    setOpenList((prevState) => !prevState);
    if (!openList) {
      setVisibleBrandsCount(brands.length);
    } else {
      setVisibleBrandsCount(5);
    }
  };

  // Бренди, що відображаються у Swiper
  const swiperBrands = brands.slice(0, 5);
  // Бренди, що з'являються після натискання "Показати ще"
  const additionalBrands = openList ? brands.slice(5) : [];

  return (
    <div>
      <Swiper
        spaceBetween={15} // відстань між елементами списку
        slidesPerView={5} // кількість елементів на екрані
        allowTouchMove={false} // вимикає свайп
        navigation={false} // вимикає навігаційні кнопки
        pagination={false} // вимикає пагінацію
        modules={[Navigation, Pagination]}
      >
        {swiperBrands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <div className={css.cardContainer}>
              <BrandItem brandImg={brand.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {!openList && (
        <button className={css.showMoreButton} onClick={toggleOpenList}>
          Показати ще
        </button>
      )}
      {openList && (
        <div className={css.additionalBrands}>
          {additionalBrands.map((brand) => (
            <div key={brand._id} className={css.cardContainer}>
              <BrandItem brandImg={brand.image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SwiperBrands;
