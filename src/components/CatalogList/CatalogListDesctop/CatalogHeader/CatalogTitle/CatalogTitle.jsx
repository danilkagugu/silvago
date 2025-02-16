import { useParams } from "react-router-dom";
import css from "./CatalogTitle.module.css";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../../../../redux/inventoryStore/selectors";
const CatalogTitle = ({
  selectedBrand,
  selectedSection,
  selectedPriceRange,
  query,
}) => {
  const categories = useSelector(selectAllCategories);
  const { categorySlug } = useParams();
  const brandNames = selectedBrand.map((brand) => brand.name);
  const sectionNames = selectedSection.map(
    (section) => section.name || section
  );

  const findCategoryBySlug = (categories, slug) => {
    for (const category of categories) {
      if (category.slug === slug) {
        return category;
      }
      if (category.children && category.children.length > 0) {
        const found = findCategoryBySlug(category.children, slug);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const currentCategory = findCategoryBySlug(categories, categorySlug);
  const categoryName = currentCategory
    ? currentCategory.name
    : "Silvago Каталог";

  const titleName = () => {
    if (query) return `Результати пошуку «${query}»`;
    return currentCategory ? currentCategory.name : "Silvago Каталог";
  };

  return (
    <div className={css.catalogTopTitle}>
      <h1 className={css.titleText}>
        {titleName()}
        {!query && brandNames.length > 0 && ` Бренд: ${brandNames.join(", ")}`}
        {!query &&
          sectionNames.length > 0 &&
          `, Розділ: ${sectionNames.join(", ")}`}
        {!query &&
          selectedPriceRange?.minPrice !== undefined &&
          selectedPriceRange?.maxPrice !== undefined &&
          `, Ціна, грн: ${selectedPriceRange?.minPrice} – ${selectedPriceRange?.maxPrice}`}
      </h1>
    </div>
  );
};

export default CatalogTitle;
