import { useEffect } from "react";
import BrandItem from "../BrandItem/BrandItem";
import css from "./BrandsList.module.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands } from "../../redux/inventoryStore/operations";
import { selectAllBrands } from "../../redux/inventoryStore/selectors";

const BrandsList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

  const brands = useSelector(selectAllBrands);

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
