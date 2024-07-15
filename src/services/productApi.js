import axios from "axios";
import { store } from "../redux/store";

export const BASE_URL = "http://localhost:3030/";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  },
});

export const getProducts = async () => {
  const { data } = await instance.get("/api/product");
  return data;
};
export const addProductToFavorite = async (productId) => {
  const data = await instance.patch(`/api/product/${productId}/favorite`);
  return data;
};

export const addProductToBasket = async (productId, quantity) => {
  const { data } = await instance.post(`/api/product/${productId}/basket`, {
    quantity,
  });
  return data;
};

export const getBasketProduct = async () => {
  const { data } = await instance.get("/api/product/basket");
  return data;
};

export const updateProductQuantity = async (productId, quantity) => {
  const { data } = await instance.patch(`/api/product/basket/${productId}`, {
    quantity,
  });
  return data;
};

export const productById = async (productId) => {
  const { data } = await instance.get(`/api/product/product/${productId}`);
  return data;
};
