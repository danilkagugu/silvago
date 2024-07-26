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
    return data.data;
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
    return data.data;
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
    const cities = data.data.map((city) => city.Description);
    return cities;
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
    const offices = data.data.map((office) => office.Description);
    return offices;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
