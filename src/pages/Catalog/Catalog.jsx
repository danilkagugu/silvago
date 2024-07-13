import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import CatalogList from "../../components/CatalogList/CatalogList";
// import Catalogy from "../../components/Catalogy/Catalogy";

const Catalog = () => {
  const { category, item } = useParams();
  return (
    <div>
      <Header />
      <div>
        <h2>Category: {category}</h2>
        <h3>Item: {item}</h3>
        <CatalogList />
      </div>
    </div>
  );
};

export default Catalog;
