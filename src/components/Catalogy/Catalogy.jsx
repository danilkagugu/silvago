import css from "./Catalogy.module.css";
// import catologyJson from "./NextCatalog.json";
import { Link, useNavigate } from "react-router-dom";
// import transliterate from "../../helpers/transliterate";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/productApi";
import { IoSearch } from "react-icons/io5";
import SearchProduct from "../SearchProduct/SearchProduct";
import { LuHeart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserData } from "../../redux/auth/selectors";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { PiUserFill } from "react-icons/pi";
import { apiLogoutUser } from "../../redux/auth/operations";
import {
  selectFavoritesProducts,
  selectFavoritesQuantity,
} from "../../redux/product/selectors";
// import { getFavoriteProducts } from "../../redux/product/operations";

const Catalogy = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const login = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUserData);
  const qwerty = useSelector(selectFavoritesQuantity);
  const qqww = useSelector(selectFavoritesProducts);
  // console.log("qqww: ", qqww);
  // console.log("qwerty: ", qwerty);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(selectFavoritesProducts());
  // }, [dispatch]);
  // const qqq = useSelector(selectFavoritesProducts);

  // useEffect(() => {
  //   dispatch(getFavoriteProducts());
  // }, [dispatch]);
  // console.log("user: ", user);?
  // const [favoriteProducts, setFavoriteProducts] = useState();
  // console.log("favoriteProducts: ", favoriteProducts);
  // console.log("favoriteProducts: ", favoriteProducts);
  // console.log("favoriteProducts: ", favoriteProducts);
  // useEffect(() => {
  //   dispatch(getFavoriteProducts());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (qqq) {
  //     const lengthFavoriteProducts = qqq.reduce(
  //       (total, item) => total + item.products.length,
  //       0
  //     );
  //     setFavoriteProducts(lengthFavoriteProducts);
  //   }
  // }, [qqq]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(data);
        // dispatch(getFavoriteProducts());
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryClick = (slug) => {
    navigate(`/catalog/${slug}`);
  };
  const regForm = () => {
    setOpenRegisterForm(true);
    setOpenLoginForm(false);
  };

  const loginForm = () => {
    setOpenRegisterForm(false);
    setOpenLoginForm(true);
  };
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Логіка виходу з профіля
  const onLogout = () => {
    dispatch(apiLogoutUser());
    navigate("/");
  };
  return (
    <div className={css.catalogyMenu}>
      <ul className={css.catalogyList}>
        {categories &&
          categories.map((category) => (
            <li className={css.catologyItem} key={category._id}>
              <div
                className={css.catologyBox}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <p className={css.itemText}>{category.name}</p>
              </div>
              {category.items.length > 0 && (
                <ul className={css.dropDownMenu}>
                  {category.items.map((item) => (
                    <li className={css.downMenuItem} key={item._id}>
                      <Link
                        to={`/catalog/${category.slug}/${item.slug}`}
                        className={css.downMenuLink}
                      >
                        <p className={css.downMenuText}>{item.name}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
      <div className={css.resultbox}>
        <div className={css.searchBox}>
          <IoSearch className={`${css.iconSearch} ${css.icon}`} />
          <input
            className={css.inputSearch}
            type="text"
            placeholder="Пошук"
            onChange={handleSearchChange}
          />
        </div>
        {searchQuery && (
          <div
            className={`${css.filteredProductsBox} ${
              searchQuery ? css.searchBoxBG : ""
            }`}
          >
            <SearchProduct searchQuery={searchQuery} />
          </div>
        )}
      </div>
      <div className={css.iconBox}>
        <div className={css.favoriteBox}>
          <LuHeart
            className={`${css.iconUser} ${css.favoriteIcon}`}
            onClick={() => {
              navigate("/user-cabinet/favorite");
            }}
          />
          <span className={css.amountProductsFavorites}>{qwerty}</span>
        </div>
        <div className={css.userCabinet}>
          <div className={css.userFIOWrapper}>
            {login ? (
              <>
                <PiUserFill className={css.iconUser} />
                <p className={css.userFIO}>
                  {user.name} {user.serName}
                </p>
              </>
            ) : (
              <div onClick={() => setOpenLoginForm(true)}>
                <PiUserFill className={css.iconUser} />
                <p className={css.enterText}>Вхід</p>
              </div>
            )}
            {login && (
              <div className={css.userSeetings}>
                <ul>
                  <li
                    className={css.userBarItem}
                    onClick={() => {
                      navigate("/user-cabinet/settings");
                    }}
                  >
                    <p className={css.userBarLink}>Особисті дані</p>
                  </li>
                  <li
                    className={css.userBarItem}
                    onClick={() => {
                      navigate("/user-cabinet/history");
                    }}
                  >
                    <p className={css.userBarLink}>Замовлення</p>
                  </li>
                  <li
                    className={css.userBarItem}
                    onClick={() => {
                      navigate("/user-cabinet/favorite");
                    }}
                  >
                    <p className={css.userBarLink}>Обране</p>
                  </li>
                  <li
                    className={`${css.userBarItem} ${css.userBarItemLogOut}`}
                    onClick={onLogout}
                  >
                    <p className={css.userBarLink}>Вийти</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {openLoginForm && (
        <LoginForm
          openLogin={openLoginForm}
          closeLogin={setOpenLoginForm}
          regFormOn={regForm}
        />
      )}
      {openRegisterForm && (
        <RegisterForm
          openLogin={openRegisterForm}
          closeLogin={setOpenRegisterForm}
          loginFormOn={loginForm}
        />
      )}
    </div>
  );
};

export default Catalogy;
