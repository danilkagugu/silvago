import css from "./ProductVolumeTone.module.css";

const ProductVolumeTone = ({
  product,
  volume,
  handleVolumeChange,
  handleToneChange,
}) => {
  return (
    <section
      className={`${css.productSection} ${css.productSectionModifications}`}
    >
      <div className={css.productModifications}>
        <div className={css.modification}>
          <div className={css.modificationTop}>
            <p className={css.modificationTitle}>Об&apos;єм</p>
          </div>
          <div className={css.modificationMain}>
            <div className={css.modificationList}>
              {product.variations
                .filter((variant) => variant.tone === volume.tone) // Фільтруємо об'єми для поточного тону
                .sort((a, b) => a.volume - b.volume)
                .map((variant) => {
                  const isVolumeAvailable = variant.quantity > 0; // Перевіряємо наявність об'єму
                  const isCurrentVolume =
                    volume?.idTorgsoft === variant.idTorgsoft;

                  return (
                    <button
                      key={variant.idTorgsoft}
                      className={`${css.btn} ${css.modificationButton} ${
                        isCurrentVolume ? css.modificationButtonActive : ""
                      } ${
                        !isVolumeAvailable && !isCurrentVolume
                          ? css.modificationButtonStockout
                          : ""
                      }`}
                      onClick={() => handleVolumeChange(variant.idTorgsoft)}
                    >
                      {`${variant.volume + " " + product.measure}`}
                      {!isVolumeAvailable && (
                        <div className={`${css.tooltipWrapper}`}>
                          <div className={`${css.tooltip}  `}>
                            Немає в наявності
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {product.variations.some((variant) => variant.tone) && (
          <div className={css.modification}>
            <div className={css.modificationTop}>
              <p className={css.modificationTitle}>Тон</p>
            </div>
            <div className={css.modificationMain}>
              <div className={css.modificationList}>
                {Array.from(
                  new Set(product.variations.map((variant) => variant.tone))
                )
                  .filter((tone) => tone !== null) // Фільтруємо null, якщо є
                  .sort((a, b) => a - b) // Сортуємо по зростанню
                  .map((uniqueTone) => {
                    const isToneAvailable = product.variations.some(
                      (variant) =>
                        variant.tone === uniqueTone &&
                        variant.volume === volume.volume &&
                        variant.quantity > 0 // Перевіряємо, чи є товар у наявності
                    );
                    const isCurrentTone = volume?.tone === uniqueTone;
                    return (
                      <button
                        key={uniqueTone}
                        className={`${css.btn} ${css.modificationButton} ${
                          volume?.tone === uniqueTone
                            ? css.modificationButtonActive
                            : ""
                        }${
                          !isToneAvailable && !isCurrentTone
                            ? css.modificationButtonStockout
                            : ""
                        }`}
                        onClick={() => handleToneChange(uniqueTone)}
                      >
                        {parseInt(uniqueTone.match(/\d+/)[0])}
                        {!isToneAvailable && (
                          <div className={`${css.tooltipWrapper}`}>
                            <div className={`${css.tooltip}   `}>
                              Немає в наявності
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductVolumeTone;
