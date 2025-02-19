import css from "./ProductCharacteristics.module.css";

const ProductCharacteristics = ({ productDetails, product }) => {
  return (
    <div className={css.productGroup}>
      <div className={css.productGroupItem}>
        <div className={css.productCharacteristics}>
          <p className={css.productCharacteristicsTitle}>Характеристики</p>
        </div>
        {productDetails && (
          <div className={css.productCharacteristicsBox}>
            <table className={css.productCharacteristicsTable}>
              <tbody>
                {/* {product &&
                  product.map((item, index) => {
                    const { country, brand } = item;
                    console.log("country: ", country);
                    return (
                      <React.Fragment key={index}>
                        <tr key={1}>
                          <th
                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                          >
                            Тип шкіри
                          </th>
                          <td>{skinType}</td>
                        </tr>
                        <tr key={2}>
                          <th
                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                          >
                            Призначення
                          </th>
                          <td>{appointment}</td>
                        </tr>
                        <tr key={3}>
                          <th
                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                          >
                            Вік
                          </th>
                          <td>{age}</td>
                        </tr>
                        <tr key={4}>
                          <th
                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                          >
                            Вид товару
                          </th>
                          <td>{productType}</td>
                        </tr>
                        <tr key={5}>
                          <th
                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                          >
                            Клас товару
                          </th>
                          <td>{productClass}</td>
                        </tr>
                        <tr key={6}>
                          <th
                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                          >
                            Серія
                          </th>
                          <td>{series}</td>
                        </tr>
                        <tr key={7}>
                          <th
                            className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                          >
                            Країна виробник
                          </th>
                          <td>{country}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })} */}
                <tr key={1}>
                  <th
                    className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                  >
                    Бренд
                  </th>
                  <td className={css.productFeaturesCell}>{product.brand}</td>
                </tr>
                <tr key={2}>
                  <th
                    className={`${css.productFeaturesCell} ${css.productFeaturesCellLeft}`}
                  >
                    Країна виробник
                  </th>
                  <td className={css.productFeaturesCell}>{product.country}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCharacteristics;
