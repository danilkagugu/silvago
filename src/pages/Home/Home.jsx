import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBrands } from "../../services/productApi";
import BrandItem from "../../components/BrandItem/BrandItem";
import css from "./Home.module.css";
import CatalogHome from "../../components/CatalogHome/CatalogHome";
import SwiperPhoto from "../../components/SwiperPhoto/SwiperPhoto";
import Layout from "../../components/Layout/Layout";

const Home = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [visibleBrandsCount, setVisibleBrandsCount] = useState(5);
  const [openList, setOpenList] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1440); // Перевірка екрану

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const brands = await getBrands();
        setBrands(brands);
      } catch (error) {
        console.log("Error fetching brands:", error);
      }
    };
    fetchProducts();

    // Слухач для зміни розміру екрану
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1440);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleOpenList = () => {
    // Виконуємо логіку тільки якщо не мобільний пристрій
    if (!isMobile) {
      setOpenList((prevState) => !prevState);
      if (!openList) {
        setVisibleBrandsCount(brands.length);
      } else {
        setVisibleBrandsCount(5);
      }
    }
  };

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
          {brands
            .slice(0, isMobile ? brands.length : visibleBrandsCount)
            .map((item) => (
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
      {!isMobile && (
        <button className={css.btnOpen} onClick={toggleOpenList}>
          {openList ? "Згорнути" : "Показати ще"}
        </button>
      )}
      {/* <Footer /> */}
    </Layout>
  );
};

export default Home;
