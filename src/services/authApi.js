import axios from "axios";

export const BASE_URL = "http://localhost:3030/";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = ``;
};

export const requestSignUp = async (formData) => {
  const { data } = await instance.post("/api/auth/register", formData);

  return data;
};

export const requestSignIn = async (formData) => {
  const { data } = await instance.post("/api/auth/login", formData);
  setToken(data.token);
  return data;
};
