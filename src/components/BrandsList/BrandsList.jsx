import { useEffect, useState } from "react";
import BrandItem from "../BrandItem/BrandItem";
import css from "./BrandsList.module.css";
import { getBrands } from "../../services/productApi";
import { useNavigate } from "react-router-dom";
const BrandsList = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  console.log("brands: ", brands);

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

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {brands.map((item) => (
          <li
            key={item._id}
            className={css.listItem}
            onClick={() => {
              handleBrandClick(item.name);
            }}
          >
            <div className={css.cardContainer}>
              <BrandItem brandImg={item.image} brandTitle={item.name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandsList;
