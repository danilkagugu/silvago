import css from "./LoginForm.module.css";
import { IoCloseSharp } from "react-icons/io5";

const LoginForm = ({ openLogin, closeLogin }) => {
  return (
    <div className={css.loginContainer}>
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
        <form className={css.form}>
          <label className={css.visuallyHidden} htmlFor="email">
            Email
          </label>
          <input
            className={css.inputForm}
            id="email"
            type="email"
            placeholder="Email"
          />

          <label className={css.visuallyHidden} htmlFor="email">
            Пароль
          </label>
          <input
            className={css.inputForm}
            id="password"
            type="password"
            placeholder="Пароль"
          />

          <button className={css.btnLogin} type="submit">
            Увійти
          </button>
          <div className={css.formForgot}>
            <p>Забули свій пароль?</p>
          </div>
          <div className={css.formRegisterInfo}>
            <p>Ще немає облікового запису?</p>
            <p className={css.registerNow}>Зареєструйтесь зараз</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
