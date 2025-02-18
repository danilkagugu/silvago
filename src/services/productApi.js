import axios from "axios";

export const BASE_URL = "http://localhost:3030/";
// export const BASE_URL = "https://silvago-backend.onrender.com/";

export const createPublicAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};

const createPrivateAxiosInstance = (token) => {
  if (!token) {
    return null;
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      common: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const getProducts = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product");
  return data;
};
export const getDefaultVariations = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/get-default-variation");
  return data;
};

export const changeVariation = async (productId, volumeId, tone) => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.post("/api/product/get-variation", {
    productId,
    volumeId,
    tone,
  });
  return data;
};

export const productById = async (slug) => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get(`/api/product/product/${slug}`);
  return data;
};

export const getFavorite = async (userId, token) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.get(`/api/product/favorites/${userId}`);

  return data;
};

export const addFavorite = async (userId, productId, idTorgsoft, token) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.post(`/api/product/favorites`, {
    userId,
    productId,
    idTorgsoft,
  });
  console.log("data", data);
  return data;
};

export const removeFavorite = async (userId, productId, idTorgsoft, token) => {
  const instance = createPrivateAxiosInstance(token);
  const { data } = await instance.delete(`/api/product/favorites`, {
    data: { userId, productId, idTorgsoft },
  });
  console.log("data", data);
  return data;
};

export const toogleFavoriteApi = async (
  userId,
  productId,
  idTorgsoft,
  token
) => {
  console.log("userId", userId);
  console.log("productId", productId);
  console.log("idTorgsoft", idTorgsoft);
  const instance = createPrivateAxiosInstance(token);
  const { data } = await instance.post(`/api/product/toggle-favorite`, {
    userId,
    productId,
    idTorgsoft,
  });
  console.log("data", data);
  return data;
};

export const addProductToBasket = async (
  slug,
  quantity,
  volume,
  tone,
  token
) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.post(`/api/product/${slug}/basket/`, {
    slug,
    quantity,
    volume,
    tone,
  });
  console.log("tone", tone);
  return data;
};

export const getCartApi = async (userId, token) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.get(`/api/product/cart/get/${userId}`);
  return data;
};

export const addToCartApi = async (
  userId,
  productId,
  idTorgsoft,
  quantity,
  token
) => {
  const instance = createPrivateAxiosInstance(token);
  const { data } = await instance.post(`/api/product/cart/add`, {
    userId,
    productId,
    idTorgsoft,
    quantity,
  });
  return data;
};

export const removeFromCartApi = async (
  userId,
  productId,
  idTorgsoft,
  token
) => {
  const instance = createPrivateAxiosInstance(token);
  console.log("userId", userId);
  const { data } = await instance.delete(`/api/product/cart/remove`, {
    data: { userId, productId, idTorgsoft }, // Передаємо дані в `data`
    headers: { Authorization: `Bearer ${token}` }, // Додаємо токен
  });
  return data;
};

export const deleteProductFromBasket = async ({ productId, volume, token }) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.delete(`/api/product/basket/delete`, {
    data: { productId: productId, volume: volume },
  });
  console.log("data", data);
  return data;
};

export const getBasketProduct = async ({ token }) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.get("/api/product/basket");
  return data;
};

export const updateProductQuantity = async ({
  productId,
  volume,
  quantity,
  tone,
  token,
}) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.patch(`/api/product/basket/${productId}`, {
    volume,
    quantity,
    tone,
  });
  console.log("data", data);
  return data;
};

export const sendOrder = async ({ user, basket, token }) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.post("/api/product/basket/order", {
    user,
    basket,
  });
  return data;
};

export const getOrder = async (token) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.get("/api/product/order");
  return data;
};

export const getOrderById = async (orderId, token) => {
  const instance = createPrivateAxiosInstance(token);

  const { data } = await instance.get(`/api/product/order/${orderId}`);
  return data;
};

export const getTopSellingProduct = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/top-selling-products");
  return data;
};

export const getDiscountProducts = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/discount-products");
  return data;
};

export const volumeChange = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product//product-by-volume-tone");
  return data;
};

export const getPriceRenge = async () => {
  const instance = createPublicAxiosInstance();
  const { data } = await instance.get("/api/product/price-range");
  return data;
};

export const getCountProductByFiltersApi = async (filters) => {
  console.log("filters: ", filters);
  const instance = createPublicAxiosInstance();

  // Формуємо параметри фільтрів для запиту
  const queryString = Object.entries(filters)
    .filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
    .map(([key, value]) => {
      if (Array.isArray(value)) return `${key}=${value.join(",")}`;
      return `${key}=${value}`;
    })
    .join("&");
  // console.log('queryString',queryString);
  const url = queryString
    ? `/api/product/filter?${queryString}`
    : `/api/product/filter`;

  // Надсилаємо запит
  const { data } = await instance.get(url);
  return data;
};

/**
 * Функція для отримання відфільтрованих товарів
 * @param {Object} params - Параметри фільтрації
 * @returns {Promise<Object>} - Відповідь з API
 */
export const fetchFilteredProductsApi = async ({
  category,
  brand,
  price,
  page = 1,
  limit = 20,
  categorySlug,
  query,
}) => {
  const instance = createPublicAxiosInstance();

  // Функція для формування URL у потрібному форматі
  const buildCustomUrl = (params) => {
    console.log("params: ", params);
    const hasFilters =
      (Array.isArray(params.brand) && params.brand.length > 0) ||
      (Array.isArray(params.category) && params.category.length > 0) ||
      (Array.isArray(params.price) && params.price.length === 2) ||
      (params.page && params.page > 1);
    // console.log("hasFilters", hasFilters);
    // Визначаємо базовий URL
    // const baseUrl = hasFilters
    //   ? "/api/product/catalog/filter"
    //   : "/api/product/catalog";

    let baseUrl;
    if (categorySlug) {
      // Якщо є categorySlug, вибираємо між базовим URL для категорії та фільтрами
      baseUrl = hasFilters
        ? `/api/product/catalog/category/${categorySlug}/filter`
        : `/api/product/catalog/category/${categorySlug}`;
    } else if (query) {
      console.log("нема фільтри");
      baseUrl = `/api/product/catalog/search`;
      if (hasFilters) {
        console.log("є фільтри");
        baseUrl = `/api/product/catalog/search/filter`;
      }
    } else {
      // Якщо немає categorySlug, вибираємо між загальним URL каталогу та фільтрами
      baseUrl = hasFilters
        ? "/api/product/catalog/filter"
        : "/api/product/catalog";
    }
    console.log("baseUrl", baseUrl);
    const validParams = Object.entries(params).filter(([key, value]) => {
      if (key === "page" && value === 1) return false; // Пропускаємо page=1
      if (key === "limit" && value === 20) return false; // Пропускаємо limit=20
      if (Array.isArray(value)) return value.length > 0; // Пропускаємо порожні масиви
      return value !== null && value !== undefined && value !== ""; // Пропускаємо пусті значення
    });

    const queryString = validParams
      .map(([key, value]) => {
        if (Array.isArray(value)) return `${key}=${value.join(",")}`;
        return `${key}=${value}`;
      })
      .join(";");

    // return `${baseUrl}/${queryString}`;
    return queryString
      ? `${baseUrl}/${queryString}?query=${encodeURIComponent(query)}`
      : `${baseUrl}?query=${encodeURIComponent(query)}`;
  };

  // Формуємо параметри запиту
  const url = buildCustomUrl({
    brand,
    category,
    price,
    // price: Array.isArray(price) ? price : price.split(",").map(Number) || null,
    page,
    limit,
  });
  console.log("URL запиту на бекенд:", url);

  try {
    // Надсилаємо GET-запит
    // console.log("URL:", url);

    const { data } = await instance.get(url);
    // console.log('data: ', data);
    return data;
  } catch (error) {
    console.error("Помилка отримання товарів:", error);
    throw error;
  }
};
