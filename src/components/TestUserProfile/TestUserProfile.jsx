import css from "./TestUserProfile.module.css";
const TestUserProfile = () => {
  return (
    <div>
      <h1>Особисті Дані</h1>
      <div>
        <form action="">
          <dl className={css.form}>
            <dt className={css.formHead}>Ім&apos;я та прізвище</dt>
            <dd className={css.formItem}>
              <input className={css.field} type="text" />
            </dd>
            <dt className={css.formHead}>Е-пошта</dt>
            <dd className={css.formItem}>
              <input className={css.field} type="email" />
            </dd>
            <dt className={css.formHead}>Телефон</dt>
            <dd className={css.formItem}>
              <input className={css.field} type="text" />
            </dd>
            <dt className={css.formHead}>Область</dt>
            <dd className={css.formItem}>
              <input className={css.field} type="text" />
            </dd>
            <dt className={css.formHead}>Місто</dt>
            <dd className={css.formItem}>
              <input className={css.field} type="text" />
            </dd>
            <dt className={css.formHead}>Адреса</dt>
            <dd className={css.formItem}>
              <input className={css.field} type="text" />
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
        </form>
      </div>
    </div>
  );
};

export default TestUserProfile;
