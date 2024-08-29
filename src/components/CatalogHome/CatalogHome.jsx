import { useState } from "react";
import DiscountProduct from "../DiscountProduct/DiscountProduct";
import NewProduct from "../NewProduct/NewProduct";
import TopSellingProduct from "../TopSellingProduct/TopSellingProduct";
import css from "./CatalogHome.module.css";

const CatalogHome = () => {
  const [activeTab, setActiveTab] = useState("topSelling");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className={css.qwert}>
      <div className={css.btnBox}>
        <button
          className={`${css.btnChoose} ${
            activeTab === "topSelling" ? css.active : ""
          }`}
          onClick={() => {
            handleTabChange("topSelling");
          }}
        >
          Хіти
        </button>
        <button
          className={`${css.btnChoose} ${
            activeTab === "discount" ? css.active : ""
          }`}
          onClick={() => {
            handleTabChange("discount");
          }}
        >
          Акція
        </button>
        <button
          className={`${css.btnChoose} ${
            activeTab === "newProduct" ? css.active : ""
          }`}
          onClick={() => {
            handleTabChange("newProduct");
          }}
        >
          Новинки
        </button>
      </div>
      <div className={css.content}>
        {activeTab === "topSelling" && <TopSellingProduct />}
        {activeTab === "discount" && <DiscountProduct />}
        {activeTab === "newProduct" && <NewProduct />}
      </div>
    </div>
  );
};

export default CatalogHome;
