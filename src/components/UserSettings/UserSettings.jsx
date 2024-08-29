import { Controller, useForm } from "react-hook-form";
import css from "./UserSettings.module.css";
import CustomMaskedInput from "../RegisterForm/CustomMaskedInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/selectors";
import { useEffect, useState } from "react";
import {
  getArea,
  getPostOffice,
  getCities,
} from "../../services/NovaPoshtaApi";
import { useNavigate } from "react-router-dom";
import { apiUpdateUser } from "../../redux/auth/operations";
import SelectNovaPoshta from "../SelectNovaPoshta/SelectNovaPoshta";

const UserRegisterSchema = Yup.object().shape({
  name: Yup.string(),
  serName: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email("Уведіть валідний email"),
  area: Yup.string(),
  city: Yup.string(),
  office: Yup.string(),
});

const UserSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector(selectUserData) || {};
  const {
    name = "",
    serName = "",
    phone = "",
    email = "",
    area = "",
    city = "",
    office = "",
  } = userData;

  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [offices, setOffices] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors, touchedFields }, !!!!!!!Тут треба доробити
    setValue,
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
    defaultValues: {
      name: name || "",
      serName: serName || "",
      phone: phone || "",
      email: email || "",
      area: area || "",
      city: city || "",
      office: office || "",
    },
  });

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await getArea();
        setAreas(areasData);

        // Set initial area
        if (area) {
          const selectedArea = areasData.find((a) => a.Ref === area);
          if (selectedArea) {
            setValue("area", area);
            const citiesData = await getCities(selectedArea);
            setCities(citiesData);
          }
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, [area, setValue]);

  useEffect(() => {
    const fetchOffices = async () => {
      if (city) {
        try {
          const officeData = await getPostOffice(city);
          setOffices(officeData);
        } catch (error) {
          console.error("Error fetching post offices:", error);
        }
      }
    };

    fetchOffices();
  }, [city]);

  useEffect(() => {
    if (userData) {
      setValue("name", name || "");
      setValue("serName", serName || "");
      setValue("phone", phone || "");
      setValue("email", email || "");
      setValue("area", area || "");
      setValue("city", city || "");
      setValue("office", office || "");
    }
  }, [userData, name, serName, phone, email, area, city, office, setValue]);
  // console.log("city: ", city);
  // console.log("area: ", area);

  const handleAreaChange = async (e) => {
    const selectedAreaRef = e.target.value;
    const selectedArea = areas.find((a) => a.Ref === selectedAreaRef);

    if (selectedArea) {
      try {
        const citiesData = await getCities(selectedArea);
        setCities(citiesData);
        setOffices([]);
        setValue("city", ""); // Clear city and office if area changes
        setValue("office", "");
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
    const selectedCity = e.target.value;
    setValue("city", selectedCity);

    try {
      const officeData = await getPostOffice(selectedCity);
      setOffices(officeData);
      setValue("office", ""); // Clear office if city changes
    } catch (error) {
      console.error("Error fetching post offices:", error);
      setOffices([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(apiUpdateUser(data));
      if (response) {
        navigate("/user-cabinet");
      }
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <div>
      {/* Тут починається новий дизайн профіля */}
      <div className={css.profileContent}>
        <h1>Особисті Дані</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <dl className={css.form}>
              <dt className={css.formHead}>Ім&apos;я</dt>
              <dd className={css.formItem}>
                <input
                  className={css.field}
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Ім'я"
                />
              </dd>
              <dt className={css.formHead}>Прізвище</dt>
              <dd className={css.formItem}>
                <input
                  className={css.field}
                  id="surname"
                  type="text"
                  {...register("serName")}
                  placeholder="Прізвище"
                />
              </dd>
              <dt className={css.formHead}>Е-пошта</dt>
              <dd className={css.formItem}>
                <input
                  className={css.field}
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                />
              </dd>
              <dt className={css.formHead}>Телефон</dt>
              <dd className={css.formItem}>
                {/* <input className={css.field} type="text" /> */}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <CustomMaskedInput
                      className={css.field}
                      id="phone"
                      {...field}
                      placeholder="Мобільний телефон"
                    />
                  )}
                />
              </dd>
              <dt className={css.formHead}>Область</dt>
              <dd className={css.formItem}>
                {/* <input className={css.field} type="text" /> */}
                <SelectNovaPoshta
                  options={areas.map((a) => a.Description)}
                  value={areas.find((a) => a.Ref === area)?.Description || ""}
                  onChange={(selectedArea) => {
                    const selectedAreaRef = areas.find(
                      (a) => a.Description === selectedArea
                    )?.Ref;
                    setValue("area", selectedAreaRef || "");
                    handleAreaChange({
                      target: { value: selectedAreaRef || "" },
                    });
                  }}
                  placeholder="Виберіть область"
                />
              </dd>
              <dt className={css.formHead}>Місто</dt>
              <dd className={css.formItem}>
                {/* <input className={css.field} type="text" /> */}
                <SelectNovaPoshta
                  options={cities}
                  value={city || ""}
                  onChange={(selectedCity) => {
                    setValue("city", selectedCity);
                    handleCityChange({ target: { value: selectedCity } });
                  }}
                  placeholder="Виберіть місто"
                />
              </dd>
              <dt className={css.formHead}>Віділення</dt>
              <dd className={css.formItem}>
                {/* <input className={css.field} type="text" /> */}
                <SelectNovaPoshta
                  options={offices}
                  value={office || ""}
                  onChange={(selectedOffice) => {
                    setValue("office", selectedOffice);
                  }}
                  placeholder="Виберіть віділення"
                />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

// Стара форма

{
  /* <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.card}>
          <div className={css.cardHeader}>Особисті дані</div>

          <div className={css.inputBox}>
            <label className={css.rrr} htmlFor="name">
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
            <label className={css.rrr} htmlFor="surname">
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
            <label className={css.rrr} htmlFor="phone">
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
            <label className={css.rrr} htmlFor="email">
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
        <div className={css.card}>
          <div className={css.cardHeader}>Адреса доставки</div>
          <div className={css.inputBox}>
            <label className={css.visuallyHidden} htmlFor="area">
              Область
            </label>
            <SelectNovaPoshta
              options={areas.map((a) => a.Description)}
              value={areas.find((a) => a.Ref === area)?.Description || ""}
              onChange={(selectedArea) => {
                const selectedAreaRef = areas.find(
                  (a) => a.Description === selectedArea
                )?.Ref;
                setValue("area", selectedAreaRef || "");
                handleAreaChange({ target: { value: selectedAreaRef || "" } });
              }}
              placeholder="Виберіть область"
            />
          </div>
          <div className={css.inputBox}>
            <label className={css.visuallyHidden} htmlFor="city">
              Місто
            </label>
            <SelectNovaPoshta
              options={cities}
              value={city || ""}
              onChange={(selectedCity) => {
                setValue("city", selectedCity);
                handleCityChange({ target: { value: selectedCity } });
              }}
              placeholder="Виберіть місто"
            />
          </div>
          <div className={css.inputBox}>
            <label className={css.visuallyHidden} htmlFor="office">
              Віділення
            </label>
            <SelectNovaPoshta
              options={offices}
              value={office || ""}
              onChange={(selectedOffice) => {
                setValue("office", selectedOffice);
              }}
              placeholder="Виберіть віділення"
            />
          </div>
        </div>
        <button className={css.btnSave} type="submit">
          Зберегти зміни
        </button>
      </form> */
}
