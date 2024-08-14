import { useEffect, useState, useRef } from "react";
import css from "./SelectNovaPoshta.module.css";

const SelectNovaPoshta = ({ options = [], onChange, placeholder, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const optionsContainerRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearch(""); // Скидаємо пошуковий рядок при відкритті списку
    setFilteredOptions(options); // Показуємо всі опції при відкритті списку
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setSearch(option);
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  useEffect(() => {
    if (Array.isArray(options)) {
      setFilteredOptions(
        options.filter(
          (option) =>
            option && option.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      console.error(
        "Options is not an array or contains undefined values:",
        options
      );
    }
  }, [options, search]);

  useEffect(() => {
    setSearch(value || ""); // Оновлюємо пошук при зміні значення
  }, [value]);

  useEffect(() => {
    if (isOpen && value) {
      const selectedOptionIndex = filteredOptions.findIndex(
        (option) => option === value
      );
      if (selectedOptionIndex !== -1 && optionsContainerRef.current) {
        const optionHeight = 40; // Приблизна висота одного елемента опції
        optionsContainerRef.current.scrollTop =
          selectedOptionIndex * optionHeight;
      }
    }
  }, [isOpen, value, filteredOptions]);

  return (
    <div className={css.selectContainer}>
      <input
        className={css.searchInput}
        type="text"
        placeholder={placeholder}
        value={value || ""}
        onClick={handleToggle}
        readOnly
      />
      {isOpen && (
        <div className={css.optionsContainer} ref={optionsContainerRef}>
          <input
            className={css.dropdownSearchInput}
            type="text"
            placeholder="Пошук..."
            value={search}
            onChange={handleSearchChange}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) =>
              option ? (
                <div
                  key={index}
                  className={css.option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ) : null
            )
          ) : (
            <div className={css.option}>Нічого не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectNovaPoshta;
