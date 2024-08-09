import { useEffect, useState } from "react";
import css from "./SelectNovaPoshta.module.css";

const SelectNovaPoshta = ({ options, onChange, placeholder, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value || "");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [options, search]);

  useEffect(() => {
    setSearch(value || ""); // Update search when value changes
  }, [value]);

  return (
    <div className={css.selectContainer}>
      <input
        className={css.searchInput}
        type="text"
        placeholder={placeholder}
        value={search}
        onClick={handleToggle}
        onChange={handleSearchChange}
      />
      {isOpen && (
        <div className={css.optionsContainer}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={css.option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className={css.option}>Нічого не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectNovaPoshta;

// import { useEffect, useState } from "react";
// import css from "./SelectNovaPoshta.module.css";

// const SelectNovaPoshta = ({ options, onChange, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filteredOptions, setFilteredOptions] = useState(options);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//     onChange(option);
//     setSearch(option);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (e) => {
//     const searchValue = e.target.value;
//     setSearch(searchValue);
//     setFilteredOptions(
//       options.filter((option) =>
//         option.toLowerCase().includes(searchValue.toLowerCase())
//       )
//     );
//   };
//   useEffect(() => {
//     setFilteredOptions(options);
//   }, [options]);
//   return (
//     <div className={css.selectContainer}>
//       <input
//         className={css.searchInput}
//         type="text"
//         placeholder={placeholder}
//         value={search}
//         onClick={handleToggle}
//         onChange={handleSearchChange}
//       />
//       {isOpen && (
//         <div className={css.optionsContainer}>
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((option, index) => (
//               <div
//                 key={index}
//                 className={css.option}
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {option}
//               </div>
//             ))
//           ) : (
//             <div className={css.option}>Нічого не знайдено</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectNovaPoshta;

// import { useEffect, useState } from "react";
// import css from "./SelectNovaPoshta.module.css";

// const SelectNovaPoshta = ({ options, onChange, placeholder, value }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filteredOptions, setFilteredOptions] = useState(options);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//     onChange(option);
//     setSearch(option);
//     setIsOpen(false);
//   };

//   const handleSearchChange = (e) => {
//     const searchValue = e.target.value;
//     setSearch(searchValue);
//     setFilteredOptions(
//       options.filter((option) =>
//         option.toLowerCase().includes(searchValue.toLowerCase())
//       )
//     );
//   };

//   useEffect(() => {
//     setFilteredOptions(options);
//   }, [options]);

//   return (
//     <div className={css.selectContainer}>
//       <div className={css.selectionBox} onClick={handleToggle}>
//         <input
//           className={css.searchInput}
//           type="text"
//           placeholder={placeholder}
//           value={search}
//           readOnly
//         />
//       </div>
//       {isOpen && (
//         <div className={css.dropdownContainer}>
//           <input
//             className={css.searchBox}
//             type="text"
//             placeholder="Пошук..."
//             value={search}
//             onChange={handleSearchChange}
//           />
//           <div className={css.optionsContainer}>
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((option, index) => (
//                 <div
//                   key={index}
//                   className={css.option}
//                   onClick={() => handleOptionClick(option)}
//                 >
//                   {option}
//                 </div>
//               ))
//             ) : (
//               <div className={css.option}>Нічого не знайдено</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectNovaPoshta;
