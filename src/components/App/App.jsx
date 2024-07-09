import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
// import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import { apiRefreshUser } from "../../redux/auth/operations";
const Home = lazy(() => import("../../pages/Home/Home"));
const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Brands = lazy(() => import("../../pages/Brands/Brands"));
const UserCabinet = lazy(() => import("../../pages/UserCabinet/UserCabinet"));
const DeliveryAndPayment = lazy(() =>
  import("../../pages/DeliveryAndPayment/DeliveryAndPayment")
);
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/delivery-and-payment" element={<DeliveryAndPayment />} />
        <Route path="/user-cabinet" element={<UserCabinet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
