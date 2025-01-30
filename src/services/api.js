// api.js
import axios from "axios";

export const BASE_URL = "http://localhost:3030/";

export const createPublicAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};

export const getSkins = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/admin/skin");
  return data;
};
export const getFilters = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/admin/filter");
  return data;
};

export const getCategories = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/category");
  return data;
};
export const getCategoriesTorgsoft = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/category-torgsoft");
  return data;
};

export const getBrands = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/admin/brands");
  return data;
};
export const getBrandsTorgsoft = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/get/brand");
  // console.log("data: ", data);
  return data;
};

export const searchProductApi = async (query) => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get(`/api/product/search`, {
    params: { query },
  });
  return data;
};

export const torgsoftApi = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get(`/api/product/sync`);
  return data;
};

export const getGoods = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/get/goods");
  return data;
};
