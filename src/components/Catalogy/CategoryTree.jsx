import { Link } from "react-router-dom";
import css from "./Catalogy.module.css";

const CategoryTree = ({ categoriesTorgsoft }) => {
  return (
    <nav className={css.catalogyMenu}>
      <ul className={css.mainCategories}>
        {categoriesTorgsoft &&
          categoriesTorgsoft.map((category) => (
            <li
              className={css.mainCategory}
              key={`mainCategory-${category._id}`}
              id={`mainCategory-${category._id}`}
            >
              <Link to={`/${category.slug}`} className={css.mainLink}>
                {category.name}
              </Link>
              {category.children.length > 0 && (
                <div className={css.subMenu}>
                  <ul className={css.subMenuList}>
                    {category.children.map((child) => (
                      <li
                        key={`subMenuItem-${child._id}`}
                        id={`subMenuItem-${child._id}`}
                        className={css.subMenuItem}
                      >
                        {/* <h4 className={css.subMenuTitle}>{child.name}</h4> */}
                        <Link
                          to={`/${category.slug}/${child.slug}`}
                          className={css.subMenuTitle}
                        >
                          {child.name}
                        </Link>
                        {child.children.length > 0 && (
                          <ul
                            className={css.innerList}
                            key={`innerList-${child._id}`}
                            id={`innerList-${child._id}`}
                          >
                            {child.children.map((grandChild) => (
                              <li
                                key={`grandChild-${grandChild._id}`}
                                id={`grandChild-${grandChild._id}`}
                              >
                                <Link
                                  to={`/${category.slug}/${child.slug}/${grandChild.slug}`}
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
    </nav>
  );
};

export default CategoryTree;
