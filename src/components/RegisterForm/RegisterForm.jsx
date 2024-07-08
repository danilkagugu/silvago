import css from "./RigisterForm.module.css";
import { IoCloseSharp } from "react-icons/io5";
import CustomMaskedInput from "./CustomMaskedInput";

const RegisterForm = ({ openLogin, closeLogin, loginFormOn }) => {
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
        <form className={css.form}>
          <label className={css.visuallyHidden} htmlFor="name">
            Імя
          </label>
          <input
            className={css.inputForm}
            id="name"
            type="text"
            placeholder="Ім'я"
          />
          <label className={css.visuallyHidden} htmlFor="surname">
            Прізвище
          </label>
          <input
            className={css.inputForm}
            id="surname"
            type="text"
            placeholder="Прізвище"
          />
          <label className={css.visuallyHidden} htmlFor="phone">
            Мобільний телефон
          </label>
          <CustomMaskedInput
            className={css.inputForm}
            id="phone"
            type="text"
            placeholder="Мобільний телефон"
          />
          <label className={css.visuallyHidden} htmlFor="email">
            Email
          </label>
          <input
            className={css.inputForm}
            id="email"
            type="email"
            placeholder="Email"
          />
          <label className={css.visuallyHidden} htmlFor="password">
            Пароль
          </label>
          <input
            className={css.inputForm}
            id="password"
            type="password"
            placeholder="Пароль"
          />
          <label className={css.visuallyHidden} htmlFor="repeat-password">
            Підтвердити пароль
          </label>
          <input
            className={css.inputForm}
            id="repeat-password"
            type="password"
            placeholder="Підтвердити пароль"
          />
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
