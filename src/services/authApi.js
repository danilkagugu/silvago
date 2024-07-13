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
  console.log("data: ", data.token);
  setToken(data.token);
  return data;
};

export const requestLogout = async () => {
  const { data } = await instance.post("/api/auth/logout");

  return data;
};

export const requestGetCurrentUser = async () => {
  const { data } = await instance.get("/api/auth/current");
  // console.log("data: ", data);

  return data;
};

export const requestUpdate = async (body) => {
  const data = await instance.patch("/api/auth/update", body);
  console.log("data: ", data);

  return data;
};
