import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Swiper from "../../components/Swiper/Swiper";
import { useEffect, useState } from "react";
import { getBrands } from "../../services/productApi";
import BrandItem from "../../components/BrandItem/BrandItem";
import css from "./Home.module.css";
import Footer from "../../components/Footer/Footer";
import CatalogHome from "../../components/CatalogHome/CatalogHome";

const Home = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [visibleBrandsCount, setVisibleBrandsCount] = useState(5);
  const [openList, setOpenList] = useState(false);

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
  }, []);

  const toggleOpenList = () => {
    setOpenList((prevState) => !prevState);
    if (!openList) {
      setVisibleBrandsCount(brands.length);
    } else {
      setVisibleBrandsCount(5);
    }
  };

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };

  return (
    <div>
      <Header />
      <Swiper />
      <CatalogHome />
      <div className={css.brandBox}>
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
      <button className={css.btnOpen} onClick={toggleOpenList}>
        {openList ? "Згорнути" : "Показати ще"}
      </button>
      <Footer />
    </div>
  );
};

export default Home;
