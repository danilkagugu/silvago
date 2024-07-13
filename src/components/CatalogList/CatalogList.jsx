import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../services/productApi";
import { CiHeart } from "react-icons/ci";
import CatalogItem from "../CatalogItem/CatalogItem";
import css from "./CatalogList.module.css";

const CatalogList = () => {
  const { item } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProducts();
      setProducts(product);
    };
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <div>
      <ul className={css.list}>
        {products.map((product, index) =>
          item === product.subcategory ? (
            <li key={index} className={css.listItem}>
              <div className={css.cardContainer}>
                <CiHeart
                  className={css.iconFavorite}
                  onClick={() => {
                    navigate("/user-cabinet/favorite");
                  }}
                />
                <CatalogItem
                  productImg={product.image}
                  productName={product.name}
                  productPrice={product.price}
                />
              </div>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default CatalogList;
