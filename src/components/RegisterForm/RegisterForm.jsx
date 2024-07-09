import css from "./RigisterForm.module.css";
import { IoCloseSharp } from "react-icons/io5";
import CustomMaskedInput from "./CustomMaskedInput";
import { requestSignUp } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

const INITIAL_FORM_DATA = {
  name: "Danulo",
  serName: "Yanishevskiy",
  phone: "+380506863801",
  email: "danil@gmail.com",
  password: "123456789",
  repeatPassword: "123456789",
};

const RegisterForm = ({ openLogin, closeLogin, loginFormOn }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(UserRegisterSchema),
    defaultValues: INITIAL_FORM_DATA,
  });
  const onSubmit = async (data) => {
    try {
      const response = await requestSignUp(data);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
            onClick={() => {
              closeLogin(false);
            }}
          />
        </div>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
          <label className={css.visuallyHidden} htmlFor="password">
            Пароль
          </label>
          <input
            className={`${css.inputForm}`}
            id="password"
            type="password"
            {...register("password")}
            placeholder="Пароль"
          />
          {errors.password && touchedFields.password ? (
            <div className={css.error}>{errors.password.message}</div>
          ) : null}
          <label className={css.visuallyHidden} htmlFor="repeat-password">
            Підтвердити пароль
          </label>
          <input
            className={`${css.inputForm} `}
            id="repeat-password"
            type="password"
            {...register("repeatPassword")}
            placeholder="Підтвердити пароль"
          />
          {errors.repeatPassword && touchedFields.repeatPassword ? (
            <div className={css.error}>{errors.repeatPassword.message}</div>
          ) : null}
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
