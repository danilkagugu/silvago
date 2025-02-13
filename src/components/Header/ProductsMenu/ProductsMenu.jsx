import css from "./ProductsMenu.module.css";
import { useSelector } from "react-redux";
import { selectAllCategoriesTorgsoft } from "../../../redux/inventoryStore/selectors";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductsMenu = () => {
  const categoriesTorgsoft = useSelector(selectAllCategoriesTorgsoft);

  const [openCategory, setOpenCategory] = useState(null);

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
        {sortedCategories.map((category) => (
          <li
            className={css.productsMenuItem}
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
                <ul className={`${css.productsSubMenuList}`}>
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

/*

 _calculateWidth: function() {
                var e = this.options.parent ? this.options.parent.width() : this.menu.width()
                  , t = this.menu.offset().left - this.options.parent.offset().left
                  , i = e - t - this.menu.width()
                  , o = this;
                this.menuItem.each((function() {
                    var s, a = n(this), r = a.position().left + t, l = a.width(), c = o.options.submenuSelector ? a.find(o.options.submenuSelector) : a.find(".productsMenu-submenu"), u = a.find(".productsMenu-tabs"), d = a.find(".productsMenu-tabs-list"), h = o.options.submenuWrapSelector ? a.find(o.options.submenuWrapSelector) : a.find(".productsMenu-submenu-w"), f = c.width();
                    s = u.length ? r + l / 2 <= e / 2 ? e - r : r + l : e,
                    h.each((function(t) {
                        var i = n(this);
                        if (i.parents(".productsMenu-submenu").hasClass("__fluidGrid")) {
                            var a, r, h, p = o._getColumnWidth(i), m = parseFloat(i.css("padding-left")) + parseFloat(i.css("padding-right")), v = 0, g = 0;
                            if (i.show().find(".productsMenu-submenu-i").each((function() {
                                var e = n(this).outerHeight(!0);
                                e > g && (g = e),
                                v += e
                            }
                            )),
                            i.removeAttr("style"),
                            a = (r = g > 300 ? Math.ceil(v / g) : Math.ceil(v / 300)) * p + 20 * (r - 1),
                            (h = u.length > 0 ? a + d.width() + m : a + m) < s)
                                u.length > 0 ? (i.width(a),
                                f = l) : h < l ? (c.width(l),
                                i.width("auto"),
                                f = l) : (c.width("auto"),
                                i.width(a),
                                f = i.outerWidth());
                            else if (u.length > 0) {
                                var b = Math.floor((s - d.width() + 20) / (p + 20))
                                  , _ = b * p + 20 * (b - 1);
                                i.width(_)
                            } else
                                i.width("auto"),
                                f = e,
                                c.width(e)
                        }
                    }
                    )),
                    c.css("top", a.position().top + a.height()),
                    u.length ? (c.addClass("__hasTabs __pos_left"),
                    d.data("MenuAim").setOption("submenuDirection", "right"),
                    r + l / 2 <= e / 2 ? c.css("left", r - t) : (c.removeClass("__pos_left").addClass("__pos_right"),
                    d.data("MenuAim").setOption("submenuDirection", "left"),
                    c.css({
                        right: o.menu.width() - a.position().left - a.width(),
                        left: "auto"
                    }))) : f === e ? c.css({
                        left: -t,
                        right: -i
                    }) : r + l / 2 < f / 2 ? c.css({
                        left: -t,
                        right: "auto"
                    }) : s - (r + l / 2) < f / 2 ? c.css({
                        left: "auto",
                        right: -i
                    }) : c.css({
                        left: r - t + l / 2 - f / 2,
                        right: "auto"
                    })
                }
                ))
            }

*/
