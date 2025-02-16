import { Link } from "react-router-dom";
import css from "./BreadcrumbsCatalog.module.css";
import { IoChevronForward } from "react-icons/io5";
const BreadcrumbsCatalog = ({ categorySlug, categories, query }) => {
  const findCategoryPath = (categories, slug, path = []) => {
    for (const category of categories) {
      const newPath = [...path, category]; // Додаємо поточну категорію в шлях
      if (category.slug === slug) {
        return newPath;
      }
      if (category.children?.length) {
        const foundPath = findCategoryPath(category.children, slug, newPath);
        if (foundPath) {
          return foundPath;
        }
      }
    }
    return null;
  };
  const categoryPath = categorySlug
    ? findCategoryPath(categories, categorySlug)
    : [];
  return (
    <nav className={css.productGroupMenu}>
      {/* Головна */}
      <div className={css.productGroupMenuItem}>
        <Link className={css.productGroupMenuItemLink} to="/">
          Головна
        </Link>
        <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
      </div>

      {/* Каталог */}
      <div className={css.productGroupMenuItem}>
        {!categorySlug && !query ? (
          <p className={css.productGroupMenuItemText}>Каталог</p>
        ) : (
          <Link className={css.productGroupMenuItemLink} to="/catalog">
            Каталог
          </Link>
        )}
        {!query && categoryPath.length > 0 && (
          <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
        )}
      </div>
      {/* Якщо є query → додаємо "Результати пошуку" */}
      {query && (
        <>
          <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
          <div className={css.productGroupMenuItem}>
            <p className={css.productGroupMenuItemText}>
              Результати пошуку «{query}»
            </p>
          </div>
        </>
      )}

      {/* Динамічні категорії */}
      {!query &&
        categoryPath.map((category, index) => (
          <div className={css.productGroupMenuItem} key={category.slug}>
            {index === categoryPath.length - 1 ? (
              <p className={css.productGroupMenuItemText}>{category.name}</p> // Останній елемент без посилання
            ) : (
              <Link
                className={css.productGroupMenuItemLink}
                to={`/catalog/category/${category.slug}`}
              >
                {category.name}
              </Link>
            )}
            {index < categoryPath.length - 1 && (
              <IoChevronForward className={`${css.icon} ${css.iconChevron}`} />
            )}
          </div>
        ))}
    </nav>
  );
};

export default BreadcrumbsCatalog;
