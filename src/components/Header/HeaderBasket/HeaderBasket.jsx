import { BsBasket } from "react-icons/bs";
import css from "./HeaderBasket.module.css";
import { useState } from "react";
import ModalBasket from "../../ModalBasket/ModalBasket";

const HeaderBasket = ({ totalPrice, allQuantity, login }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={css.basket}>
        <div
          className={css.basketBox}
          onClick={() => {
            if (allQuantity > 0 && login) {
              openModal();
            }
          }}
        >
          <div className={css.basketIcon}>
            <BsBasket className={css.basketIconSvg} />
            {login && <div className={css.basketItemsCount}>{allQuantity}</div>}
          </div>
          <div className={css.basketContents}>
            <div className={css.basketTitle}>Мій Кошик</div>
            {totalPrice > 0 && login && (
              <div className={css.basketValue}>{totalPrice} грн</div>
            )}
          </div>
        </div>
      </div>
      <ModalBasket closeModal={closeModal} open={open} />
    </>
  );
};

export default HeaderBasket;
