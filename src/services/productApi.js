import axios from "axios";
import { store } from "../redux/store";

export const BASE_URL = "http://localhost:3030/";
// export const BASE_URL = "https://silvago-backend.onrender.com/";

export const createPublicAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};

// Інстанс з токеном (для захищених запитів)
const createPrivateAxiosInstance = () => {
  const token = store.getState().auth.token; // Отримуємо токен з Redux або localStorage
  // console.log("token: ", token);

  if (!token) {
    // Якщо токен відсутній, можна або повернути null, або вивести помилку
    console.log("Користувач не авторизований");
    return null; // Не створювати інстанс, якщо токен відсутній
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      common: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const getProducts = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product");
  console.log("data: ", data);
  return data;
};
export const getDefaultVariations = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/get-default-variation");
  return data;
};

export const changeVariation = async (productId, volumeId, tone) => {
  // console.log("volumeId: ", volumeId);
  // console.log("productId: ", productId);
  // console.log("tone: ", tone);
  const instance = createPublicAxiosInstance();
  const { data } = await instance.post("/api/product/get-variation", {
    productId,
    volumeId,
    tone,
  });
  // console.log("data", data);
  return data;
};

export const productById = async (slug) => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get(`/api/product/product/${slug}`);
  return data;
};

export const getFavorite = async (userId) => {
  // console.log("userId: ", userId);
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.get(`/api/product/favorites/${userId}`);
  // console.log("data: ", data);

  return data;
};

export const addFavorite = async (userId, productId, idTorgsoft) => {
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.post(`/api/product/favorites`, {
    userId,
    productId,
    idTorgsoft,
  });
  return data;
};

export const removeFavorite = async (userId, productId, idTorgsoft) => {
  // console.log("idTorgsoft: ", idTorgsoft);
  // console.log("productId: ", productId);
  // console.log("userId: ", userId);
  const instance = createPrivateAxiosInstance();
  const { data } = await instance.delete(`/api/product/favorites`, {
    data: { userId, productId, idTorgsoft },
  });
  // console.log("data", data);
  return data;
};

export const addProductToBasket = async (slug, quantity, volume, tone) => {
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.post(`/api/product/${slug}/basket/`, {
    slug,
    quantity,
    volume,
    tone,
  });
  console.log("tone", tone);
  return data;
};

export const deleteProductFromBasket = async ({ productId, volume }) => {
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.delete(`/api/product/basket/delete`, {
    data: { productId: productId, volume: volume },
  });
  console.log("data", data);
  return data;
};

export const getBasketProduct = async () => {
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.get("/api/product/basket");
  return data;
};

export const updateProductQuantity = async ({
  productId,
  volume,
  quantity,
  tone,
}) => {
  const instance = createPrivateAxiosInstance();

  console.log("productId", productId);
  const { data } = await instance.patch(`/api/product/basket/${productId}`, {
    volume,
    quantity,
    tone,
  });
  console.log("data", data);
  return data;
};

export const sendOrder = async ({ user, basket }) => {
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.post("/api/product/basket/order", {
    user,
    basket,
  });
  console.log("data", data);
  return data;
};

export const getOrder = async () => {
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.get("/api/product/order");
  return data;
};

export const getOrderById = async (orderId) => {
  const instance = createPrivateAxiosInstance();

  const { data } = await instance.get(`/api/product/order/${orderId}`);
  return data;
};

export const getTopSellingProduct = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/top-selling-products");
  return data;
};

export const getDiscountProducts = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/discount-products");
  return data;
};

export const volumeChange = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product//product-by-volume-tone");
  return data;
};

export const fetchFilteredProductsApi = async ({
  category,
  brand,
  price,
  page = 1,
  limit = 20,
}) => {
  const instance = createPublicAxiosInstance();
  const query = new URLSearchParams();

  // Додаємо параметри тільки якщо вони існують
  if (Array.isArray(category) && category.length > 0) {
    query.append("category", category.join(","));
  }
  if (Array.isArray(brand) && brand.length > 0) {
    // Додаємо ідентифікатори брендів
    query.append("brand", brand.join(",")); // Передаємо numberId
  }
  if (price) {
    query.append("price", price);
  }

  query.append("page", page);
  query.append("limit", limit);

  // Формуємо URL
  const url = `/api/product/getcatalog?${query.toString()}`;

  try {
    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

export const getPriceRenge = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/price-range");
  return data;
};
