import axios from "axios";

export const BASE_URL = "https://api.novaposhta.ua/v2.0/json/";
const API_KEY_NP = "c0c77fd4e35911237acd01d7278060a0";

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const getAllCities = async () => {
  try {
    const { data } = await instance.post("", {
      apiKey: "c0c77fd4e35911237acd01d7278060a0",
      modelName: "AddressGeneral",
      calledMethod: "getCities",
      methodProperties: {},
    });
    // console.log("data: ", data.data);
    // const cities = data.data.map((city) => city.Description);
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
export const getInfoCity = async (selectedCity) => {
  try {
    const { data } = await instance.post("", {
      apiKey: "c0c77fd4e35911237acd01d7278060a0",
      modelName: "AddressGeneral",
      calledMethod: "searchSettlements",
      methodProperties: { CityName: selectedCity },
    });
    // console.log("data: ", data);
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
export const getCurrentPostOffice = async (selectedCity, warehouseId) => {
  try {
    const { data } = await instance.post("", {
      apiKey: API_KEY_NP,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityName: selectedCity, // Тут має бути рядок з назвою міста (Коростишів)
        WarehouseId: warehouseId, // Тут має бути Number (наприклад, 2)
      },
    });

    return data.data;
  } catch (error) {
    console.error("Error fetching warehouse:", error);
    throw error;
  }
};
