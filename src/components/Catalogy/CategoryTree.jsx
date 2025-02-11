import { Link } from "react-router-dom";
import css from "./Catalogy.module.css";
import { useEffect, useRef } from "react";

const CategoryTree = ({ categoriesTorgsoft }) => {
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

  // Функція для сортування категорій і підкатегорій за `idTorgsoft`
  const sortCategories = (categories) => {
    return [...categories].sort((a, b) => a.idTorgsoft - b.idTorgsoft);
  };

  return (
    <ul className={css.mainCategories}>
      {categoriesTorgsoft &&
        sortCategories(categoriesTorgsoft).map((category, index) => (
          <li
            className={css.mainCategory}
            key={`mainCategory-${category._id}`}
            id={`mainCategory-${category._id}`}
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
              <div className={`${css.subMenu}`}>
                <ul
                  className={css.subMenuList}
                  ref={(el) => (subMenuRefs.current[index] = el)}
                >
                  {sortCategories(category.children).map((child) => (
                    <li
                      key={`subMenuItem-${child._id}`}
                      id={`subMenuItem-${child._id}`}
                      className={css.subMenuItem}
                    >
                      <Link
                        to={`/catalog/category/${child.slug}`}
                        className={css.subMenuTitleLink}
                      >
                        <span className={css.subMenuTitleSpan}>
                          {child.name}
                        </span>
                      </Link>
                      {child.children.length > 0 && (
                        <ul
                          className={css.innerList}
                          key={`innerList-${child._id}`}
                          id={`innerList-${child._id}`}
                        >
                          {sortCategories(child.children).map((grandChild) => (
                            <li
                              className={css.innerListItem}
                              key={`grandChild-${grandChild._id}`}
                              id={`grandChild-${grandChild._id}`}
                            >
                              <Link
                                to={`/catalog/category/${grandChild.slug}`}
                                className={css.innerLink}
                              >
                                {grandChild.name}
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
  );
};

export default CategoryTree;
//               <ul className={css.subMenuList}  style={{ width: `${category.children.length * 200}px` }}>
