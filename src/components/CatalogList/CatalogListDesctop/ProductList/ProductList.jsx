import CatalogListItem from "../../../CatalogListItem/CatalogListItem";
import css from "./ProductList.module.css";
import ProductPagination from "./ProductPagination/ProductPagination";

const ProductList = ({
  filterProduct,
  defaultProductVariations,
  handlePageChange,
}) => {
  return (
    <div className={css.catalogContent}>
      <ul className={css.list}>
        {filterProduct?.products?.map((product) => (
          <li
            key={product._id}
            className={css.listItem}
            id={product.idTorgsoft}
          >
            <CatalogListItem
              product={product}
              defaultProductVariations={defaultProductVariations}
            />
          </li>
        ))}
      </ul>
      <ProductPagination
        currentPage={filterProduct.currentPage}
        totalPages={filterProduct.totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
// sort((a, b) => a.modelName.localeCompare(b.modelName, 'uk'))