import { useNavigate } from "react-router-dom";
import css from "./FavoriteItem.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { addProduct } from "../../redux/basket/operations";
import { useDispatch } from "react-redux";

const FavoriteItem = ({ product, handleRemoveFavorite, quantities }) => {
  console.log("product: ", product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPrice = () => {
    const newPrice = product.price * (1 - product.discount / 100);
    const oldPrice = product.price;

    return { newPrice, oldPrice };
  };
  const handleAddToBasket = () => {
    if (quantities[product.volumeId] > product.quantityInStock) {
      console.log("quantities: ", quantities);
      console.error("Not enough stock for this volume.");
      return;
    }
    dispatch(
      addProduct({
        slug: product.slug,
        quantity: quantities[product.volumeId],
        volume: product.volume,
      })
    );
  };

  const handleProductClick = () => {
    navigate(`/product/${product.slug}`);
  };
  return (
    <>
      <div className={css.cardContainer}>
        <div className={css.cardContainerBox}>
          <IoCloseSharp
            className={css.iconDelete}
            onClick={() => {
              handleRemoveFavorite(product.product, product.volumeId);
            }}
          />

          <div className={css.cardBox}>
            <div className={css.catalogCardHeader} onClick={handleProductClick}>
              <div className={css.catalogCardTop}>
                <div className={css.catalogCardImage}>
                  <div className={css.imgBox}>
                    <img
                      className={`${css.catalogCardImgProduct} ${
                        product.quantityInStock === 0 ? css.productMissImg : ""
                      }`}
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
                    {product.discount > 0 && (
                      <>
                        <div className={css.catalogCardPriceOld}>
                          {getPrice().oldPrice} грн
                        </div>
                        <div className={css.catalogCardPrice}>
                          {Math.ceil(getPrice().newPrice)} грн
                        </div>
                      </>
                    )}
                    {!product.discount > 0 && (
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
                {product.quantityInStock && product.quantityInStock > 0 ? (
                  <button
                    className={css.buyButtonMob}
                    onClick={handleAddToBasket}
                  >
                    Купити
                  </button>
                ) : (
                  <p className={` ${css.productMiss}`}>
                    Повідомити про наявність
                  </p>
                )}
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
                handleRemoveFavorite(product.product, product.volumeId);
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
            {product.discount > 0 && (
              <>
                <div className={css.catalogCardPriceOldMob}>
                  {getPrice().oldPrice} грн
                </div>
                <div className={css.catalogCardPriceMob}>
                  {Math.ceil(getPrice().newPrice)} грн
                </div>
              </>
            )}
            {!product.discount > 0 && (
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
