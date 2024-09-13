import { useNavigate } from "react-router-dom";
import css from "./FavoriteItem.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { addProduct } from "../../redux/basket/operations";
import { useDispatch } from "react-redux";

const FavoriteItem = ({
  product,
  selectedVolume,
  handleRemoveFavorite,
  quantities,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const volumeDetail = product.volumes.find(
    (vol) => vol.volume === selectedVolume[product._id]
  );
  const getPrice = () => {
    const volume = selectedVolume[product._id];
    const volumeDetail = product.volumes.find((vol) => vol.volume === volume);
    const defaultVolume = product.volumes[0];

    const newPrice = volumeDetail
      ? volumeDetail.price * (1 - volumeDetail.discount / 100)
      : defaultVolume
      ? defaultVolume.price * (1 - defaultVolume.discount / 100)
      : 0;
    const oldPrice = volumeDetail
      ? volumeDetail.price
      : defaultVolume
      ? defaultVolume.price
      : 0;

    return { newPrice, oldPrice };
  };

  const handleAddToBasket = () => {
    dispatch(
      addProduct({
        slug: volumeDetail.slug,
        quantity: quantities[product._id],
        volume: selectedVolume[product._id],
        price: volumeDetail.price,
      })
    );
  };

  const handleProductClick = () => {
    navigate(`/product/${volumeDetail.slug}`);
  };
  return (
    <>
      <div className={css.cardContainer}>
        <div className={css.cardContainerBox}>
          <IoCloseSharp
            className={css.iconDelete}
            onClick={() => {
              handleRemoveFavorite(product.product);
            }}
          />

          <div className={css.cardBox}>
            <div className={css.catalogCardHeader} onClick={handleProductClick}>
              <div className={css.catalogCardTop}>
                <div className={css.catalogCardImage}>
                  <div className={css.imgBox}>
                    <img
                      className={css.catalogCardImgProduct}
                      src={product.image}
                      alt={product.productName}
                    />
                  </div>
                </div>
                <div className={css.catalogCardInfo}>
                  <div className={css.catalogCardTitle}>
                    <p>{product.productName}</p>
                  </div>
                  <div className={css.catalogCardPriceBox}>
                    {product.volumes.some((vol) => vol.discount > 0) && (
                      <>
                        <div className={css.catalogCardPriceOld}>
                          {getPrice().oldPrice} грн
                        </div>
                        <div className={css.catalogCardPrice}>
                          {Math.ceil(getPrice().newPrice)} грн
                        </div>
                      </>
                    )}
                    {!product.volumes.some((vol) => vol.discount > 0) && (
                      <div className={css.catalogCardPrice}>
                        {getPrice().oldPrice} грн
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={css.catalogCardFooter}>
              <div className={css.catalogCardFooterBtn}>
                <button className={css.buyButton} onClick={handleAddToBasket}>
                  Купити
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.catalogCardMob}>
        <div className={css.catalogCardHeaderMob}>
          <div className={css.boxImageMob}>
            <div className={css.imageMob}>
              <img
                className={css.image}
                src={product.image}
                alt={product.productName}
              />
            </div>
          </div>
          <div className={css.catalogCardBtnMob}>
            <div
              className={css.BtnDelMob}
              onClick={() => {
                handleRemoveFavorite(product.product);
              }}
            >
              <button className={css.btnDelete}>
                <CiTrash className={css.iconDelMob} />
              </button>
            </div>
          </div>
        </div>
        <div className={css.catalogCardFooterMob}>
          <div className={css.catalogCardTitleMob}>
            <p>{product.productName}</p>
          </div>
          <div className={css.catalogPriceBoxMob}>
            {product.volumes.some((vol) => vol.discount > 0) && (
              <>
                <div className={css.catalogCardPriceOldMob}>
                  {getPrice().oldPrice} грн
                </div>
                <div className={css.catalogCardPriceMob}>
                  {Math.ceil(getPrice().newPrice)} грн
                </div>
              </>
            )}
            {!product.volumes.some((vol) => vol.discount > 0) && (
              <div className={css.catalogCardPrice}>
                {getPrice().oldPrice} грн
              </div>
            )}
          </div>
          <div className={css.catalogCardFooterBtnMob}>
            <button className={css.buyButtonMob} onClick={handleAddToBasket}>
              Купити
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteItem;
