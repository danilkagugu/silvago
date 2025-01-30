import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BrandItem from "../../components/BrandItem/BrandItem";
import css from "./Home.module.css";
import CatalogHome from "../../components/CatalogHome/CatalogHome";
import SwiperPhoto from "../../components/SwiperPhoto/SwiperPhoto";
import Layout from "../../components/Layout/Layout";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands } from "../../redux/inventoryStore/operations";
import { selectAllBrands } from "../../redux/inventoryStore/selectors";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [visibleBrandsCount, setVisibleBrandsCount] = useState(5);
  const [openList, setOpenList] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 1440);

  const brands = useSelector(selectAllBrands);

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 1440;
      if (isMobile) {
        setVisibleBrandsCount(5);
      } else if (openList) {
        setVisibleBrandsCount(brands.length);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // викликати при завантаженні компонента

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [brands.length, openList]);

  const toggleOpenList = useCallback(() => {
    if (!openList) {
      setVisibleBrandsCount(brands.length);
    } else {
      setVisibleBrandsCount(5);
    }
    setOpenList((prev) => !prev);
  }, [brands.length, openList]);

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };

  return (
    <Layout>
      <SwiperPhoto />
      <CatalogHome />
      <div
        className={`${css.brandBox} ${openList ? css.expanded : css.collapsed}`}
      >
        <ul className={css.list}>
          {brands.slice(0, visibleBrandsCount).map((item) => (
            <li
              key={item._id}
              className={css.listItem}
              onClick={() => handleBrandClick(item.name)}
            >
              <div className={css.cardContainer}>
                <BrandItem brandImg={item.image} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Приховуємо кнопку на мобільних пристроях */}
      {!openList && (
        <button className={css.btnOpen} onClick={toggleOpenList}>
          {openList ? "Згорнути" : "Показати ще"}
        </button>
      )}
      {/* <Footer /> */}
    </Layout>
  );
};

export default Home;
