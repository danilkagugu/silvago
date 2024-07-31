import {
  addProductToBasket,
  addProductToFavorite,
  deleteProductFromFavorite,
  getFavoriteProduct,
} from "../services/productApi";

export const handleQuantityInputChange = (productId, value, setQuantities) => {
  const newValue = Math.max(1, parseInt(value, 10) || 1);
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [productId]: newValue,
  }));
};

export const handleQuantityChange = (productId, amount, setQuantities) => {
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
  }));
};

export const handleAddToBasket = async (productId, quantity) => {
  try {
    const data = await addProductToBasket(productId, quantity);
    console.log("Product added to basket:", data);
  } catch (error) {
    console.log("Error adding product to basket:", error);
  }
};

export const handleToggleFavorite = async (
  productId,
  favoriteProducts,
  setFavoriteProducts
) => {
  try {
    if (favoriteProducts.has(productId)) {
      // Видалення з улюблених
      await deleteProductFromFavorite(productId);
      setFavoriteProducts((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        updatedFavorites.delete(productId);
        return updatedFavorites;
      });
    } else {
      // Додавання до улюблених
      await addProductToFavorite(productId);
      setFavoriteProducts((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        updatedFavorites.add(productId);
        return updatedFavorites;
      });
    }
  } catch (error) {
    console.log("Error toggling favorite product:", error);
  }
};

export const fetchFavoriteProducts = async (setFavoriteProducts) => {
  try {
    const favoriteData = await getFavoriteProduct();
    const favoriteSet = new Set();

    favoriteData.forEach((fav) =>
      fav.products.forEach((item) => favoriteSet.add(item.product))
    );

    setFavoriteProducts(favoriteSet);
  } catch (error) {
    console.log("Error fetching favorite products:", error);
  }
};
