import novaPoshta from "../../../assets/img/novaPoshta.png";
import css from "./ProductAdditionalInfoTabs.module.css";

const ProductAdditionalInfoTabs = ({
  tabsInfo,
  descriptionInfoTab,
  setDescriptionInfoTab,
}) => {
  return (
    <div className={css.productGroup}>
      <div className={css.headerInfoTabs}>
        <nav className={css.headerInfoNav}>
          {tabsInfo.map((tab) => (
            <p
              key={tab}
              className={`${css.descriptionNavTab} ${
                descriptionInfoTab === tab ? css.tabActive : ""
              }`}
              onClick={() => setDescriptionInfoTab(tab)}
            >
              {tab}
            </p>
          ))}
        </nav>
      </div>
      {descriptionInfoTab === "Доставка" && (
        <div className={css.deliveryContainer}>
          <div className={css.text}>
            <p>
              <a href="https://novaposhta.ua/" target="blank">
                <img
                  className={css.imgNP}
                  src={novaPoshta}
                  alt="Нова Пошта"
                  height={50}
                  width={126}
                />
              </a>
            </p>
            <p>
              &nbsp;Відправка замовлень здійснюється в день замовлення (якщо
              замовлення оформлене до 17:00, після 17:00 - на наступний день).
              Відправки робимо кожного дня, без вихідних.
            </p>
            <p>
              <strong>&nbsp;Безкоштовна доставка</strong> на замовлення від 1200
              грн. (при повній оплаті замовлення)
            </p>
          </div>
        </div>
      )}
      {descriptionInfoTab === "Оплата" && (
        <div className={css.deliveryContainer}>
          <div className={css.text}>Оплата</div>
        </div>
      )}
      {descriptionInfoTab === "Гарантія" && (
        <div className={css.deliveryContainer}>
          <div className={css.text}>Гарантія</div>
        </div>
      )}
      {descriptionInfoTab === "Повернення" && (
        <div className={css.deliveryContainer}>
          <div className={css.text}>Повернення</div>
        </div>
      )}
      {descriptionInfoTab === "Консультація" && (
        <div className={css.deliveryContainer}>
          <div className={css.text}>Консультація</div>
        </div>
      )}
    </div>
  );
};

export default ProductAdditionalInfoTabs;
