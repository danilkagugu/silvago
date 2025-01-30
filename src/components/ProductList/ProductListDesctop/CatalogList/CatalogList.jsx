import CatalogListItem from "../../../CatalogListItem/CatalogListItem";
import css from "./CatalogList.module.css";
import ProductPagination from "./ProductPagination/ProductPagination";

const CatalogList = ({
  sortedFilteredProducts,
  defaultProductVariations,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className={css.catalogContent}>
      <ul className={css.list}>
        {sortedFilteredProducts.map((product) => {
          return (
            <li key={product._id} className={css.listItem} id={product._id}>
              <CatalogListItem
                product={product}
                defaultProductVariations={defaultProductVariations}
              />
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && (
        <ProductPagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default CatalogList;
