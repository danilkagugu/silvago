import { useForm } from "react-hook-form";
import css from "./LoginForm.module.css";
import { IoCloseSharp } from "react-icons/io5";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { apiLoginUser } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const LoginForm = ({ openLogin, closeLogin, regFormOn }) => {
  const login = useSelector(selectIsLoggedIn);
  // console.log("login: ", login);
  const dispatch = useDispatch();
  const UserLoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Уведіть валідний email")
      .required("Поле Email є обов'язковим"),
    password: Yup.string()
      .min(6, "Короткий")
      .max(50, "Довгий")
      .required("Поле 'Пароль' є обов'язковим"),
  });

  const INITIAL_FORM_DATA = {
    email: "danil@gmail.com",
    password: "123456789",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(UserLoginSchema),
    defaultValues: INITIAL_FORM_DATA,
  });
  const onLogin = (formData) => {
    dispatch(apiLoginUser(formData));
  };
  const onSubmit = (data) => {
    onLogin(data);
    closeLogin(false);
  };
  return (
    <div className={css.loginContainer}>
      {!login ? (
        <div className={openLogin ? css.login : css.loginHidden}>
          <div className={css.headerLogin}>
            <h2 className={css.tiatleLogin}>Авторизація</h2>
            <IoCloseSharp
              className={css.close}
              onClick={() => {
                closeLogin(false);
              }}
            />
          </div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={css.visuallyHidden} htmlFor="email">
              Email
            </label>
            <input
              className={css.inputForm}
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && touchedFields.email ? (
              <div className={css.error}>{errors.email.message}</div>
            ) : null}
            <label className={css.visuallyHidden} htmlFor="email">
              Пароль
            </label>
            <input
              className={css.inputForm}
              id="password"
              type="password"
              {...register("password")}
              placeholder="Пароль"
            />
            {errors.password && touchedFields.password ? (
              <div className={css.error}>{errors.password.message}</div>
            ) : null}
            <button className={css.btnLogin} type="submit">
              Увійти
            </button>
            <div className={css.formForgot}>
              <p>Забули свій пароль?</p>
            </div>
            <div className={css.formRegisterInfo}>
              <p>Ще немає облікового запису?</p>
              <p
                className={css.registerNow}
                onClick={() => {
                  closeLogin(false);
                  regFormOn();
                }}
              >
                Зареєструйтесь зараз
              </p>
            </div>
          </form>
        </div>
      ) : (
        <p>hwqe</p>
      )}
    </div>
  );
};

export default LoginForm;
