import { useSearchParams } from "react-router-dom";
import css from "./SearchListResult.module.css";
import { useCallback, useEffect, useState } from "react";
import CatalogListItem from "../CatalogListItem/CatalogListItem";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchResults } from "../../redux/filterProduct/selectors";
import { searchProducts } from "../../redux/filterProduct/operations";

const SearchListResult = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [quantities, setQuantities] = useState({});

  const [selectedVolume, setSelectedVolume] = useState({});

  const filteredProducts = useSelector(selectSearchResults);

  const getDefaultVolume = (volumes) => {
    if (!volumes || volumes.length === 0) return 0;
    return volumes.reduce(
      (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
      0
    );
  };

  const initializeQuantitiesAndVolumes = useCallback((products) => {
    // console.log("products: ", products);
    const initialQuantities = {};
    const initialVolume = {};
    if (Array.isArray(products)) {
      products.forEach((product) => {
        if (Array.isArray(product.volumes)) {
          const defaultVolume = getDefaultVolume(product.volumes);
          initialQuantities[product._id] = 1;

          if (defaultVolume) {
            initialVolume[product._id] = defaultVolume;
          }
        }
      });
    }
    return { initialQuantities, initialVolume };
  }, []);

  useEffect(() => {
    dispatch(searchProducts(query || ""));
  }, [query, dispatch]);

  useEffect(() => {
    const { initialQuantities, initialVolume } =
      initializeQuantitiesAndVolumes(filteredProducts);
    setQuantities(initialQuantities);
    setSelectedVolume(initialVolume);
  }, [filteredProducts, initializeQuantitiesAndVolumes]);

  return (
    <ul className={css.list}>
      {filteredProducts.map((product) => (
        <li key={product._id} className={css.listItem} id={product._id}>
          <CatalogListItem
            product={product}
            quantities={quantities}
            selectedVolume={selectedVolume}
          />
        </li>
      ))}
    </ul>
  );
};

export default SearchListResult;
