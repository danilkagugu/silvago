import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
// import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import { apiRefreshUser } from "../../redux/auth/operations";
import BrandProducts from "../../pages/BrandProducts/BrandProducts";
import LoaderSilvago from "../LoaderSilvago/LoaderSilvago";
// import OrderDetails from "../OrderDetails/OrderDetails";
const Home = lazy(() => import("../../pages/Home/Home"));
const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Basket = lazy(() => import("../../pages/Basket/Basket"));
const Brands = lazy(() => import("../../pages/Brands/Brands"));
const UserCabinet = lazy(() => import("../../pages/UserCabinet/UserCabinet"));
const DeliveryAndPayment = lazy(() =>
  import("../../pages/DeliveryAndPayment/DeliveryAndPayment")
);
const ProductListPage = lazy(() =>
  import("../../pages/ProductListPage/ProductListPage")
);
const Catalog = lazy(() => import("../../pages/Catalog/Catalog"));
const ProductDetail = lazy(() =>
  import("../../pages/ProductDetail/ProductDetail")
);
const Favorite = lazy(() => import("../../pages/Favorite/Favorite"));
const History = lazy(() => import("../../pages/History/History"));
const OrderDetails = lazy(() => import("../OrderDetails/OrderDetails"));
const Settings = lazy(() => import("../../pages/Settings/Settings"));
const SearchProducts = lazy(() =>
  import("../../pages/SearchProducts/SearchProducts")
);
const OrderSuccessPage = lazy(() =>
  import("../../pages/OrderSuccessPage/OrderSuccessPage")
);

const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));

const App = () => {
  const dispatch = useDispatch();

  // const location = useLocation();

  // useEffect(() => {
  //   const titles = {
  //     "/": "Головна - Silvago",
  //     "/about-us": "Про нас - Silvago",
  //     "/brands": "Бренди - Silvago",
  //   };
  //   document.title = titles[location.pathname] || "Silvago";
  // }, [location.pathname]);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);
  return (
    <Suspense fallback={<LoaderSilvago />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/delivery-and-payment" element={<DeliveryAndPayment />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/user-cabinet/*" element={<UserCabinet />}>
          <Route path="favorite" element={<Favorite />} />
          <Route path="settings" element={<Settings />} />
          <Route path="history" element={<History />} />
          <Route path="history/:orderId" element={<OrderDetails />} />
        </Route>
        {/* <Route
          path="/:categorySlug/:subCategorySlug?/:childCategorySlug?"
          element={<ProductListPage />}
        /> */}

        {/* <Route path="/catalog" element={<Catalog />} /> */}
        {/* <Route path="/catalog/filter?/:filterString?" element={<Catalog />} /> */}
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/filter/*" element={<Catalog />} />
        <Route path="/catalog/category/:categorySlug/*" element={<Catalog />} />

        {/* <Route path="/catalog/filter/*" element={<Catalog />} /> */}

        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/brand/:brandName" element={<BrandProducts />} />
        <Route path="/search/" element={<SearchProducts />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
