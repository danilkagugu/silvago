import { useParams } from "react-router-dom";
import CatalogList from "../../components/CatalogList/CatalogList";
import Layout from "../../components/Layout/Layout";
// import Catalogy from "../../components/Catalogy/Catalogy";

const Catalog = () => {
  const { category, item } = useParams();
  return (
    <Layout>
      <div>
        <h2>Category: {category}</h2>
        <h3>Item: {item}</h3>
        <CatalogList />
      </div>
    </Layout>
  );
};

export default Catalog;
