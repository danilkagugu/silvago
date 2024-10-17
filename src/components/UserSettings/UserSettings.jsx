import css from "./UserSettings.module.css";
import CustomMaskedInput from "../RegisterForm/CustomMaskedInput";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";
import { useEffect, useMemo, useState } from "react";
import { getAllCities } from "../../services/NovaPoshtaApi";
// import { useNavigate } from "react-router-dom";
import { apiUpdateUser } from "../../redux/auth/operations";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const UserSettings = () => {
  const isMobile = window.innerWidth <= 1440;
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const userData = useSelector(selectUserData);
  // console.log("userData: ", userData);

  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    serName: "",
    phone: "",
    email: "",
    city: "",
  });
  const [open, setOpen] = useState(false);
  const [cit, setCit] = useState();
  const [selectedCityq, setSelectedCityq] = useState("");
  // console.log("selectedCityq: ", selectedCityq);
  const popularCities = ["Київ", "Харків", "Одеса", "Дніпро", "Львів"];
  // console.log("formData", formData);

  useEffect(() => {
    if (userData) {
      const fetchArea = async () => {
        setFormData((prevData) => ({
          ...prevData,
          name: userData?.name || "",
          serName: userData?.serName || "",
          phone: userData?.phone || "",
          email: userData?.email || "",
          city: userData?.city || "",
        }));
        setSelectedCityq(userData?.city);
      };

      fetchArea();
    }
  }, [userData]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const qwerty = await getAllCities();
        // console.log("qwerty: ", qwerty);
        setCit(qwerty);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const filteredCities = useMemo(() => {
    if (!cit) return;
    if (!cit || !Array.isArray(cit.data)) {
      console.error(
        "Cit.data is not an array or contains undefined values:",
        cit?.data
      );
      return [];
    }
    if (!searchValue || searchValue.length < 3) {
      // Якщо searchValue порожній або містить менше ніж 3 букви
      return popularCities
        .map(
          (cityName) =>
            cit &&
            cit.data &&
            cit.data.find((item) => item.Description === cityName)
        )
        .filter(Boolean); // Фільтруємо null значення
    }

    const lowerCaseSearch = searchValue.toLowerCase();

    // Фільтруємо популярні міста, якщо немає пошукового запиту
    if (!searchValue) {
      return popularCities
        .map((cityName) =>
          cit.data.find((item) => item.Description === cityName)
        )
        .filter(Boolean); // Фільтруємо undefined
    }

    // Точні збіги (міста, що починаються з пошукового запиту)
    const exactMatches = cit.data.filter(
      (option) =>
        option.Description &&
        option.Description.toLowerCase().startsWith(lowerCaseSearch)
    );

    // Часткові збіги (міста, що містять пошуковий запит, але не починаються з нього)
    const partialMatches = cit.data.filter(
      (option) =>
        option.Description &&
        !option.Description.toLowerCase().startsWith(lowerCaseSearch) &&
        option.Description.toLowerCase().includes(lowerCaseSearch)
    );

    // Об'єднуємо результати: точні збіги зверху, часткові після них
    return [...exactMatches, ...partialMatches];
  }, [cit?.data, searchValue]);

  const selectCityDesc = (city) => {
    setSelectedCityq(city.Description);
    setSearchValue(city.Description);
    setOpen(false);
    setFormData({
      ...formData,
      city: city.Description,
    });
  };

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await dispatch(apiUpdateUser(formData));
  //     console.log("response: ", response);
  //     // if (response) {
  //     //   navigate("/user-cabinet/settings");
  //     // }
  //   } catch (error) {
  //     console.error("Error updating user: ", error);
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(apiUpdateUser(formData));
      toast.success("Ваші дані успішно оновленні");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const highlightText = (text, search) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ background: "#fde49f" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const selectCity = (city) => {
    setSelectedCityq(city.Description);
    setFormData({ ...formData, city: city.Description });
    setOpen(false);
    setSearchValue("");
  };

  return (
    <div>
      <div className={css.profileContent}>
        <h1 className={css.titleProfile}>Особисті Дані</h1>
        <div>
          {!isMobile ? (
            <form className={css.formDesctop} onSubmit={onSubmit}>
              <dl className={css.form}>
                <dt className={css.formHead}>Ім&apos;я</dt>
                <dd className={css.formItem}>
                  <input
                    className={css.field}
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ім'я"
                  />
                </dd>
                <dt className={css.formHead}>Прізвище</dt>
                <dd className={css.formItem}>
                  <input
                    className={css.field}
                    id="surname"
                    type="text"
                    value={formData.serName}
                    onChange={(e) =>
                      setFormData({ ...formData, serName: e.target.value })
                    }
                    placeholder="Прізвище"
                  />
                </dd>
                <dt className={css.formHead}>Е-пошта</dt>
                <dd className={css.formItem}>
                  <input
                    className={css.field}
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </dd>
                <dt className={css.formHead}>Телефон</dt>
                <dd className={css.formItem}>
                  {/* <input className={css.field} type="text" /> */}

                  <CustomMaskedInput
                    className={css.field}
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Мобільний телефон"
                  />
                </dd>

                <dt className={css.formHead}>Місто</dt>

                <dd className={css.formItem}>
                  <input
                    className={css.fieldDesc}
                    type="text"
                    placeholder="назва міста"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      // Оновлюємо formData тільки якщо вище не було налаштовано значення
                      setFormData((prevData) => ({
                        ...prevData,
                        city: e.target.value,
                      }));
                    }}
                    onClick={() => setOpen(true)}
                    value={searchValue || formData.city || ""}
                  />
                  <ul
                    className={css.cityList}
                    style={{ display: open ? "block" : "none" }}
                  >
                    {cit && cit.data && filteredCities.length > 0 ? (
                      filteredCities.map((item) => (
                        <li
                          className={css.optionsListItem}
                          key={item.Ref}
                          id={item.Ref}
                          onClick={() => selectCityDesc(item)}
                        >
                          <div className={css.optionItem}>
                            <div className={css.optionItemTitle}>
                              {/* {highlightText(item.Description, searchValue)} */}
                              {item.Description}
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className={css.optionsListItem}>Місто не знайдене</li>
                    )}
                  </ul>
                </dd>

                <dt className={css.formHead}>Поточний пароль</dt>
                <dd className={css.formItem}>
                  <input className={css.field} type="password" />
                </dd>
                <dt className={css.formHead}>Новий пароль</dt>
                <dd className={css.formItem}>
                  <input className={css.field} type="password" />
                </dd>
                <dt className={css.formHead}>Пароль ще раз</dt>
                <dd className={css.formItem}>
                  <input className={css.field} type="password" />
                </dd>
              </dl>
              <button className={css.btnSave} type="submit">
                Зберегти зміни
              </button>
              <ToastContainer />
            </form>
          ) : (
            <>
              <form className={css.formMobile} onSubmit={onSubmit}>
                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Ім&apos;я</div>
                  <div className={css.formItemContent}>
                    <input
                      className={css.input}
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ім'я"
                    />
                  </div>
                </div>
                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Прізвище</div>
                  <div className={css.formItemContent}>
                    <input
                      className={css.input}
                      type="text"
                      value={formData.serName}
                      onChange={(e) =>
                        setFormData({ ...formData, serName: e.target.value })
                      }
                      placeholder="Прізвище"
                    />
                  </div>
                </div>
                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Е-пошта</div>
                  <div className={css.formItemContent}>
                    <input
                      className={css.input}
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Телефон</div>
                  <div className={css.formItemContent}>
                    <CustomMaskedInput
                      className={css.input}
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Мобільний телефон"
                    />
                  </div>
                </div>

                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Місто</div>
                  <div className={css.formItemContent}>
                    <div
                      className={css.selectMob}
                      onClick={() => setOpen(true)}
                    >
                      <div className={css.selectText}>
                        {selectedCityq ? selectedCityq : "Виберіть місто"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Поточний пароль</div>
                  <div className={css.formItemContent}>
                    <input
                      className={css.input}
                      type="password"
                      placeholder="Пароль"
                    />
                  </div>
                </div>
                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Новий пароль</div>
                  <div className={css.formItemContent}>
                    <input
                      className={css.input}
                      type="password"
                      placeholder="Новий пароль"
                    />
                  </div>
                </div>
                <div className={css.fromItem}>
                  <div className={css.formItemTitle}>Пароль ще раз</div>
                  <div className={css.formItemContent}>
                    <input
                      className={css.input}
                      type="password"
                      placeholder="Пароль ще раз"
                    />
                  </div>
                </div>
                <button className={css.btnSaveMob} type="submit">
                  Зберегти зміни
                </button>
              </form>
              <div className={`${css.citiesContainer} ${open ? css.open : ""}`}>
                <div className={`${css.citiesWrapper}`}>
                  <div className={css.navbar}>
                    <div className={css.title}>Місто</div>
                  </div>
                  <div className={css.search}>
                    <div className={css.iconSearch}>
                      <CiSearch className={css.searchIcon} />
                    </div>
                    <div className={css.searchInput}>
                      <input
                        className={css.searchField}
                        type="text"
                        placeholder="назва міста"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                    {searchValue.length >= 3 && (
                      <div className={css.searchClear}>
                        <button
                          className={css.btnClose}
                          onClick={() => setSearchValue("")}
                        >
                          <IoIosClose className={css.iconClose} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={css.main}>
                    <div className={css.contentViewport}>
                      <ul className={css.optionsList}>
                        {cit && cit.data && filteredCities.length > 0 ? (
                          filteredCities.map((item) => (
                            <li
                              className={css.optionsListItem}
                              key={item.Ref}
                              id={item.Ref}
                              onClick={() => selectCity(item)}
                            >
                              <div className={css.optionItem}>
                                <div className={css.optionItemTitle}>
                                  {highlightText(item.Description, searchValue)}
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className={css.optionsListItem}>
                            Місто не знайдене
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {open && (
                <div
                  className={css.overlay}
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              )}
              <ToastContainer />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
