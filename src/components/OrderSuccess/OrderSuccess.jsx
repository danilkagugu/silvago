import { useNavigate } from "react-router-dom";
import css from "./OrderSuccess.module.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };
  return (
    <div className={css.successContainer}>
      <div className={css.successWrapper}>
        <h2 className={css.titleSuccess}>Ваше замовлення успішно оформлено!</h2>
        <p className={css.textSuccess}>
          Дякуємо за покупку! Ви можете продовжити покупки або переглянути
          статус замовлення у своєму кабінеті.
        </p>
        <button className={css.btnSuccess} onClick={handleContinueShopping}>
          Продовжити покупки
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
