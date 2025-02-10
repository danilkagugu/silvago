// import { Range } from "react-range";
// import css from "./PriceFilter.module.css";
// import { useState, useEffect } from "react";

// const PriceFilter = ({ filterProduct, handlePriceSubmit,selectedPriceRange }) => {
//   console.log('filterProduct: ', filterProduct);
//   const minPrice = filterProduct?.minPrice ; // Встановлюється 0, поки немає даних
//   // console.log('filterProduct: ', filterProduct);
//   const maxPrice = filterProduct?.maxPrice ;
//   const [localRangeValues, setLocalRangeValues] = useState([
//     minPrice,
//     maxPrice,
//   ]);

//   // Оновлюємо значення в локальному стані, коли приходять нові дані з бекенду
//   useEffect(() => {
//     setLocalRangeValues([minPrice, maxPrice]);
//   }, [minPrice, maxPrice]);

//   const currentRange = [
//     selectedPriceRange?.minPrice,
//     selectedPriceRange?.maxPrice ,
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     handlePriceSubmit(localRangeValues);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className={css.filterSectionTitle}>Ціна, грн</div>
//       <div className={css.filterPrice}>
//         <div className={css.filterPriceInputs}>
//           <input
//             className={`${css.field} ${css.filterPriceField}`}
//             type="number"
//             value={localRangeValues[0] ?? ""}
//             onChange={(e) => {
//               const value = Math.max(minPrice, Number(e.target.value));
//               setLocalRangeValues([value, localRangeValues[1]]);
//             }}
//             onBlur={() => {
//               if (localRangeValues[0] === null) {
//                 setLocalRangeValues([minPrice, localRangeValues[1]]);
//               }
//             }}
//           />
//           <i className={css.filterPriceSep} />
//           <input
//             className={`${css.field} ${css.filterPriceField}`}
//             type="number"
//             value={localRangeValues[1] ?? ""}
//             onChange={(e) => {
//               const value = Math.min(maxPrice, Number(e.target.value));
//               setLocalRangeValues([localRangeValues[0], value]);
//             }}
//             onBlur={() => {
//               if (localRangeValues[1] === null) {
//                 setLocalRangeValues([localRangeValues[0], maxPrice]);
//               }
//             }}
//           />
//           <button type="submit" className={css.filterPriceBtn}>
//             <span className={css.btnContent}>ОК</span>
//           </button>
//         </div>

//         {/* Слайдер */}
//         <div className={css.priceSlider}>
//           <Range
//             step={1}
//             min={minPrice}
//             max={maxPrice}
//             values={localRangeValues}
//             onChange={(values) => setLocalRangeValues(values)}
//             renderTrack={({ props, children }) => (
//               <div
//                 {...props}
//                 className={css.sliderTrack}
//                 style={{
//                   ...props.style,
//                   background: `linear-gradient(to right, #ccc 0%, #b22222 ${
//                     ((localRangeValues[0] - minPrice) / (maxPrice - minPrice)) *
//                     100
//                   }%, #b22222 ${
//                     ((localRangeValues[1] - minPrice) / (maxPrice - minPrice)) *
//                     100
//                   }%, #ccc 100%)`,
//                 }}
//               >
//                 {children}
//               </div>
//             )}
//             renderThumb={({ props }) => {
//               const { key, ...restProps } = props;
//               return (
//                 <div key={key} className={css.sliderThumb} {...restProps}></div>
//               );
//             }}
//           />
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PriceFilter;


 
import { Slider, Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import css from "./PriceFilter.module.css";

const PriceFilter = ({ filterProduct, handlePriceSubmit, selectedPriceRange }) => {
  const minPrice = filterProduct?.minPrice || 0;
  const maxPrice = filterProduct?.maxPrice || 10000;

  const [localRangeValues, setLocalRangeValues] = useState([
    selectedPriceRange?.minPrice ?? minPrice,
    selectedPriceRange?.maxPrice ?? maxPrice,
  ]);

  useEffect(() => {
    setLocalRangeValues([selectedPriceRange?.minPrice ?? minPrice, selectedPriceRange?.maxPrice ?? maxPrice]);
  }, [minPrice, maxPrice, selectedPriceRange]);

  const handleSliderChange = (event, newValue) => {
    setLocalRangeValues(newValue);
  };

  const handleInputChange = (index, value) => {
    const updatedValues = [...localRangeValues];
    updatedValues[index] = value;
    setLocalRangeValues(updatedValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePriceSubmit(localRangeValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" className={css.filterSectionTitle}>
        Ціна, грн
      </Typography>

      <Box display="flex" gap={2} alignItems="center" className={css.filterPriceInputs}>
        <TextField
          type="number"
          // label="Мінімум"
          value={localRangeValues[0]}
          onChange={(e) => handleInputChange(0, Math.max(minPrice, Number(e.target.value) || 0))}
          inputProps={{ min: minPrice, max: maxPrice }}
          className={css.filterPriceField}
          sx={{
            width: '80px',           // Ширина інпуту
            '& .MuiInputBase-input': {
              fontSize: '14px',       // Розмір шрифту в інпуті
              padding: '4px 8px',     // Внутрішні відступи
            },
          }}
        />
        <TextField
          type="number"
          // label="Максимум"
          value={localRangeValues[1]}
          onChange={(e) => handleInputChange(1, Math.min(maxPrice, Number(e.target.value) || maxPrice))}
          inputProps={{ min: minPrice, max: maxPrice }}
          className={css.filterPriceField}
          sx={{
            width: '80px',           // Ширина інпуту
            '& .MuiInputBase-input': {
              fontSize: '14px',       // Розмір шрифту в інпуті
              padding: '4px 8px',     // Внутрішні відступи
            },
          }}
        />
        <Button type="submit" variant="contained" className={css.filterPriceBtn}>
          ОК
        </Button>
      </Box>

      <Box mt={2} className={css.priceSlider}>
        <Slider
          value={localRangeValues}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          step={1}
          // marks={[
          //   { value: minPrice, label: `${minPrice} грн` },
          //   { value: maxPrice, label: `${maxPrice} грн` },
          // ]}
          sx={{
            color: 'red',             // Колір слайдера
            '& .MuiSlider-thumb': {
              backgroundColor: 'white', // Колір повзунка
              border: '2px solid red',  // Обведення повзунка
            },
            '& .MuiSlider-track': {
              backgroundColor: '#ff0000', // Колір заповненої частини
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#ccc',    // Колір незаповненої частини
            },
            '& .MuiSlider-markLabel': {
              fontSize: '14px',
              color: '#333',
            },
          }}
        />
      </Box>
    </form>
  );
};

export default PriceFilter;


 