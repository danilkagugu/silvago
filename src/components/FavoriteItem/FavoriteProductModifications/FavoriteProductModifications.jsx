import css from "./FavoriteProductModifications.module.css";

const FavoriteProductModifications = ({
  product,
  volumeDetail,
  handleVolumeChange,
  handleToneChange,
}) => {
  return (
    <>
      <div className={`${css.modification} ${css.modificationCompact}`}>
        <div className={css.modificationHead}>
          <div className={css.modificationTitle}>Об&apos;єм</div>
        </div>

        <div className={css.modificationList}>
          {product &&
            product?.allVariations

              .filter((variant) => variant.tone === volumeDetail?.tone) // Фільтруємо об'єми для поточного тону
              .sort((a, b) => a.volume - b.volume)
              .map((variant) => {
                const isVolumeAvailable = variant.quantity > 0; // Перевіряємо наявність об'єму
                const isCurrentVolume =
                  volumeDetail?.idTorgsoft === variant.idTorgsoft;
                // console.log("isCurrentVolume", isCurrentVolume);
                return (
                  <span
                    className={`${css.btn} ${css.modificationButton} ${
                      isCurrentVolume ? css.modificationButtonActive : ""
                    } ${
                      !isVolumeAvailable && !isCurrentVolume
                        ? css.buttonGray
                        : ""
                    }`}
                    key={variant.idTorgsoft}
                    onClick={() => handleVolumeChange(variant.idTorgsoft)}
                  >
                    {/* {variant.volume} мл */}
                    {`${variant.volume + " " + product.measure}`}
                    {!isVolumeAvailable && (
                      <div className={`${css.tooltipWrapper}`}>
                        <div className={`${css.tooltip} ${css.tooltipTop}`}>
                          Немає в наявності
                        </div>
                      </div>
                    )}
                  </span>
                );
              })}
        </div>
      </div>
      {product.allVariations.some((variant) => variant.tone) && ( // Відображення тільки якщо є тони
        <div className={`${css.modification} ${css.modificationCompact}`}>
          <div className={css.modificationHead}>
            <div className={css.modificationTitle}>Тон</div>
          </div>
          <div className={css.modificationBody}>
            <div className={css.modificationList}>
              {Array.from(
                new Set(product.allVariations.map((variant) => variant.tone))
              )
                .filter((tone) => tone !== null) // Фільтруємо null, якщо є
                .sort((a, b) => a - b) // Сортуємо по зростанню
                .map((uniqueTone) => {
                  // console.log("uniqueTone: ", uniqueTone);
                  const isToneAvailable = product.allVariations.some(
                    (variant) =>
                      variant.tone === uniqueTone &&
                      variant.volume === volumeDetail?.volume &&
                      variant.quantity > 0 // Перевіряємо, чи є товар у наявності
                  );
                  const isCurrentTone = volumeDetail?.tone === uniqueTone;
                  return (
                    <span
                      key={uniqueTone}
                      className={`${css.btn} ${css.modificationButton} ${
                        isCurrentTone ? css.modificationButtonActive : ""
                      } ${
                        !isToneAvailable && !isCurrentTone ? css.buttonGray : ""
                      }`}
                      onClick={() => handleToneChange(uniqueTone)}
                    >
                      {uniqueTone}
                      {!isToneAvailable && (
                        <div className={`${css.tooltipWrapper}`}>
                          <div className={`${css.tooltip}   `}>
                            Немає в наявності
                          </div>
                        </div>
                      )}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteProductModifications;
