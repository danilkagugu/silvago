import { useEffect, useMemo, useState } from "react";
import { getBasketProduct, productById } from "../../services/productApi";
import css from "./BasketRigth.module.css";

import CatalogItem from "../CatalogItem/CatalogItem";
import { updateProductQuantityBasket } from "../../redux/basket/operations";
import { useDispatch } from "react-redux";
//

import CustomMaskedInput from "../RegisterForm/CustomMaskedInput";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";
import { getPostOffice, getAllCities } from "../../services/NovaPoshtaApi";
import { selectBasket } from "../../redux/basket/selectors";
import { createOrder } from "../../redux/basket/operations";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

const BasketRigth = () => {
  const isMobile = window.innerWidth <= 1440;
  const tt = useSelector(selectBasket);
  // console.log("tt: ", tt);
  const [basket, setBasket] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  // const [offices, setOffices] = useState([]);
  const [officesMob, setOfficesMob] = useState([]);
  // console.log("officesMob: ", officesMob);
  const [selectedCityq, setSelectedCityq] = useState("");
  // console.log("selectedCityq: ", selectedCityq);
  const [selectedOfficeq, setSelectedOfficeq] = useState("");
  // console.log("offices: ", offices);
  const [openDropdown, setOpenDropdown] = useState(null);
  // const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    serName: "",
    phone: "",
    email: "",
    city: "",
    office: "",
  });

  const [openComentar, setOpenComentar] = useState(false);
  const [openOffice, setOpenOffice] = useState(false);

  const dispatch = useDispatch();
  const [cit, setCit] = useState();
  const [open, setOpen] = useState(false);
  const [searchOffice, setSearchOffice] = useState("");
  const [searchValue, setSearchValue] = useState("");
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const basketData = await getBasketProduct();
        // console.log("basketData: ", basketData);

        if (basketData && Array.isArray(basketData.products)) {
          setBasket(basketData.products);

          const details = {};
          for (const basketItem of basketData.products) {
            // console.log("basketItem: ", basketItem);
            const response = await productById(basketItem.slug);
            details[basketItem.slug] = response;
            // console.log("basketItem: ", basketItem);
          }
          setProductDetails(details);
        } else {
          console.error("Недійсний формат даних кошика:", basketData);
        }
      } catch (error) {
        console.error("Помилка отримання продуктів у кошику:", error);
      }
    };
    fetchProducts();
  }, []);

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

  const handleQuantityChange = async (productId, volume, quantity) => {
    try {
      await dispatch(
        updateProductQuantityBasket({
          productId,
          volume,
          quantity,
        })
      );
      setBasket((prevBasket) =>
        prevBasket.map((item) =>
          item.product === productId && item.volume === volume
            ? { ...item, quantity: quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Помилка оновлення кількості товару:", error);
    }
  };

  const calculateTotalAmount = () => {
    return basket.reduce((total, item) => {
      const details = productDetails[item.slug];
      if (details) {
        const volumeDetail = details?.product?.volumes?.find(
          (vol) => vol.volume === item.volume
        );
        if (volumeDetail) {
          const price = volumeDetail.price;
          const discount = volumeDetail.discount || 0;
          const discountedPrice = price * (1 - discount / 100);
          return total + item.quantity * discountedPrice;
        }
      }
      return total;
    }, 0);
  };

  // ФОрма

  const userData = useSelector(selectUserData);
  // console.log("userData: ", userData);

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

      fetchArea(); // Invoke the async function
    }
  }, [userData]);

  // console.log("userData", userData);

  useEffect(() => {
    const fetchOffices = async () => {
      if (selectedCityq) {
        try {
          const officeData = await getPostOffice(selectedCityq);
          setOfficesMob(officeData);
        } catch (error) {
          console.error("Error fetching post offices:", error);
        }
      }
    };

    fetchOffices();
  }, [selectedCityq]);

  //

  //
  const basketData = useSelector(selectBasket);

  const submitOrder = async (e) => {
    e.preventDefault();
    const { city, office } = formData;

    if (!city || !office) {
      console.error("Area, city, or office is missing.");
      return;
    }
    const basket = basketData;
    const user = {
      name: formData.name,
      serName: formData.serName,
      phone: formData.phone,
      email: formData.email,
      address: {
        city,
        office,
      },
    };

    try {
      const response = await dispatch(createOrder({ user, basket })).unwrap();
      if (response && response.message === "Order created successfully") {
        console.log("Order created successfully:", response.order);
      } else {
        console.error("Failed to create order:", response.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

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

  const popularCities = ["Київ", "Харків", "Одеса", "Дніпро", "Львів"];

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
    selectedCityq && officesMob.data && officesMob.data.length > 0
      ? officesMob.data[0]
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
    setSelectedOfficeq("");
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

  // console.log(firstOffice);
  // Функція для фільтрації офісів
  const filterOffices = (offices, searchValue) => {
    if (!offices || !offices.data) return [];

    return offices.data.filter((item) =>
      item.Description.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

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
                    <dt className={css.formHead}>ПІБ</dt>
                    <dd className={css.formItem}>
                      <input
                        className={css.field}
                        id="name"
                        type="text"
                        value={formData.name + " " + formData.serName}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Ім'я"
                      />
                    </dd>
                    <dt className={css.formHead}>Телефон</dt>
                    <dd className={css.formItem}>
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
                          <li className={css.optionsListItem}>
                            Місто не знайдене
                          </li>
                        )}
                      </ul>
                    </dd>
                    <p>коментар</p>
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
                              {filterOffices(officesMob, searchOffice).length >
                              0 ? (
                                filterOffices(officesMob, searchOffice).map(
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
                <button className={css.btnLogin} type="submit">
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
                {tt.map((item) => {
                  // console.log("tt: ", tt);
                  const details = productDetails[item.slug];
                  // console.log("productDetails: ", productDetails);
                  // console.log("details: ", details);
                  const uniqueKey = `${item.product}-${item.volume}`;
                  const volumeDetail = details?.product?.volumes?.find(
                    (vol) => vol.volume === item.volume
                  );
                  const price = volumeDetail ? volumeDetail.price : 0;
                  const discount = volumeDetail
                    ? volumeDetail.discount || 0
                    : 0;
                  const discountedPrice = price * (1 - discount / 100);
                  return (
                    <li
                      className={css.orderListItem}
                      key={uniqueKey}
                      id={item.product}
                    >
                      {details && (
                        <CatalogItem
                          productImg={details.volume.image}
                          productName={details.product.name}
                          productPrice={Math.ceil(discountedPrice)}
                          id={item.product}
                          slug={details.volume.slug}
                          item={item}
                          handleQuantityChange={handleQuantityChange}
                          details={details}
                          discountedPrice={discountedPrice}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className={css.totalAmount}>
                <h3 className={css.totalAmountTitle}>
                  Загальна сума: {calculateTotalAmount()} грн
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
                      <div className={css.formItemTitle}>ПІБ</div>
                      <div className={css.formItemContent}>
                        <input
                          className={css.input}
                          type="text"
                          value={formData.name + " " + formData.serName}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
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
                        {filterOffices(officesMob, searchValue).length > 0 ? (
                          filterOffices(officesMob, searchValue).map((item) => (
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
                {tt.map((item) => {
                  // console.log("tt: ", tt);
                  const details = productDetails[item.slug];
                  // console.log("productDetails: ", productDetails);
                  // console.log("details: ", details);
                  const uniqueKey = `${item.product}-${item.volume}`;
                  const volumeDetail = details?.product?.volumes?.find(
                    (vol) => vol.volume === item.volume
                  );
                  const price = volumeDetail ? volumeDetail.price : 0;
                  const discount = volumeDetail
                    ? volumeDetail.discount || 0
                    : 0;
                  const discountedPrice = price * (1 - discount / 100);
                  return (
                    <li className={css.orderDetailsBlock} key={uniqueKey}>
                      <div className={css.cartItem}>
                        {details && (
                          <CatalogItem
                            productImg={details.volume.image}
                            productName={details.product.name}
                            productPrice={Math.ceil(discountedPrice)}
                            id={item.product}
                            slug={details.volume.slug}
                            item={item}
                            handleQuantityChange={handleQuantityChange}
                            details={details}
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
