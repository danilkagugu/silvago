import { FaPhone } from "react-icons/fa";
import css from "./HeaderContacts.module.css";

const HeaderContacts = () => {
  return (
    <div className={css.phones}>
      <div className={css.phonesContainer}>
        <div className={css.phonesItem}>
          <FaPhone className={css.iconPhone} aria-hidden="true" />
          <a
            className={css.phonesItemLink}
            href="tel:+380682825562"
            aria-label={"Зателефонувати за номером +380682825562"}
          >
            +380682825562
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderContacts;
