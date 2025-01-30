import { Range } from "react-range";
import css from "./PriceFilter.module.css";
import { useState, useEffect } from "react";

const PriceFilter = ({ minPrice, maxPrice, onSubmit, setRangeValues }) => {
  const DEFAULT_MIN = 1; // Мінімальна ціна за замовчуванням
  const DEFAULT_MAX = 100; // Максимальна ціна за замовчуванням

  const effectiveMinPrice = minPrice < maxPrice ? minPrice : DEFAULT_MIN;
  const effectiveMaxPrice = maxPrice > minPrice ? maxPrice : DEFAULT_MAX;

  const [localRangeValues, setLocalRangeValues] = useState([
    effectiveMinPrice,
    effectiveMaxPrice,
  ]);

  useEffect(() => {
    setLocalRangeValues([effectiveMinPrice, effectiveMaxPrice]);
  }, [effectiveMinPrice, effectiveMaxPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(localRangeValues);
    }
  };

  const STEP = 1;

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
              const value =
                e.target.value === ""
                  ? null
                  : Math.max(effectiveMinPrice, +e.target.value);
              setLocalRangeValues([value, localRangeValues[1]]);
            }}
            onBlur={() => {
              if (localRangeValues[0] === null) {
                setLocalRangeValues([effectiveMinPrice, localRangeValues[1]]);
              }
            }}
          />
          <i className={css.filterPriceSep} />
          <input
            className={`${css.field} ${css.filterPriceField}`}
            type="number"
            value={localRangeValues[1] ?? ""}
            onChange={(e) => {
              const value =
                e.target.value === ""
                  ? null
                  : Math.min(effectiveMaxPrice, +e.target.value);
              setLocalRangeValues([localRangeValues[0], value]);
            }}
            onBlur={() => {
              if (localRangeValues[1] === null) {
                setLocalRangeValues([localRangeValues[0], effectiveMaxPrice]);
              }
            }}
          />
          <button
            type="submit"
            className={css.filterPriceBtn}
            onClick={() => setRangeValues(localRangeValues)}
          >
            <span className={css.btnContent}>ОК</span>
          </button>
        </div>

        {/* Слайдер */}
        <div className={css.priceSlider}>
          <Range
            step={STEP}
            min={effectiveMinPrice}
            max={effectiveMaxPrice}
            values={localRangeValues}
            onChange={(values) => setLocalRangeValues(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className={css.sliderTrack}
                style={{
                  ...props.style,
                  background: `linear-gradient(to right, #ccc 0%, #b22222 ${
                    ((localRangeValues[0] - effectiveMinPrice) /
                      (effectiveMaxPrice - effectiveMinPrice)) *
                    100
                  }%, #b22222 ${
                    ((localRangeValues[1] - effectiveMinPrice) /
                      (effectiveMaxPrice - effectiveMinPrice)) *
                    100
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
