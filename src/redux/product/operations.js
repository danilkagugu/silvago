import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addFavorite,
  changeVariation,
  clearFavoritesApi,
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
  toogleFavoriteApi,
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
      // console.log("data: ", data);
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
export const toogleFavorite = createAsyncThunk(
  "products/toogleFavorite",
  async ({ userId, productId, idTorgsoft }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await toogleFavoriteApi(
        userId,
        productId,
        idTorgsoft,
        token
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const clearFavorites = createAsyncThunk(
  "products/clearFavorites",
  async ({ userId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await clearFavoritesApi(userId, token);
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
    { category, brand, price, page = 1, limit = 20, categorySlug, query },
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
        query,
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
      console.log("location: ", location);
      const filters = parseFiltersFromUrl(location.pathname, location.search);
      console.log("filters: ", filters);

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

/*

export const getCountByFilter = async (req, res) => {
  try {
    const { brands, categories, price, categorySlug, query } = req.query;

    let categoryIds = [];
    let categoriesToDisplay = [];
    const allBrands = await BrandTorgsoft.find().lean();

    const brandMap = allBrands.reduce((acc, brand) => {
      acc[brand.numberId] = brand.name;
      return acc;
    }, {});

    let brandNames = [];
    if (brands) {
      brandNames = brands
        .split(",")
        .map((id) => brandMap[Number(id)])
        .filter(Boolean);
    }

    // Функція для рекурсивного збору всіх категорій
    const gatherAllCategories = (categories) => {
      let allCategories = [];
      categories.forEach((cat) => {
        allCategories.push(cat);
        allCategories = allCategories.concat(
          gatherAllCategories(cat.children || [])
        );
      });
      return allCategories;
    };

    // --- Логіка для визначення категорій ---
    if (categorySlug) {
      const category = await CategoryTorg.findOne({
        $or: [
          { slug: categorySlug },
          { "children.slug": categorySlug },
          { "children.children.slug": categorySlug },
        ],
      }).lean();

      if (category) {
        const findCategoryBySlug = (cat, slug) => {
          if (cat.slug === slug) return cat;
          for (const child of cat.children || []) {
            const result = findCategoryBySlug(child, slug);
            if (result) return result;
          }
          return null;
        };

        const exactCategory = findCategoryBySlug(category, categorySlug);

        if (exactCategory) {
          if (exactCategory === category) {
            categoriesToDisplay = gatherAllCategories([category]);
            categoriesToDisplay = categoriesToDisplay.filter(
              (cat) => cat.slug !== categorySlug
            );
          } else if (exactCategory.children.length > 0) {
            categoriesToDisplay = exactCategory.children;
          } else {
            categoriesToDisplay = [exactCategory];
          }

          categoryIds = categoriesToDisplay.map((cat) => cat.idTorgsoft);
        }
      }
    }

    if (categories) {
      const selectedCategoryIds = categories.split(",").map(Number);
      categoryIds = [...new Set([...categoryIds, ...selectedCategoryIds])];
    }

    const allCategories = await CategoryTorg.find().lean();
    if (!categorySlug) {
      categoriesToDisplay = gatherAllCategories(allCategories);
      categoryIds = categoriesToDisplay.map((cat) => cat.idTorgsoft);
    }

    // --- Логіка для ціни ---
    let minPrice = null;
    let maxPrice = null;
    if (price) {
      [minPrice, maxPrice] = price.split(",").map(Number);
    }

    const getPriceFilter = () => {
      if (minPrice !== null || maxPrice !== null) {
        const priceFilter = {};
        if (minPrice !== null) priceFilter.$gte = minPrice;
        if (maxPrice !== null) priceFilter.$lte = maxPrice;
        return { "variations.retailPrice": priceFilter };
      }
      return {};
    };

    const priceFilters = getPriceFilter();

    const categoryQuerys = { ...priceFilters };

    if (brandNames.length) {
      categoryQuerys.brand = { $in: brandNames };
    }

    if (categories) {
      categoryQuerys["categories.idTorgsoft"] = {
        $in: categories.split(",").map(Number),
      };
    }
    if (query) {
      categoryQuerys["$or"] = [
        { fullName: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { "categories.name": { $regex: query, $options: "i" } },
        { "variations.fullName": { $regex: query, $options: "i" } },
        { "variations.barcode": query.toString() },
      ];
    }
    const categoryCountss = await Goods.aggregate([
      { $match: categoryQuerys },
      { $unwind: "$categories" },
      {
        $group: {
          _id: "$categories.idTorgsoft",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log("categoryCountss", categoryCountss);
    let finalCategories;
    if (query) {
      finalCategories = categoryCountss
        .map((c) => {
          const cat = allCategories.find((cat) => cat.idTorgsoft === c._id);
          return cat
            ? { idTorgsoft: cat.idTorgsoft, name: cat.name, count: c.count }
            : null;
        })
        .filter(Boolean);
    } else {
      finalCategories = categoriesToDisplay.map((cat) => ({
        idTorgsoft: cat.idTorgsoft,
        name: cat.name,
        count:
          categoryCountss.find((c) => c._id === cat.idTorgsoft)?.count || 0,
      }));
    }

    console.log("finalCategories:", finalCategories);

    // --- Підрахунок товарів по брендах ---

    const brandQuerys = { ...priceFilters };

    if (categoryIds.length) {
      brandQuerys["categories.idTorgsoft"] = { $in: categoryIds };
    }
    if (categories) {
      brandQuerys["categories.idTorgsoft"] = {
        $in: categories.split(",").map(Number),
      };
    }
    if (query) {
      brandQuerys["$or"] = [
        { fullName: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { "categories.name": { $regex: query, $options: "i" } },
        { "variations.fullName": { $regex: query, $options: "i" } },
        { "variations.barcode": query.toString() },
      ];
    }
    const brandCounts = await Goods.aggregate([
      { $match: brandQuerys },
      {
        $lookup: {
          from: "brandtorgsofts",
          localField: "brand",
          foreignField: "name",
          as: "brandInfo",
        },
      },
      { $unwind: "$brandInfo" },
      {
        $group: {
          _id: "$brandInfo.numberId",
          name: { $first: "$brandInfo.name" },
          count: { $sum: 1 },
        },
      },
    ]);

    let finalBrands = allBrands.map((brand) => ({
      idTorgsoft: brand.numberId,
      name: brand.name,
      count: brandCounts.find((b) => b._id === brand.numberId)?.count || 0,
    }));

    if (categorySlug) {
      finalBrands = finalBrands.filter((brand) => brand.count > 0);
    }
    if (query) {
      finalBrands = finalBrands.filter((brand) => brand.count > 0);
    }

    finalBrands.sort((a, b) => {
      if (b.count === 0 && a.count > 0) return -1;
      if (a.count === 0 && b.count > 0) return 1;
      return a.name.localeCompare(b.name);
    });
    res.json({ brandsCount: finalBrands, categoriesCount: finalCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

*/
