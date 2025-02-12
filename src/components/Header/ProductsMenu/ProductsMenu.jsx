import { useEffect, useRef } from "react";
import css from "./ProductsMenu.module.css";
import { useSelector } from "react-redux";
import { selectAllCategoriesTorgsoft } from "../../../redux/inventoryStore/selectors";
import { Link } from "react-router-dom";

const ProductsMenu = () => {
  const subMenuRefs = useRef([]);
  const categoriesTorgsoft = useSelector(selectAllCategoriesTorgsoft);
  //   console.log("categoriesTorgsoft: ", categoriesTorgsoft);
  useEffect(() => {
    subMenuRefs.current.forEach((subMenu) => {
      if (subMenu) {
        const itemsCount = subMenu.querySelectorAll("li").length;
        const columns = Math.ceil(itemsCount / 5); // Наприклад, 5 пунктів на колонку
        const columnWidth = 220; // Ширина однієї колонки

        // Встановлюємо ширину на основі кількості колонок
        subMenu.style.width = `${columns * columnWidth}px`;
      }
    });
  }, [categoriesTorgsoft]);

  // Функція для сортування категорій і підкатегорій за `idTorgsoft`
  //

  const sortCategories = (categories) => {
    return categories
      .map((category) => ({
        ...category,
        children: sortCategories(category.children), // рекурсивно сортуємо вкладені категорії
      }))
      .sort((a, b) => a.idTorgsoft - b.idTorgsoft);
  };

  // Використовуємо:
  const sortedCategories = sortCategories(categoriesTorgsoft);
  return (
    <div className={css.productsMenu}>
      <ul className={css.productsMenuContainer}>
        {sortedCategories.map((category) => (
          <li className={css.productsMenuItem} key={category.idTorgsoft}>
            <div className={css.productMenuTitle}>
              <Link
                className={css.productsMenuTitleLink}
                to={`/catalog/category/${category.slug}`}
              >
                {category.name}
              </Link>
            </div>
            {category.children > 0 && (
              <div className={css.productsSubMenu}>
                <ul className={css.productsSubMenuList}>
                  {category.children.map((sub) => (
                    <li></li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsMenu;
