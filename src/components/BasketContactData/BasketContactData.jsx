import { Controller, useForm } from "react-hook-form";
import css from "./BasketContactData.module.css";
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
// import { sendOrder } from "../../services/productApi";
import { selectBasket } from "../../redux/basket/selectors";
import SelectNovaPoshta from "../SelectNovaPoshta/SelectNovaPoshta";
import { createOrder } from "../../redux/basket/operations";

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
  const dispatch = useDispatch();
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
    setValue("name", name);
    setValue("serName", serName);
    setValue("phone", phone);
    setValue("email", email);
    setValue("area", area);
    setValue("city", city);
    setValue("office", office);
  }, [name, serName, phone, email, area, city, office, setValue]);

  const basketData = useSelector(selectBasket);
  // console.log("basketData: ", basketData);

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

  const submitOrder = async (formData) => {
    try {
      const { name, serName, phone, email, area, city, office } = formData;

      if (!area || !city || !office) {
        console.error("Area, city, or office is missing.");
        return;
      }
      const basket = basketData;
      // console.log("basket: ", basket);
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

      const response = await dispatch(createOrder({ user, basket })).unwrap();
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

            <label className={css.visuallyHidden} htmlFor="city">
              Місто
            </label>

            <SelectNovaPoshta
              options={cities}
              value={city || ""}
              onChange={(selectedCity) => {
                setValue("city", selectedCity || "");
                handleCityChange({ target: { value: selectedCity } });
              }}
              placeholder="Виберіть місто"
            />
            <label className={css.visuallyHidden} htmlFor="office">
              Віділення
            </label>
            <SelectNovaPoshta
              options={offices}
              value={office || ""}
              onChange={(selectedOffice) => {
                setValue("office", selectedOffice || "");
              }}
              placeholder="Виберіть віділення"
            />
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

// const UserRegisterSchema = Yup.object().shape({
//   name: Yup.string().required("Ім'я є обов'язковим"),
//   serName: Yup.string().required("Прізвище є обов'язковим"),
//   phone: Yup.string().required("Телефон є обов'язковим"),
//   email: Yup.string().email("Уведіть валідний email").required("Email є обов'язковим"),
//   area: Yup.string().required("Оберіть область"),
//   city: Yup.string().required("Оберіть місто"),
//   office: Yup.string().required("Оберіть відділення"),
// });

// const BasketContactData = () => {
//   const dispatch = useDispatch();
//   const userData = useSelector(selectUserData) || {
//     name: "",
//     serName: "",
//     phone: "",
//     email: "",
//     area: "",
//     city: "",
//     office: "",
//   };

//   const [locationData, setLocationData] = useState({
//     areas: [],
//     cities: [],
//     offices: [],
//   });

//   const { register, handleSubmit, control, formState: { errors, touchedFields }, setValue } = useForm({
//     resolver: yupResolver(UserRegisterSchema),
//     defaultValues: userData,
//   });

//   // Функції для отримання даних з API
//   const fetchAreas = async () => {
//     const areasData = await getArea();
//     setLocationData(prev => ({ ...prev, areas: areasData }));
//   };

//   const fetchCities = async (areaRef) => {
//     const citiesData = await getCities(areaRef);
//     setLocationData(prev => ({ ...prev, cities: citiesData }));
//   };

//   const fetchOffices = async (city) => {
//     const officesData = await getPostOffice(city);
//     setLocationData(prev => ({ ...prev, offices: officesData }));
//   };

//   // Викликаємо завантаження областей один раз
//   useEffect(() => {
//     fetchAreas();
//   }, []);

//   // Обробники для змін значень
//   const handleAreaChange = (selectedArea) => {
//     const selectedAreaRef = locationData.areas.find(a => a.Description === selectedArea)?.Ref;
//     setValue("area", selectedAreaRef || "");
//     setValue("city", "");
//     setValue("office", "");
//     fetchCities(selectedAreaRef);
//   };

//   const handleCityChange = (selectedCity) => {
//     setValue("city", selectedCity || "");
//     setValue("office", "");
//     fetchOffices(selectedCity);
//   };

//   const onSubmit = (data) => {
//     dispatch(createOrder(data));
//   };

//   return (
//     <div>
//       <h1>Контактні дані</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="name">Ім'я</label>
//           <input
//             id="name"
//             {...register("name")}
//             placeholder="Введіть ім'я"
//           />
//           {touchedFields.name && errors.name && (
//             <div className={css.error}>{errors.name.message}</div>
//           )}
//         </div>
//         <div>
//           <label htmlFor="serName">Прізвище</label>
//           <input
//             id="serName"
//             {...register("serName")}
//             placeholder="Введіть прізвище"
//           />
//           {touchedFields.serName && errors.serName && (
//             <div className={css.error}>{errors.serName.message}</div>
//           )}
//         </div>
//         <div>
//           <label htmlFor="phone">Телефон</label>
//           <Controller
//             control={control}
//             name="phone"
//             render={({ field }) => (
//               <CustomMaskedInput
//                 {...field}
//                 placeholder="Введіть телефон"
//                 mask="+380 (99) 999-9999"
//               />
//             )}
//           />
//           {touchedFields.phone && errors.phone && (
//             <div className={css.error}>{errors.phone.message}</div>
//           )}
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             {...register("email")}
//             placeholder="Введіть email"
//           />
//           {touchedFields.email && errors.email && (
//             <div className={css.error}>{errors.email.message}</div>
//           )}
//         </div>

//         <div>
//           <h1>Адреса доставки</h1>
//           <div>
//             <label htmlFor="area">Область</label>
//             <SelectNovaPoshta
//               options={locationData.areas.map(a => a.Description)}
//               value={locationData.areas.find(a => a.Ref === userData.area)?.Description || ""}
//               onChange={handleAreaChange}
//               placeholder="Виберіть область"
//             />

//             <label htmlFor="city">Місто</label>
//             <SelectNovaPoshta
//               options={locationData.cities}
//               value={userData.city || ""}
//               onChange={handleCityChange}
//               placeholder="Виберіть місто"
//             />

//             <label htmlFor="office">Віділення</label>
//             <SelectNovaPoshta
//               options={locationData.offices}
//               value={userData.office || ""}
//               onChange={(selectedOffice) => setValue("office", selectedOffice || "")}
//               placeholder="Виберіть відділення"
//             />
//           </div>
//         </div>

//         <button
//           className={css.btnLogin}
//           type="submit"
//           disabled={Object.keys(errors).length > 0}
//         >
//           Оформити замовлення
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BasketContactData;
