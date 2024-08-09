import { Controller, useForm } from "react-hook-form";
import css from "./BasketContactData.module.css";
import CustomMaskedInput from "../RegisterForm/CustomMaskedInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";
import { useEffect, useState } from "react";
import {
  getArea,
  getPostOffice,
  getCities,
} from "../../services/NovaPoshtaApi";
import { sendOrder } from "../../services/productApi";
import { selectBasket } from "../../redux/basket/selectors";

const UserRegisterSchema = Yup.object().shape({
  name: Yup.string(),
  serName: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email("Уведіть валідний email"),
  area: Yup.string(),
  city: Yup.string(),
  office: Yup.string(),
});

const BasketContactData = () => {
  const userData = useSelector(selectUserData) || {};
  const { name, serName, phone, email, area, city, office } = userData;

  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await getArea();
        setAreas(areasData);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  const handleAreaChange = async (e) => {
    const selectedAreaRef = e.target.value;
    const selectedArea = areas.find((area) => area.Ref === selectedAreaRef);

    if (selectedArea && selectedArea.Ref) {
      try {
        const citiesData = await getCities(selectedArea);
        setCities(citiesData);
        setOffices([]);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
        setOffices([]);
      }
    } else {
      setCities([]);
      setOffices([]);
    }
  };

  const handleCityChange = async (e) => {
    const selectCity = e.target.value;
    const selectedCity = cities.find((city) => city === selectCity);
    if (selectedCity) {
      try {
        const officeData = await getPostOffice(selectedCity);
        setOffices(officeData);
      } catch (error) {
        console.error("Error fetching post offices:", error);
        setOffices([]);
      }
    } else {
      setOffices([]);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    setValue,
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
    defaultValues: {
      name: "",
      serName: "",
      phone: "",
      email: "",
      area: "",
      city: "",
      office: "",
    },
  });

  useEffect(() => {
    setValue("name", name);
    setValue("serName", serName);
    setValue("phone", phone);
    setValue("email", email);
    // setValue("area", area);
    // setValue("city", city);
    // setValue("office", office);
  }, [name, serName, phone, email, area, city, office, setValue]);
  const basketData = useSelector(selectBasket);

  const submitOrder = async (formData) => {
    try {
      const { name, serName, phone, email, area, city, office } = formData;
      const basket = basketData;
      const user = {
        name,
        serName,
        phone,
        email,
        address: {
          area,
          city,
          office,
        },
      };

      const response = await sendOrder({ user, basket });
      console.log("Response:", response);

      if (response && response.message === "Order created successfully") {
        console.log("Order created successfully:", response.order);
      } else {
        console.error("Failed to create order:", response.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit(submitOrder)}>
        <div className={css.boxUserInfo}>
          <div className={css.inputBox}>
            <label className={css.visuallyHidden} htmlFor="name">
              Імя
            </label>
            <input
              className={css.inputForm}
              id="name"
              type="text"
              {...register("name")}
              placeholder="Ім'я"
            />
          </div>
          <div className={css.inputBox}>
            <label className={css.visuallyHidden} htmlFor="surname">
              Прізвище
            </label>
            <input
              className={css.inputForm}
              id="surname"
              type="text"
              {...register("serName")}
              placeholder="Прізвище"
            />
          </div>

          <div className={css.inputBox}>
            <label className={css.visuallyHidden} htmlFor="phone">
              Мобільний телефон
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <CustomMaskedInput
                  className={css.inputForm}
                  id="phone"
                  {...field}
                  placeholder="Мобільний телефон"
                />
              )}
            />
          </div>

          <div className={css.inputBox}>
            <label className={css.visuallyHidden} htmlFor="email">
              Email
            </label>
            <input
              className={`${css.inputForm}`}
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && touchedFields.email ? (
              <div className={css.error}>{errors.email.message}</div>
            ) : null}
          </div>
        </div>
        <div>
          <h1>Адреса доставки</h1>
          <div>
            <label className={css.visuallyHidden} htmlFor="area">
              Область
            </label>

            <select
              className={css.inputForm}
              id="area"
              type="text"
              {...register("area")}
              onChange={handleAreaChange}
            >
              <option value="">Виберіть область</option>
              {areas &&
                areas.map((area) => (
                  <option key={area.Ref} value={area.Ref}>
                    {area.Description}
                  </option>
                ))}
            </select>

            <label className={css.visuallyHidden} htmlFor="city">
              Місто
            </label>

            <select
              className={css.inputForm}
              id="city"
              {...register("city")}
              onChange={handleCityChange}
            >
              <option value="">Виберіть місто</option>
              {cities &&
                cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
            <label className={css.visuallyHidden} htmlFor="office">
              Віділення
            </label>
            <select
              className={css.inputForm}
              id="office"
              {...register("office")}
            >
              <option value="">Виберіть віділення</option>
              {offices &&
                offices.map((offic) => (
                  <option key={offic} value={offic}>
                    {offic}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button className={css.btnLogin} type="submit">
          Оформити замовлення
        </button>
      </form>
    </div>
  );
};

export default BasketContactData;

// const [infoProduct, setInfoProduct] = useState(false);
