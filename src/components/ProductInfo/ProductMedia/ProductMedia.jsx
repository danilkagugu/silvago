import css from "./ProductMedia.module.css";
import ProductPhotoCarusel from "./ProductPhotoCarusel/ProductPhotoCarusel";

const ProductMedia = ({ volume, brand, handleBrandClick }) => {
  return (
    <div className={css.productColumnContainer}>
      <div className={css.productGallery}>
        <div className={css.galerry}>
          <div className={css.titlePhoto}>
            {volume && volume && (
              <div className={css.titlePhotoContainer}>
                <ProductPhotoCarusel images={volume && volume?.images} />
              </div>
            )}

            {brand && brand.length > 0 && (
              <span
                className={css.logoBrand}
                onClick={() => {
                  handleBrandClick(brand[0].name);
                }}
              >
                <img
                  className={css.imageBrand}
                  src={brand[0].image}
                  alt={brand[0].name}
                  width={60}
                  height={60}
                />
              </span>
            )}
          </div>
          <div className={css.photoCarusel}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductMedia;
