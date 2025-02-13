import css from "./ProductsMenu.module.css";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const ProductsMenu = ({ categoriesTorgsoft }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const subMenuRefs = useRef([]);

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

  const sortCategories = (categories) => {
    return categories
      .map((category) => ({
        ...category,
        children: sortCategories(category.children),
      }))
      .sort((a, b) => a.idTorgsoft - b.idTorgsoft);
  };

  const sortedCategories = sortCategories(categoriesTorgsoft);

  return (
    <div className={css.productsMenu}>
      <ul className={css.productsMenuContainer}>
        {sortedCategories.map((category, index) => (
          <li
            className={`${css.productsMenuItem} ${
              openCategory === category.idTorgsoft ? css.hover : ""
            }`}
            key={category.idTorgsoft}
            onMouseEnter={() => setOpenCategory(category.idTorgsoft)}
            onMouseLeave={() => setOpenCategory(null)}
          >
            <div className={css.productMenuTitle}>
              <Link
                className={css.productsMenuTitleLink}
                to={`/catalog/category/${category.slug}`}
              >
                {category.name}
              </Link>
            </div>
            {category.children.length > 0 && (
              <div
                className={`${css.productsSubMenu} ${css.subMenuGrid} ${
                  openCategory === category.idTorgsoft ? css.open : ""
                }`}
              >
                <ul
                  className={`${css.productsSubMenuList}`}
                  ref={(el) => (subMenuRefs.current[index] = el)}
                >
                  {category.children.map((sub) => (
                    <li
                      className={css.productsSubMenuItem}
                      key={sub.idTorgsoft}
                    >
                      <Link
                        className={css.productsSubMenuItemLink}
                        to={`/catalog/category/${sub.slug}`}
                      >
                        <span className={css.productsSubMenuItemTitle}>
                          {sub.name}
                        </span>
                      </Link>
                      {sub.children.length > 0 && (
                        <ul className={css.subChildList}>
                          {sub.children.map((child) => (
                            <li
                              className={css.subChildItem}
                              key={child.idTorgsoft}
                            >
                              <Link to={`/catalog/category/${child.slug}`}>
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
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
