import css from "./ProductVolumeTone.module.css";

const ProductVolumeTone = ({
  product,
  volume,
  handleVolumeChange,
  handleToneChange,
}) => {
  return (
    <div className={css.productGroupItem}>
      <div className={css.productVolumesContainer}>
        <div className={css.productVolumes}>
          <div className={css.volumesTop}>
            <p className={css.volumesTitle}>Об&apos;єм</p>
          </div>
          <div className={css.volumesBottom}>
            <div className={css.volumesList}>
              {product.variations
                .filter((variant) => variant.tone === volume.tone) // Фільтруємо об'єми для поточного тону
                .sort((a, b) => a.volume - b.volume)
                .map((variant) => {
                  const isVolumeAvailable = variant.quantity > 0; // Перевіряємо наявність об'єму
                  const isCurrentVolume =
                    volume?.idTorgsoft === variant.idTorgsoft;

                    console.log('measure',product.measure);
                  return (
                    <button
                      key={variant.idTorgsoft}
                      className={`${css.volumeButton} ${
                        isCurrentVolume ? css.selected : ""
                      } ${
                        !isVolumeAvailable && !isCurrentVolume
                          ? css.buttonGray
                          : ""
                      }`}
                      onClick={() =>
                        handleVolumeChange(product._id, variant.idTorgsoft)
                      }
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
      </div>

      {product.variations.some((variant) => variant.tone) && (
        <>
          <div className={css.volumesTop}>
            <p className={css.volumesTitle}>Тон</p>
          </div>
          <div className={css.volumesBottom}>
            <div className={css.volumesList}>
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
                      className={`${css.volumeButton} ${
                        volume?.tone === uniqueTone ? css.selected : ""
                      }${
                        !isToneAvailable && !isCurrentTone ? css.buttonGray : ""
                      }`}
                      onClick={() => handleToneChange(product._id, uniqueTone)}
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
        </>
      )}
    </div>
  );
};

export default ProductVolumeTone;
