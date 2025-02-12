import css from "./SilvagoBanner.module.css";

const SilvagoBanner = () => {
  return (
    <div className={css.silvagoBanner}>
      <div className={css.silvagoBannerContainer}>
        <div className={css.silvagoBannerText}>
          Безкоштовна доставка від 1200 грн ❤ Відправлення замовлення щодня
        </div>
      </div>
    </div>
  );
};

export default SilvagoBanner;
