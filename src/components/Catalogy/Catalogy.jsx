import css from "./Catalogy.module.css";
import { useNavigate } from "react-router-dom";
// import transliterate from "../../helpers/transliterate";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import SearchProduct from "../SearchProduct/SearchProduct";
import { LuHeart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserData } from "../../redux/auth/selectors";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { PiUserFill } from "react-icons/pi";
import { apiLogoutUser } from "../../redux/auth/operations";
import { selectFavoritesQuantity } from "../../redux/product/selectors";
import { store } from "../../redux/store";
import { fetchAllCategoriesTorgsoft } from "../../redux/inventoryStore/operations";
import { selectAllCategoriesTorgsoft } from "../../redux/inventoryStore/selectors";
import CategoryTree from "./CategoryTree";

const Catalogy = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [showOutOfStockMessage, setShowOutOfStockMessage] = useState(false);
  const login = useSelector(selectIsLoggedIn);
  // console.log("login: ", login);
  const user = useSelector(selectUserData);
  // console.log("user: ", user);
  const favoriteProductsLength = useSelector(selectFavoritesQuantity);

  const dispatch = useDispatch();
  const token = store.getState().auth.token;

  useEffect(() => {
    dispatch(fetchAllCategoriesTorgsoft());
  }, [dispatch]);

  const categoriesTorgsoft = useSelector(selectAllCategoriesTorgsoft);
  // console.log("categoriesTorgsoft: ", categoriesTorgsoft);

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
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      // e.preventDefault();
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Логіка виходу з профіля
  const onLogout = () => {
    dispatch(apiLogoutUser());
    navigate("/");
  };

  const clickHeart = () => {
    if (token) {
      console.log("token: ", token);
      navigate("/user-cabinet/favorite");
    } else {
      // Якщо кількість перевищує максимальну, показуємо повідомлення
      setShowOutOfStockMessage(true);
      // Приховуємо повідомлення через 2-3 секунди
      setTimeout(() => {
        setShowOutOfStockMessage(false);
      }, 2000); // 2000 мілісекунд = 2 секунди
    }
  };

  return (
    <div className={css.catalogyMenu}>
      <div className={css.headerColumn}>
        <div className={css.headerSection}>
          <div className={css.productsMenu}>
            <CategoryTree categoriesTorgsoft={categoriesTorgsoft} />
          </div>
        </div>
      </div>
      {/* <div className={css.resultbox}>
        <div className={css.searchBox}>
          <IoSearch className={`${css.iconSearch} ${css.icon}`} />
          <input
            className={css.inputSearch}
            type="text"
            placeholder="Пошук"
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
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
      </div> */}
      <div className={css.iconBox}>
        <div className={css.favoriteBox}>
          <LuHeart
            className={`${css.iconUser} ${css.favoriteIcon}`}
            onClick={clickHeart}
          />
          {token && (
            <span className={css.amountProductsFavorites}>
              {favoriteProductsLength}
            </span>
          )}

          <div className={css.notificationsContainer}>
            <div
              className={`${css.notificationInfo} ${css.notification} ${css.notificationExpends}`}
              style={{
                display: showOutOfStockMessage ? "block" : "none",
              }}
            >
              <div className={css.notificationText}>
                Спочатку увійдіть в профіль
              </div>
            </div>
          </div>
        </div>
        <div className={css.userCabinet}>
          <div className={css.userFIOWrapper}>
            {login ? (
              <>
                <PiUserFill className={css.iconUser} />
                <p className={css.userFIO}>
                  {user.firstName} {user.lastName}
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
