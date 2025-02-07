import { Range } from "react-range";
import css from "./PriceFilter.module.css";
import { useState, useEffect } from "react";

const PriceFilter = ({ filterProduct, onSubmit }) => {

  const minPrice = filterProduct?.minPrice ?? 0;  // Встановлюється 0, поки немає даних
  // console.log('filterProduct: ', filterProduct);
  const maxPrice = filterProduct?.maxPrice ?? 1000 ;
  const [localRangeValues, setLocalRangeValues] = useState([minPrice, maxPrice]);

  // Оновлюємо значення в локальному стані, коли приходять нові дані з бекенду
  useEffect(() => {
    setLocalRangeValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(localRangeValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.filterSectionTitle}>Ціна, грн</div>
      <div className={css.filterPrice}>
        <div className={css.filterPriceInputs}>
          <input
            className={`${css.field} ${css.filterPriceField}`}
            type="number"
            value={localRangeValues[0] ?? ""}
            onChange={(e) => {
              const value = Math.max(minPrice, Number(e.target.value));
              setLocalRangeValues([value, localRangeValues[1]]);
            }}
            onBlur={() => {
              if (localRangeValues[0] === null) {
                setLocalRangeValues([minPrice, localRangeValues[1]]);
              }
            }}
          />
          <i className={css.filterPriceSep} />
          <input
            className={`${css.field} ${css.filterPriceField}`}
            type="number"
            value={localRangeValues[1] ?? ""}
            onChange={(e) => {
              const value = Math.min(maxPrice, Number(e.target.value));
              setLocalRangeValues([localRangeValues[0], value]);
            }}
            onBlur={() => {
              if (localRangeValues[1] === null) {
                setLocalRangeValues([localRangeValues[0], maxPrice]);
              }
            }}
          />
          <button type="submit" className={css.filterPriceBtn}>
            <span className={css.btnContent}>ОК</span>
          </button>
        </div>

        {/* Слайдер */}
        <div className={css.priceSlider}>
          <Range
            step={1}
            min={minPrice}
            max={maxPrice}
            values={localRangeValues}
            onChange={(values) => setLocalRangeValues(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className={css.sliderTrack}
                style={{
                  ...props.style,
                  background: `linear-gradient(to right, #ccc 0%, #b22222 ${
                    ((localRangeValues[0] - minPrice) / (maxPrice - minPrice)) * 100
                  }%, #b22222 ${
                    ((localRangeValues[1] - minPrice) / (maxPrice - minPrice)) * 100
                  }%, #ccc 100%)`,
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div key={key} className={css.sliderThumb} {...restProps}></div>
              );
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default PriceFilter;
