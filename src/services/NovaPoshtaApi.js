import axios from "axios";

export const BASE_URL = "https://api.novaposhta.ua/v2.0/json/";
const API_KEY_NP = "c0c77fd4e35911237acd01d7278060a0";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const getArea = async () => {
  try {
    const { data } = await instance.post("", {
      apiKey: "c0c77fd4e35911237acd01d7278060a0",
      modelName: "AddressGeneral",
      calledMethod: "getAreas",
      methodProperties: {},
    });
    return data;
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};
export const getAreaByRef = async (ref) => {
  try {
    const { data } = await instance.post("", {
      apiKey: "c0c77fd4e35911237acd01d7278060a0",
      modelName: "AddressGeneral",
      calledMethod: "getAreas",
      methodProperties: { Ref: ref },
    });
    // console.log("data!!!: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};

export const getCities = async (selectedArea) => {
  try {
    const { data } = await instance.post("", {
      apiKey: API_KEY_NP,
      modelName: "AddressGeneral",
      calledMethod: "getCities",
      methodProperties: { AreaRef: selectedArea.Ref },
    });
    // const cities = data.data.map((city) => city.Description);
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
export const getAllCities = async () => {
  try {
    const { data } = await instance.post("", {
      apiKey: "c0c77fd4e35911237acd01d7278060a0",
      modelName: "AddressGeneral",
      calledMethod: "getCities",
      methodProperties: {},
    });
    // console.log("data: ", typeof data.data);
    // const cities = data.data.map((city) => city.Description);
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
export const getPostOffice = async (selectedCity) => {
  try {
    const { data } = await instance.post("", {
      apiKey: API_KEY_NP,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: selectedCity,
      },
    });
    // console.log("data: ", data);
    // const offices = data.data.map((office) => office.Description);
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
