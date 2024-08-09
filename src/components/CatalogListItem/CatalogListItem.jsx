// import { FaHeart } from "react-icons/fa";
// import css from "./CatalogListItem.module.css";
// import { CiHeart } from "react-icons/ci";
// import { useEffect, useState } from "react";
// import {
//   fetchFavoriteProducts,
//   handleToggleFavorite,
// } from "../../helpers/productActions";
// import { useNavigate } from "react-router-dom";
// import { addProductToBasket, getCategories } from "../../services/productApi";
// import { useDispatch, useSelector } from "react-redux";
// import { selectProducts } from "../../redux/product/selectors";
// import { getAllProduct } from "../../redux/product/operations";

// const CatalogListItem = ({ product }) => {
//   const [favoriteProducts, setFavoriteProducts] = useState(new Set());
//   const [selectedVolume, setSelectedVolume] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [categories, setCategories] = useState();
//   console.log("categories: ", categories);

//   const dataProducts = useSelector(selectProducts);

//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllProduct());
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data);
//         const initialQuantities = {};
//         const initialVolume = {};
//         dataProducts.forEach((p) => {
//           initialQuantities[p._id] = 1;
//           const defaultVolume = getDefaultVolume(p.volumes);
//           if (defaultVolume) {
//             initialVolume[p._id] = defaultVolume;
//           }
//         });
//         setQuantities(initialQuantities);
//         setSelectedVolume(initialVolume);
//       } catch (error) {
//         console.log("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//     fetchFavoriteProducts(setFavoriteProducts);
//   }, [dataProducts]);

//   const getDefaultVolume = (volumes) => {
//     if (!volumes || volumes.length === 0) return 0;
//     return volumes.reduce(
//       (maxVol, vol) => (vol.volume > maxVol ? vol.volume : maxVol),
//       0
//     );
//   };

//   const getDefaultPrice = (product) => {
//     const defaultVolume = getDefaultVolume(product.volumes);
//     const volumeObj = product.volumes.find(
//       (vol) => vol.volume === defaultVolume
//     );
//     return volumeObj ? volumeObj.price : product.price;
//   };

//   const handleQuantityChange = (productId, amount) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
//     }));
//   };

//   const handleAddToBasket = async (productId, quantity, volume) => {
//     try {
//       const data = await addProductToBasket(productId, quantity, volume);
//       console.log("Product added to basket:", data);
//     } catch (error) {
//       console.log("Error adding product to basket:", error);
//     }
//   };

//   const handleQuantityInputChange = (productId, value) => {
//     const newValue = Math.max(1, parseInt(value, 10) || 1);
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [productId]: newValue,
//     }));
//   };

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const handleVolumeSelect = (productId, volume) => {
//     setSelectedVolume((prev) => ({
//       ...prev,
//       [productId]: volume,
//     }));
//   };
//   return (
//     <div className={css.cardContainer}>
//       {favoriteProducts.has(product._id) ? (
//         <FaHeart
//           className={css.iconFavorite}
//           onClick={() =>
//             handleToggleFavorite(
//               product._id,
//               favoriteProducts,
//               setFavoriteProducts
//             )
//           }
//         />
//       ) : (
//         <CiHeart
//           className={css.iconFavorite}
//           onClick={() =>
//             handleToggleFavorite(
//               product._id,

//               favoriteProducts,
//               setFavoriteProducts
//             )
//           }
//         />
//       )}

//       <div
//         className={css.cardBox}
//         onClick={() => handleProductClick(product._id)}
//       >
//         <div className={css.imgBox}>
//           <img
//             className={css.imgBrand}
//             src={product.image}
//             alt={product.name}
//           />
//         </div>
//         <div className={css.boxInfo}>
//           <p className={css.brandTitle}>{product.name}</p>
//           <p className={css.brandPrice}>
//             {selectedVolume[product._id]
//               ? product.volumes.find(
//                   (vol) => vol.volume === selectedVolume[product._id]
//                 )?.price
//               : getDefaultPrice(product)}
//             грн
//           </p>
//         </div>
//       </div>
//       <div className={css.priceBox}>
//         <div className={css.quantityBox}>
//           <div className={css.quantityInputWrapper}>
//             <button
//               className={css.quantityButton}
//               onClick={() => handleQuantityChange(product._id, -1)}
//             >
//               -
//             </button>
//             <input
//               type="text"
//               className={css.quantityInput}
//               value={quantities[product._id] || 1}
//               onChange={(e) =>
//                 handleQuantityInputChange(product._id, e.target.value)
//               }
//               min="1"
//             />
//             <button
//               className={css.quantityButton}
//               onClick={() => handleQuantityChange(product._id, 1)}
//             >
//               +
//             </button>
//           </div>
//         </div>
//         <button
//           className={css.buyButton}
//           onClick={() =>
//             handleAddToBasket(
//               product._id,
//               quantities[product._id],
//               selectedVolume[product._id]
//             )
//           }
//         >
//           Купити
//         </button>
//       </div>
//       <div className={css.volumeOptions}>
//         {product.volumes.map((vol) => (
//           <button
//             key={vol._id}
//             className={`${css.volumeOption} ${
//               selectedVolume[product._id] === vol.volume ? css.selected : ""
//             }`}
//             onClick={() => handleVolumeSelect(product._id, vol.volume)}
//           >
//             {vol.volume} мл
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CatalogListItem;
