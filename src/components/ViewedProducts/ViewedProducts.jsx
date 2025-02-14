import { useEffect, useState } from "react";
import css from "./ViewedProducts.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Потрібно імпортувати стилі Swiper
import { Navigation } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const ViewedProducts = () => {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("viewedProducts")) || [];
    setViewedProducts(storedProducts);
  }, []);
  const navigation = {
    prevEl: `.${css.swiperButtonPrev}`,
    nextEl: `.${css.swiperButtonNext}`,
  };

  //   const hasDiscount =
  //     Number(volume.discount) > 0;
  //   console.log("hasDiscount: ", hasDiscount);
  return (
    <section className={css.viewedProducts}>
      <div className={css.viewedProductsHead}>
        <div className={css.viewedProductsTitle}>Товари які ви переглянули</div>
      </div>
      <div className={css.viewedProductsContent}>
        <div className={css.viewedProductsConteiner}>
          <Swiper
            spaceBetween={0}
            slidesPerView={"auto"}
            className={css.viewedProductsWrapper}
            injectStyles={false}
            modules={[Navigation]}
            navigation={navigation}
          >
            {viewedProducts.length > 0 &&
              viewedProducts.map(({ product, volume }) => (
                <SwiperSlide
                  key={volume.idTorgsoft}
                  className={css.viewedProductsItem}
                  style={{ width: "130px" }}
                >
                  <div className={css.viewedProductsImage}>
                    <Link to={`/product/${volume.slug}`}>
                      <img src={volume.image} alt={product.modelName} />
                    </Link>
                  </div>
                  <div className={css.viewedProductsItemTitle}>
                    <Link to={`/product/${volume.slug}`}>
                      {volume.fullName}
                    </Link>
                  </div>
                  <div
                    className={`${css.viewedProductsPrice} ${
                      Number(volume.discount) > 0
                        ? css.viewedProductsPriceNew
                        : ""
                    }`}
                  >
                    {Number(
                      volume.discount > 0
                        ? volume.discountPrice
                        : volume.retailPrice
                    )}{" "}
                    грн
                  </div>
                  {Number(volume.discount) > 0 && (
                    <div
                      className={`${css.viewedProductsPrice} ${css.viewedProductsPriceOld}`}
                    >
                      {volume.retailPrice} грн
                    </div>
                  )}
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className={`${css.caruselNavBtn} ${css.swiperButtonPrev}`}>
          <IoChevronBack className={css.iconChevrone} />
        </div>
        <div className={`${css.caruselNavBtn} ${css.swiperButtonNext}`}>
          <IoChevronForward className={css.iconChevrone} />
        </div>
      </div>
    </section>
  );
};

export default ViewedProducts;
