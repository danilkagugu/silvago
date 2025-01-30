import css from "./RigisterForm.module.css";
import { IoCloseSharp } from "react-icons/io5";
import CustomMaskedInput from "./CustomMaskedInput";
import { requestSignUp } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ✅ Валідаційна схема Yup
const UserRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Поле 'Ім'я' є обов'язковим")
    .min(2, "Занадто коротке ім'я"),
  lastName: Yup.string()
    .required("Поле 'Прізвище' є обов'язковим")
    .min(2, "Занадто коротке прізвище"),
  middleName: Yup.string().optional().max(20, "Занадто довге по батькові"),
  phone: Yup.string()
    // .matches(/^\+?[0-9]{7,15}$/, "Введіть коректний телефонний номер")
    .required("Поле 'Телефон' є обов'язковим"),
  email: Yup.string()
    .email("Уведіть валідний email")
    .required("Поле 'Email' є обов'язковим"),
  password: Yup.string()
    .min(6, "Короткий пароль (мінімум 6 символів)")
    .max(50, "Довгий пароль")
    .required("Поле 'Пароль' є обов'язковим"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролі різні")
    .required("Поле 'Підтвердити пароль' є обов'язковим"),
});

const INITIAL_FORM_DATA = {
  firstName: "Данило",
  lastName: "Янішевський",
  middleName: "",
  phone: "380506863801",
  email: "danulo1@gmail.com",
  password: "123456789",
  repeatPassword: "123456789",
};

const RegisterForm = ({ openLogin, closeLogin, loginFormOn }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
    defaultValues: INITIAL_FORM_DATA,
  });

  const normalizePhoneNumber = (phone) => {
    return phone.replace(/\D/g, ""); // Видаляє всі символи, які не є цифрами
  };

  const onSubmit = async (data) => {
    try {
      const cleanedPhone = normalizePhoneNumber(data.phone);
      const { repeatPassword, ...formData } = data; // Видаляємо підтвердження пароля
      const response = await requestSignUp({
        ...formData,
        phone: cleanedPhone,
      });
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log("Помилка реєстрації клієнта:", error);
    }
    closeLogin(false);
  };

  return (
    <div className={css.registerContainer}>
      <div className={openLogin ? css.register : css.registerHidden}>
        <div className={css.headerLogin}>
          <h2 className={css.titleRegister}>Зареєструватись</h2>
          <IoCloseSharp
            className={css.close}
            onClick={() => closeLogin(false)}
          />
        </div>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.visuallyHidden} htmlFor="firstName">
            Ім&apos;я
          </label>
          <input
            className={css.inputForm}
            id="firstName"
            type="text"
            {...register("firstName")}
            placeholder="Ім'я"
          />
          {errors.firstName && (
            <div className={css.error}>{errors.firstName.message}</div>
          )}

          <label className={css.visuallyHidden} htmlFor="lastName">
            Прізвище
          </label>
          <input
            className={css.inputForm}
            id="lastName"
            type="text"
            {...register("lastName")}
            placeholder="Прізвище"
          />
          {errors.lastName && (
            <div className={css.error}>{errors.lastName.message}</div>
          )}

          <label className={css.visuallyHidden} htmlFor="middleName">
            По батькові
          </label>
          <input
            className={css.inputForm}
            id="middleName"
            type="text"
            {...register("middleName")}
            placeholder="По батькові (необов'язково)"
          />
          {errors.middleName && (
            <div className={css.error}>{errors.middleName.message}</div>
          )}

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
          {errors.phone && (
            <div className={css.error}>{errors.phone.message}</div>
          )}

          <input
            className={css.inputForm}
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <div className={css.error}>{errors.email.message}</div>
          )}

          <input
            className={css.inputForm}
            id="password"
            type="password"
            {...register("password")}
            placeholder="Пароль"
          />
          {errors.password && (
            <div className={css.error}>{errors.password.message}</div>
          )}

          <input
            className={css.inputForm}
            id="repeat-password"
            type="password"
            {...register("repeatPassword")}
            placeholder="Підтвердити пароль"
          />
          {errors.repeatPassword && (
            <div className={css.error}>{errors.repeatPassword.message}</div>
          )}

          <button className={css.btnRegister} type="submit">
            Реєстрація
          </button>

          <div className={css.formLoginInfo}>
            <p>Вже є аккаунт?</p>
            <p
              className={css.loginNow}
              onClick={() => {
                closeLogin(false);
                loginFormOn();
              }}
            >
              Увійти на сайт
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
