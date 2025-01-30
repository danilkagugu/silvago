// import { useEffect, useRef, useMemo } from "react";
// import css from "./SelectNovaPoshta.module.css";

// const SelectNovaPoshta = ({
//   options = [],
//   onChange,
//   value,
//   isOpen,
//   onToggle,
//   search,
//   setSearch,
// }) => {
//   const optionsContainerRef = useRef(null);

//   const handleOptionClick = (option) => {
//     onChange(option);
//     setSearch(option.Description);
//     onToggle();
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const filteredOptions = useMemo(() => {
//     if (!Array.isArray(options)) {
//       console.error(
//         "Options is not an array or contains undefined values:",
//         options
//       );
//       return [];
//     }

//     const lowerCaseSearch = search.toLowerCase();

//     const exactMatches = options.filter(
//       (option) =>
//         option.Description &&
//         option.Description.toLowerCase().startsWith(lowerCaseSearch)
//     );

//     const partialMatches = options.filter(
//       (option) =>
//         option.Description &&
//         !option.Description.toLowerCase().startsWith(lowerCaseSearch) &&
//         option.Description.toLowerCase().includes(lowerCaseSearch)
//     );

//     // Об'єднуємо результати: точні збіги йдуть першими
//     return [...exactMatches, ...partialMatches];
//   }, [options, search]);

//   useEffect(() => {
//     setSearch(value || "");
//   }, [value]);

//   useEffect(() => {
//     if (isOpen && value) {
//       const selectedOptionIndex = filteredOptions.findIndex(
//         (option) => option.Description === value
//       );
//       if (selectedOptionIndex !== -1 && optionsContainerRef.current) {
//         const optionHeight = 40;
//         optionsContainerRef.current.scrollTop =
//           selectedOptionIndex * optionHeight;
//       }
//     }
//   }, [isOpen, value, filteredOptions]);

//   return (
//     <>
//       <span
//         className={css.selectboxitContainer}
//         ref={optionsContainerRef}
//         aria-expanded={isOpen}
//         role="combobox"
//         onClick={onToggle}
//       >
//         <span className={css.selectboxit}>
//           <span className={css.selectboxitOptionIconContainer}>
//             <i className={css.selectboxitContainer}></i>
//           </span>
//           <span className={css.selectboxitText}>{value}</span>
//           <span className={css.selectboxitArrowContainer}>
//             <i className={css.selectboxitDefaultArrow}></i>
//           </span>
//         </span>
//         <div
//           className={css.selectboxitDropdown}
//           role="listbox"
//           style={{ display: isOpen ? "block" : "none" }}
//         >
//           <div className={css.selectboxitSearchContainer}>
//             <input
//               className={css.selectboxitSearchField}
//               type="text"
//               placeholder="Пошук..."
//               value={search}
//               onChange={handleSearchChange}
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>
//           <ul className={css.selectboxitOptions}>
//             {filteredOptions.length > 0 &&
//               filteredOptions.map((option) => (
//                 <li
//                   key={option.Ref}
//                   className={css.selectboxitFocus}
//                   onClick={() => handleOptionClick(option)}
//                   value={option.Ref}
//                 >
//                   <p className={css.selectboxitOptionAnchor}>
//                     {option.Description}
//                   </p>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </span>
//     </>
//   );
// };

// export default SelectNovaPoshta;
