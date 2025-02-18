import { useEffect, useMemo, useState } from "react";
import css from "./BasketRigth.module.css";

import CatalogItem from "../CatalogItem/CatalogItem";
import {
  getBasketInfo,
  updateProductQuantityBasket,
} from "../../redux/basket/operations";
import { useDispatch } from "react-redux";

import CustomMaskedInput from "../RegisterForm/CustomMaskedInput";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";
import { selectBasket } from "../../redux/basket/selectors";
import { createOrder } from "../../redux/basket/operations";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import {
  selectCities,
  selectCurrentCity,
  selectCurrentOffice,
  selectOffices,
} from "../../redux/novaPoshta/selectors";
import {
  fetchCities,
  fetchCurrentOffice,
  fetchOffices,
  infoCurrentCity,
} from "../../redux/novaPoshta/operations";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const BasketRigth = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 1440);

  const isMobile = window.innerWidth <= 1440;

  const [selectedCityq, setSelectedCityq] = useState("");
  const [selectedOfficeq, setSelectedOfficeq] = useState("");
  // console.log("selectedOfficeq: ", selectedOfficeq);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    region: "",
    office: "",
    comment: "",
  });
  const [openComentar, setOpenComentar] = useState(false);
  const [openOffice, setOpenOffice] = useState(false);

  const [open, setOpen] = useState(false);
  const [searchOffice, setSearchOffice] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [usedBonuses, setUsedBonuses] = useState(0);
  console.log("usedBonuses: ", usedBonuses);

  const basketData = useSelector(selectBasket);
  // console.log("basketData: ", basketData);
  const userData = useSelector(selectUserData);
  console.log("userData: ", userData);
  const maxBonuses = userData?.bonuses || 0;
  // console.log("maxBonuses: ", maxBonuses);

  const cities = useSelector(selectCities);
  const offices = useSelector(selectOffices);
  const currentOffice = useSelector(selectCurrentOffice);
  // console.log("currentOffice: ", currentOffice);
  const currentCity = useSelector(selectCurrentCity);
  // console.log("currentCity: ", currentCity[0]?.Addresses[0]);
  const { Area } = (selectedCityq && currentCity?.[0]?.Addresses?.[0]) || {};
  const { ShortAddress } = (currentOffice && currentOffice?.[0]) || {};
  // console.log("ShortAddress: ", ShortAddress);

  useEffect(() => {
    if (Area) {
      setFormData((prevData) => ({
        ...prevData,
        region: Area,
      }));
    }
  }, [Area]);

  useEffect(() => {
    // Завантажуємо міста лише один раз
    if (!cities.data || cities.data.length === 0) {
      dispatch(fetchCities());
    }
  }, [dispatch, cities]);

  useEffect(() => {
    // Виконуємо запит на офіси тільки якщо обране місто
    if (selectedCityq) {
      dispatch(fetchOffices(selectedCityq));
    }
  }, [dispatch, selectedCityq]);

  useEffect(() => {
    if (selectedCityq && selectedOfficeq) {
      dispatch(
        fetchCurrentOffice({
          cityName: selectedCityq, // Назва міста (наприклад, Коростишів)
          warehouseId: selectedOfficeq?.Number, // Номер відділення (наприклад, 2)
        })
      );
    }
  }, [dispatch, selectedCityq, selectedOfficeq]);

  useEffect(() => {
    // Виконуємо запит на офіси тільки якщо обране місто
    if (selectedCityq) {
      dispatch(infoCurrentCity(selectedCityq));
    }
  }, [dispatch, selectedCityq]);

  useEffect(() => {
    dispatch(getBasketInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        fullName: ` ${userData?.lastName || ""} ${userData?.firstName || ""} ${
          userData?.middleName || ""
        }`.trim(),
        // middleName: userData?.middleName || "",
        phone: userData?.phone || "",
        email: userData?.email || "",
        city: userData?.city || "",
        // region: Area,
      }));
      setSelectedCityq(userData?.city);
    }
  }, [userData]);

  useEffect(() => {
    if (open || openOffice) {
      document.body.classList.add(css.noScroll);
      // document.documentElement.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
      // document.documentElement.classList.remove(css.noScroll);
    }

    // Очищення при демонтажі компонента
    return () => {
      document.body.classList.remove(css.noScroll);
      // document.documentElement.classList.remove(css.noScroll);
    };
  }, [open, openOffice]);

  const handleQuantityChange = async (productId, volume, quantity, tone) => {
    try {
      dispatch(
        updateProductQuantityBasket({
          productId,
          volume,
          quantity,
          tone,
        })
      );
    } catch (error) {
      console.error("Помилка оновлення кількості товару:", error);
    }
  };

  const calculateTotalAmount = () => {
    return basketData.reduce((total, item) => {
      const price = item.price;
      const discount = item.discount || 0;
      const discountedPrice = price * (1 - discount / 100);
      return total + item.quantity * discountedPrice;
    }, 0);
  };

  const handleBonusesChange = (e) => {
    const input = e.target.value;
    if (input === "") {
      setUsedBonuses(""); // Дозволяємо інпуту бути порожнім
    } else {
      const parsedValue = Math.min(
        Number(input),
        Math.min(maxBonuses, calculateTotalAmount())
      );
      setUsedBonuses(parsedValue);
    }
  };

  const totalAmountWithBonuses = calculateTotalAmount() - usedBonuses;
  // console.log("totalAmountWithBonuses: ", totalAmountWithBonuses);

  const submitOrder = async (e) => {
    e.preventDefault();
    const { city, office } = formData;
    console.log("office: ", office);
    // console.log("formData: ", formData);

    if (!city || !office) {
      alert("Будь ласка, оберіть місто та відділення для доставки.");
      return;
    }
    const outOfStockItems = basketData.filter(
      (item) => item.quantityStock === 0
    );
    if (outOfStockItems.length > 0) {
      alert(
        `Щоб продовжити, будь ласка, видаліть товари з кошика, яких немає в наявності.`
      );
      return;
    }

    const user = {
      fullName: formData.fullName || "",
      phone: formData.phone,
      email: formData.email,
      comment: formData.comment,
      city,
      office,
      region: Area,
      bonusesUsed: usedBonuses,
    };

    // console.log("user", user);
    try {
      const response = await dispatch(
        createOrder({ user, basketData })
      ).unwrap();
      console.log("response", response);
      if (response) {
        console.log("Order created successfully:", response.order);
        navigate("/order-success");
      } else {
        console.error("Failed to create order:", response.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Функція для обробки змін у полі введення

  const handleDropdownToggle = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null); // Закрити, якщо такий самий відкритий
      // setSearch("");
    } else {
      setOpenDropdown(dropdownName); // Відкрити новий і закрити попередній
      // setSearch("");
    }
  };

  // console.log("searchValue: ", searchValue);

  // console.log("cities", cities);
  const filteredCities = useMemo(() => {
    const popularCities = ["Київ", "Харків", "Одеса", "Дніпро", "Львів"];

    if (!cities.data || !Array.isArray(cities.data)) {
      return [];
    }

    if (!searchValue || searchValue.length < 3) {
      return popularCities
        .map((cityName) =>
          cities.data.find((item) => item.Description === cityName)
        )
        .filter(Boolean);
    }

    const lowerCaseSearch = searchValue.toLowerCase();
    const exactMatches = cities.data.filter(
      (option) =>
        option.Description &&
        option.Description.toLowerCase().startsWith(lowerCaseSearch)
    );

    const partialMatches = cities.data.filter(
      (option) =>
        option.Description &&
        !option.Description.toLowerCase().startsWith(lowerCaseSearch) &&
        option.Description.toLowerCase().includes(lowerCaseSearch)
    );

    return [...exactMatches, ...partialMatches];
  }, [cities, searchValue]);

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
  const firstOffice =
    selectedCityq && offices.data && offices.data.length > 0
      ? offices.data[0]
      : null;

  const selectCity = (city) => {
    setSelectedCityq(city.Description);
    setOpen(false);
    setSearchValue("");
  };

  // console.log("selectedOfficeq", selectedOfficeq);
  const selectCityDesc = (city) => {
    setSelectedCityq(city.Description);
    setSearchValue(city.Description);
    setOpen(false);
    setSelectedOfficeq(firstOffice);
    setFormData({
      ...formData,
      city: city.Description,
      office: "",
    });
  };

  const selectOffice = (office) => {
    setSelectedOfficeq(office);
    setOpenOffice(false);
    setFormData({ ...formData, office: office.Description });
  };

  useEffect(() => {
    if (firstOffice) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        office: firstOffice.Description,
      }));
    }
  }, [firstOffice]);
  // console.log("formData: ", formData);
  // Функція для фільтрації офісів
  const filterOffices = (offices, searchValue) => {
    if (!offices || !offices.data) return [];

    return offices.data.filter((item) =>
      item.Description.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  // if (isLoadingCities) {
  //   return <LoaderSilvago />;
  // }

  return (
    <>
      {!isMobile ? (
        <>
          <h1 className={css.titleBasket}>Оформлення замовлення</h1>
          <div className={css.checkoutMain}>
            <div className={css.checkoutBody}>
              <form onSubmit={submitOrder}>
                <div className={css.checkoutBodyItem}>
                  <h2 className={css.checkoutBodyItemTitle}>
                    Одержувач замовлення
                  </h2>
                  <dl className={css.form}>
                    {/* <dt className={css.formHead}>Ім&apos;я</dt>
                    <dd className={css.formItem}>
                      <input
                        className={css.field}
                        id="firstName"
                        type="text"
                        value={`${formData.firstName}`}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value.trim(),
                          })
                        }
                        placeholder="Ім'я"
                      />
                    </dd>
                    <dt className={css.formHead}>Прізвище</dt>
                    <dd className={css.formItem}>
                      <input
                        className={css.field}
                        id="lastName"
                        type="text"
                        value={`${formData.lastName}`}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value.trim(),
                          })
                        }
                        placeholder="Ім'я"
                      />
                    </dd> */}
                    <dt className={css.formHead}>ПІБ</dt>
                    <dd className={css.formItem}>
                      <input
                        className={css.field}
                        id="fullName"
                        type="text"
                        value={formData.fullName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullName: e.target.value, // Тепер не trim(), щоб дозволити пробіли
                          })
                        }
                        placeholder="Ім'я Прізвище"
                      />
                    </dd>
                    <dt className={css.formHead}>Телефон</dt>
                    <dd className={css.formItem}>
                      <div className={css.phoneInputContainer}>
                        <PhoneInput
                          country={"ua"} // Встановлює префікс +380
                          value={formData.phone}
                          onChange={(phone) =>
                            setFormData({
                              ...formData,
                              phone: phone.replace(/\D/g, ""), // Видаляє нецифрові символи
                            })
                          }
                          placeholder="+38 (0__) ___-__-__"
                          inputClass={css.customPhoneInput}
                          specialLabel="" // Відключає додатковий лейбл
                          enableSearch={false} // Вимикає пошук країни
                          onlyCountries={["ua"]} // Дозволяє лише Україну
                          disableCountryCode={false} // Включає префікс +380
                          countryCodeEditable={false} // Забороняє редагування префіксу
                          masks={{
                            ua: "(..) ...-..-..",
                          }}
                        />
                      </div>
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
                        {cities && cities.data && filteredCities.length > 0 ? (
                          filteredCities.map((item) => (
                            <li
                              className={css.optionsListItem}
                              key={item.Ref}
                              id={item.Ref}
                              onClick={() => selectCityDesc(item)}
                            >
                              <div className={css.optionItem}>
                                <div className={css.optionItemTitle}>
                                  {item.Description}
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
                    </dd>
                    <dt className={css.formHead}>Коментар</dt>
                    <dd className={css.formItem}>
                      {!openComentar ? (
                        <p onClick={() => setOpenComentar(true)}>
                          Додати коментар до замовлення
                        </p>
                      ) : (
                        <textarea
                          className={`${css.field} ${css.textareaText}`}
                          id="comment"
                          type="text"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              comment: e.target.value,
                            })
                          }
                        />
                      )}
                    </dd>
                  </dl>
                </div>
                <div className={css.checkoutBodyItem}>
                  <dl className={css.form}>
                    <dt className={css.formHead}>
                      <span className={css.formHeadSpan}>Доставка</span>
                    </dt>
                    <dd className={`${css.formItem}`}>Нова пошта</dd>
                    <div className={css.deliveryMethod}>
                      <dt className={css.formHead}>Віділення</dt>
                      <dd className={`${css.formItem} ${css.important}`}>
                        <span
                          className={css.selectboxitContainer}
                          aria-expanded={openDropdown === "office"}
                          role="combobox"
                          onClick={() => handleDropdownToggle("office")}
                        >
                          <span className={css.selectboxit}>
                            <span className={css.selectboxitText}>
                              {selectedCityq
                                ? selectedOfficeq
                                  ? selectedOfficeq.Description
                                  : firstOffice?.Description
                                : ""}
                            </span>
                          </span>
                          <div
                            className={css.selectboxitDropdown}
                            style={{
                              display:
                                openDropdown === "office" ? "block" : "none",
                            }}
                          >
                            <div className={css.selectboxitSearchContainer}>
                              <input
                                className={css.selectboxitSearchField}
                                type="text"
                                placeholder="Пошук..."
                                value={searchOffice}
                                onChange={(e) =>
                                  setSearchOffice(e.target.value)
                                }
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <ul className={css.selectboxitOptions}>
                              {filterOffices(offices, searchOffice).length >
                              0 ? (
                                filterOffices(offices, searchOffice).map(
                                  (item) => (
                                    <li
                                      key={item.Ref}
                                      className={css.selectboxitFocus}
                                      onClick={() => selectOffice(item)}
                                      value={item.Ref}
                                    >
                                      <p
                                        className={css.selectboxitOptionAnchor}
                                      >
                                        {item.Description}
                                      </p>
                                    </li>
                                  )
                                )
                              ) : (
                                <li className={css.optionsListItem}>
                                  Віділення не знайдене
                                </li>
                              )}
                            </ul>
                          </div>
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
                <span className={css.deleteThis}></span>
                <button className={css.btnSubmit} type="submit">
                  Оформити замовлення
                </button>
              </form>
            </div>
          </div>
          {/* // */}
          <div className={css.checkoutAside}>
            <div className={css.order}>
              <h2 className={css.orderHeader}>Ваше замовлення</h2>

              <ul className={css.orderList}>
                {basketData.map((item) => {
                  const uniqueKey = `${item._id}-${item.volume}`;

                  const price = item ? item.price : 0;
                  const discount = item ? item.discount || 0 : 0;
                  const discountedPrice = price * (1 - discount / 100);
                  return (
                    <li
                      className={css.orderListItem}
                      key={uniqueKey}
                      id={item._id}
                    >
                      {item && (
                        <CatalogItem
                          key={`${item._id}-${item.volume}`}
                          slug={item.slug}
                          productPrice={Math.ceil(discountedPrice)}
                          item={item}
                          handleQuantityChange={handleQuantityChange}
                          discountedPrice={discountedPrice}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className={css.totalAmount}>
                <div className={css.bonusBlock}>
                  <label htmlFor="bonusesInput" className={css.bonusLabel}>
                    Використати бонуси (доступно: {maxBonuses} грн)
                  </label>
                  <input
                    type="number"
                    id="bonusesInput"
                    value={usedBonuses === 0 ? "" : usedBonuses}
                    onChange={handleBonusesChange}
                    className={css.bonusInput}
                    min="0"
                    max={Math.min(maxBonuses, calculateTotalAmount())}
                  />
                </div>
                <h3 className={css.totalAmountTitle}>
                  Загальна сума: {totalAmountWithBonuses} грн
                </h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={css.checkout}>
            <div className={css.content}>
              <form style={{ padding: "10px" }} onSubmit={submitOrder}>
                <div className={css.formSection}>
                  <h3 className={css.heading}>Одержувач замовлення</h3>
                  <div className={css.formList}>
                    <div className={css.formItemMob}>
                      <div className={css.formItemTitle}>Ім&apos;я</div>
                      <div className={css.formItemContent}>
                        <input
                          className={css.input}
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value.trim(),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className={css.formItemMob}>
                      <div className={css.formItemTitle}>Прізвище</div>
                      <div className={css.formItemContent}>
                        <input
                          className={css.input}
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value.trim(),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className={css.formItemMob}>
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

                    <div className={css.formItemMob}>
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
                    <div className={css.formItemMob}>
                      <div
                        className={css.formItemTitle}
                        style={{ display: openComentar ? "block" : "none" }}
                      >
                        Коментар
                      </div>
                      <div className={css.formItemContent}>
                        {!openComentar ? (
                          <button
                            className={css.btnComent}
                            onClick={() => setOpenComentar(true)}
                          >
                            Додати коментар до замовлення
                          </button>
                        ) : (
                          <textarea
                            className={`${css.input} ${css.inputComent}`}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                comment: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${css.formSection} ${
                    !selectedCityq ? css.disabled : ""
                  }`}
                >
                  <h3 className={css.heading}>Доставка</h3>
                  <div className={css.formList}>
                    <div className={css.formItemMob}>
                      <div className={css.formItemTitle}>Віділення</div>
                      <div className={css.formItemContent}>
                        <div
                          className={css.selectMob}
                          onClick={() => setOpenOffice(true)}
                        >
                          <div className={css.selectText}>
                            {!selectedOfficeq
                              ? firstOffice
                                ? firstOffice.Description
                                : ""
                              : selectedOfficeq.Description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${css.formSection} ${css.formSectionColumn}`}>
                  <div className={css.formItemMob}>
                    <button className={css.btnOrder}>
                      Оформити замовлення
                    </button>
                  </div>
                  <div className={css.formItemMob}>
                    <div className={css.userAgreement}>
                      <p>
                        Підтверджуючи замовлення, я приймаю умови угоди
                        користувача
                      </p>
                    </div>
                  </div>
                </div>
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
                        value={searchValue || formData.city}
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
                        {cities && cities.data && filteredCities.length > 0 ? (
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
              <div
                className={`${css.citiesContainer} ${
                  openOffice ? css.open : ""
                }`}
              >
                <div className={`${css.citiesWrapper}`}>
                  <div className={css.navbar}>
                    <div className={css.title}>Віділення</div>
                  </div>
                  <div className={css.search}>
                    <div className={css.iconSearch}>
                      <CiSearch className={css.searchIcon} />
                    </div>
                    <div className={css.searchInput}>
                      <input
                        className={css.searchField}
                        type="text"
                        placeholder="Пошук"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                    {searchValue.length >= 1 && (
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
                        {filterOffices(offices, searchValue).length > 0 ? (
                          filterOffices(offices, searchValue).map((item) => (
                            <li
                              className={`${css.optionsListItem} ${
                                !selectedOfficeq?.Ref
                                  ? firstOffice.Ref === item.Ref
                                    ? css.activeOffice
                                    : ""
                                  : selectedOfficeq?.Ref === item.Ref
                                  ? css.activeOffice
                                  : ""
                              }`}
                              key={item.Ref}
                              id={item.Ref}
                              onClick={() => selectOffice(item)}
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
                            Віділення не знайдене
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(open || openOffice) && (
            <div
              className={css.overlay}
              onClick={() => {
                setOpen(false);
                setOpenOffice(false);
              }}
            />
          )}
          <div className={css.orderDetails}>
            <div className={css.orderDetailsHeader}>Ваше замовлення</div>
            <div className={css.orderDetailsBody}>
              <ul>
                {basketData.map((item) => {
                  const uniqueKey = `${item.product}-${item.volume}`;

                  const price = item ? item.price : 0;
                  const discount = item ? item.discount || 0 : 0;

                  const discountedPrice = price * (1 - discount / 100);
                  return (
                    <li className={css.orderDetailsBlock} key={uniqueKey}>
                      <div className={css.cartItem}>
                        {item && (
                          <CatalogItem
                            key={`${item.product}-${item.volume}`}
                            slug={item.slug}
                            productPrice={Math.ceil(discountedPrice)}
                            item={item}
                            handleQuantityChange={handleQuantityChange}
                            discountedPrice={discountedPrice}
                          />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className={css.orderDetailsCost}>
                <div className={css.orderDetailsCostItem}>
                  <div>Доставка</div>
                  <div className={css.orderDetailsCostValue}>
                    За тарифами перевізника
                  </div>
                </div>
              </div>
              <div className={css.orderDetailsTotal}>
                {calculateTotalAmount()} грн
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BasketRigth;
