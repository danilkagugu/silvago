import axios from "axios";

export const BASE_URL = "http://localhost:3030/";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const createWaterRecord = async (body) => {
  const data = await instance.post("/api/product", body);
  return data;
};

export const getProducts = async () => {
  const { data } = await instance.get("/api/product");
  return data;
};
