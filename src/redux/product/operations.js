import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavorite,
  changeVariation,
  fetchFilteredProductsApi,
  getCountProductByFiltersApi,
  getDefaultVariations,
  getDiscountProducts,
  getFavorite,
  getPriceRenge,
  getProducts,
  getTopSellingProduct,
  productById,
  removeFavorite,
} from "../../services/productApi";
import { getGoods } from "../../services/api";
import { parseFiltersFromUrl } from "../../hooks/useSelectedFilters";

export const getAllProduct = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      const data = await getProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllProductTorgsoft = createAsyncThunk(
  "products/getAllGoods",
  async (_, thunkAPI) => {
    try {
      const data = await getGoods();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTopProducts = createAsyncThunk(
  "products/getTopProducts",
  async (_, thunkAPI) => {
    try {
      const data = await getTopSellingProduct();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDiscountProducts = createAsyncThunk(
  "products/fetchDiscountProducts",
  async (_, thunkAPI) => {
    try {
      const data = await getDiscountProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getById",
  async (slug, thunkAPI) => {
    try {
      const data = await productById(slug);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductVariations = createAsyncThunk(
  "products/getDefaultVariation",
  async (_, thunkAPI) => {
    try {
      const data = await getDefaultVariations();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductVariation = createAsyncThunk(
  "products/getVariation",
  async ({ productId, volumeId, tone }, thunkAPI) => {
    try {
      const data = await changeVariation(productId, volumeId, tone);
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFavoriteProducts = createAsyncThunk(
  "products/getFavorites",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await getFavorite(userId, token);
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductFavorite = createAsyncThunk(
  "products/addFavorite",
  async ({ userId, productId, idTorgsoft }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await addFavorite(userId, productId, idTorgsoft, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProductFavorite = createAsyncThunk(
  "products/removeFavorite",
  async ({ userId, productId, idTorgsoft }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await removeFavorite(userId, productId, idTorgsoft, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (
    { category, brand, price, page = 1, limit = 20, categorySlug },
    thunkAPI
  ) => {
    // console.log("price: ", price);
    // console.log("category: ", category);
    try {
      const data = await fetchFilteredProductsApi({
        category,
        brand,
        price,
        page,
        limit,
        categorySlug,
      });
      // console.log("data", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPriceRenge = createAsyncThunk(
  "products/priceRenge",
  async (_, thunkAPI) => {
    try {
      const data = await getPriceRenge();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getCountProductByFilters = createAsyncThunk(
  "products/countByFilters",
  async (_, thunkAPI) => {
    try {
      // Отримуємо фільтри з URL
      const location = window.location;
      const filters = parseFiltersFromUrl(location.pathname, location.search);

      // Додаємо categorySlug до фільтрів, якщо він є
      const isCategoryPage = location.pathname.includes("/catalog/category/");
      if (isCategoryPage) {
        const categorySlug = location.pathname
          .split("/catalog/category/")[1]
          ?.split("/")[0];
        filters.categorySlug = categorySlug;
      }

      // Відправляємо запит на бекенд
      const data = await getCountProductByFiltersApi(filters);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
