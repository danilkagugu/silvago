import { IoMdCheckmark } from "react-icons/io";
import css from "./BrandFilter.module.css";

const BrandFilter = ({ selectedBrand, handleBrandSelect, brandsCount }) => {
  // console.log('selectedBrand: ', selectedBrand);
  // console.log('brandsCount',brandsCount);

  const renderBrands = () => {
    if (!brandsCount?.length) return null; // Перевірка наявності даних

    return brandsCount.map((brand) => {
      // console.log("brand: ", brand);
      // console.log('brand: ', brand);
      const isSelected = selectedBrand.some(
        (selected) => selected.name === brand.name
      );

      const isDisabled = brand.count === 0;

      const itemClass = `${css.filterBrandItem} ${
        isDisabled ? css.disabledBrandItem : ""
      }`;
      const checkboxClass = `${css.checkbox} ${
        isSelected ? css.activeCheck : ""
      }`;

      return (
        <li
          className={itemClass}
          key={brand.idTorgsoft}
          id={brand.idTorgsoft}
          onClick={() => {
            // console.log("Selected brand:", brand);
            handleBrandSelect(brand); // Переконайтеся, що передаєте тільки `brand.name`
          }}
        >
          <div className={css.filterCheck}>
            <span className={css.label}>
              <span className={checkboxClass}>
                {isSelected && <IoMdCheckmark className={css.iconChek} />}
              </span>
              <span
                className={`${css.filterBrandTitle} ${
                  isSelected ? css.active : ""
                }`}
              >
                {brand.name}
              </span>
              <sup className={css.filterCount}>{brand.count}</sup>
            </span>
          </div>
        </li>
      );
    });
  };
  return (
    <>
      <div className={css.filterSectionTitle}>Бренд</div>
      <div className={css.filterList}>
        <ul className={css.filterBrandList}>{renderBrands()}</ul>
      </div>
    </>
  );
};

export default BrandFilter;
// import { IoMdCheckmark } from "react-icons/io";
// import css from "./BrandFilter.module.css";

// const BrandFilter = ({ selectedBrand, handleBrandSelect, brandsCount }) => {
//   // console.log('selectedBrand: ', selectedBrand);
//   // console.log('brandsCount',brandsCount);

//   const renderBrands = () => {
//     if (!brandsCount?.length) return null; // Перевірка наявності даних

//     return brandsCount.map((brand) => {
//       // console.log("brand: ", brand);
//       // console.log('brand: ', brand);
//       const isSelected = selectedBrand.some(
//         (selected) => selected.name === brand.name
//       );

//       const isDisabled = brand.count === 0;

//       const itemClass = `${css.filterBrandItem} ${
//         isDisabled ? css.disabledBrandItem : ""
//       }`;
//       const checkboxClass = `${css.checkbox} ${
//         isSelected ? css.activeCheck : ""
//       }`;

//       return (
//         <li
//           className={itemClass}
//           key={brand.idTorgsoft}
//           id={brand.idTorgsoft}
//           onClick={() => {
//             // console.log("Selected brand:", brand);
//             handleBrandSelect(brand); // Переконайтеся, що передаєте тільки `brand.name`
//           }}
//         >
//           <div className={css.filterCheck}>
//             <span className={css.label}>
//               <span className={checkboxClass}>
//                 {isSelected && <IoMdCheckmark className={css.iconChek} />}
//               </span>
//               <span className={css.filterBrandTitle}>{brand.name}</span>
//               <sup className={css.filterCount}>{brand.count}</sup>
//             </span>
//           </div>
//         </li>
//       );
//     });
//   };
//   return (
//     <>
//       <div className={css.filterSectionTitle}>Бренд</div>
//       <div className={css.filterList}>
//         <ul className={css.filterBrandList}>{renderBrands()}</ul>
//       </div>
//     </>
//   );
// };

// export default BrandFilter;
