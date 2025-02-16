import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import css from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <nav className={css.breadcrumbs}>
      {breadcrumbs.map((crumb, index) => (
        <div className={css.breadcrumbsItem} key={index}>
          {crumb.slug ? (
            <Link to={crumb.slug}>{crumb.name}</Link>
          ) : (
            <p>{crumb.name}</p>
          )}
          {index < breadcrumbs.length - 1 && (
            <IoChevronForward
              className={`${css.icon} ${css.breadcrumbsIconChevron}`}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
