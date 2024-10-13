import axios from "axios";
import { store } from "../redux/store";

export const BASE_URL = "http://localhost:3030/";
// export const BASE_URL = "https://silvago-backend.onrender.com/";

const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      common: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    },
  });
};

export const getProducts = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/product");
  return data;
};

export const productById = async (slug) => {
  const instance = createAxiosInstance();
  const { data } = await instance.get(`/api/product/product/${slug}`);
  return data;
};

export const addProductToFavorite = async (productId) => {
  const instance = createAxiosInstance();
  const { data } = await instance.post(`/api/product/favorite/${productId}`);
  return data;
};

export const deleteProductFromFavorite = async (productId) => {
  const instance = createAxiosInstance();
  const { data } = await instance.delete(`/api/product/favorite/${productId}`);

  return data;
};

export const getFavoriteProduct = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get(`/api/product/favorite`);

  return data;
};

export const addProductToBasket = async (slug, quantity, volume, price) => {
  console.log("slug: ", slug);
  const instance = createAxiosInstance();
  const { data } = await instance.post(`/api/product/${slug}/basket/`, {
    slug,
    quantity,
    volume,
    price,
  });
  return data;
};

export const deleteProductFromBasket = async ({ productId, volume }) => {
  const instance = createAxiosInstance();
  const { data } = await instance.delete(`/api/product/basket/delete`, {
    data: { productId: productId, volume: volume },
  });
  return data;
};

export const getBasketProduct = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/product/basket");
  return data;
};

// export const getBasketProduct = async () => {
//   const instance = createAxiosInstance();
//   const { data } = await instance.get("/api/product/basket");
//   return data;
// };

export const updateProductQuantity = async ({
  productId,
  volume,
  quantity,
}) => {
  const instance = createAxiosInstance();
  console.log("productId", productId);
  const { data } = await instance.patch(`/api/product/basket/${productId}`, {
    volume,
    quantity,
  });
  return data;
};

export const sendOrder = async ({ user, basket }) => {
  const instance = createAxiosInstance();

  const { data } = await instance.post("/api/product/basket/order", {
    user,
    basket,
  });
  console.log("data", data);
  return data;
};

export const getOrder = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/product/order");
  return data;
};
export const getOrderById = async (orderId) => {
  const instance = createAxiosInstance();
  const { data } = await instance.get(`/api/product/order/${orderId}`);
  return data;
};

export const getCategories = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/product/category");
  return data;
};

export const getBrands = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/admin/brands");
  return data;
};

export const searchProducts = async (query) => {
  const instance = createAxiosInstance();
  const { data } = await instance.get(`/api/product/search`, {
    params: { query },
  });
  return data;
};

export const getTopSellingProduct = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/product/top-selling-products");
  return data;
};

export const getDiscountProducts = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/product/discount-products");
  return data;
};

export const getSkins = async () => {
  const instance = createAxiosInstance();
  const { data } = await instance.get("/api/admin/skin");
  return data;
};
