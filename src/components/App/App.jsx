import { lazy, Suspense } from "react";
// import Header from "../Header/Header";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../../pages/Home/Home"));
const AboutUs = lazy(() => import("../../pages/AboutUs/AboutUs"));
const Brands = lazy(() => import("../../pages/Brands/Brands"));
const DeliveryAndPayment = lazy(() =>
  import("../../pages/DeliveryAndPayment/DeliveryAndPayment")
);
const NotFound = lazy(() => import("../../pages/NotFound/NotFound"));
const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/delivery-and-payment" element={<DeliveryAndPayment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
