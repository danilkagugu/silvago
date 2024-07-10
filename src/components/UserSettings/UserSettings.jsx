import { Controller, useForm } from "react-hook-form";
import css from "./UserSettings.module.css";
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

const UserRegisterSchema = Yup.object().shape({
  name: Yup.string(),
  serName: Yup.string(),
  phone: Yup.string(),
  email: Yup.string()
    .email("Уведіть валідний email")
    .required("Поле Email є обов'язковим"),
  password: Yup.string()
    .min(6, "Короткий")
    .max(50, "Довгий")
    .required("Поле 'Пароль' є обов'язковим"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролі різні")
    .required("Поле 'Пароль' є обов'язковим"),
});

const UserSettings = () => {
  const { name, serName, phone, email } = useSelector(selectUserData);
  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [office, setOffices] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await getArea();
        setAreas(areasData);
      } catch (error) {
        console.error("Error fetching cities:", error);
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

  const INITIAL_FORM_DATA = {
    name,
    serName,
    phone,
    email,
  };

  const {
    register,
    // handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
    defaultValues: INITIAL_FORM_DATA,
  });

  return (
    <div>
      <form className={css.form}>
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
            <label className={css.visuallyHidden} htmlFor="areas">
              Область
            </label>
            <select
              className={css.inputForm}
              id="areas"
              type="text"
              {...register("areas")}
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
            <label className={css.visuallyHidden} htmlFor="cities">
              Місто
            </label>
            <select
              className={css.inputForm}
              id="cities"
              {...register("cities")}
              onChange={handleCityChange}
            >
              <option value="">Виберіть місто</option>
              {cities.map((city) => (
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
              {office.map((offic) => (
                <option key={offic} value={offic}>
                  {offic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
