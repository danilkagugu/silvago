import css from "./ProductDescriptionTabs.module.css";

const ProductDescriptionTabs = ({
  descriptionTab,
  setDescriptionTab,
  product,
}) => {
  return (
    <div className={css.productGroup}>
      <div className={css.productDescriptionHeader}>
        <nav className={css.productDescriptionNav}>
          <p
            className={`${css.descriptionNavTab} ${
              descriptionTab === "Опис" ? css.tabActive : ""
            }`}
            onClick={() => setDescriptionTab("Опис")}
          >
            Опис
          </p>
          <p
            className={`${css.descriptionNavTab}  ${
              descriptionTab === "Новий відгук" ? css.tabActive : ""
            }`}
            onClick={() => setDescriptionTab("Новий відгук")}
          >
            Новий відгук
          </p>
        </nav>
      </div>
      {descriptionTab === "Опис" && (
        <div className={css.productDescriptionBox}>
          {/* <div
            className={css.text}
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          /> */}

          <div className={css.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            semper, lectus non luctus fringilla, dui est eleifend tellus,
            tincidunt congue nisl justo sagittis tortor. Quisque fringilla massa
            scelerisque urna vehicula, ut tempor mauris ornare. Fusce
            sollicitudin aliquet laoreet. Aliquam sed bibendum ex. Vestibulum a
            ultricies metus. Suspendisse blandit accumsan luctus. Nullam rhoncus
            tortor nec massa varius scelerisque nec eget ligula. Nulla
            ullamcorper ligula tortor. Cras eu accumsan dolor. Vivamus viverra
            mi justo, nec venenatis sapien elementum non. Sed tincidunt
            ultricies gravida. Donec purus urna, tempus non sem et, finibus
            elementum eros. Cras pulvinar vulputate turpis, eu suscipit eros
            varius sed. In finibus convallis elementum. Nullam non pulvinar
            nulla. Etiam dictum commodo posuere. Integer convallis porta lorem,
            nec ornare ipsum hendrerit quis. Vestibulum eu arcu sit amet felis
            maximus dapibus. Aliquam eget nunc lacinia odio ultrices
            sollicitudin. Phasellus id felis vitae ipsum porta hendrerit et id
            purus. Cras quis mollis urna, eget egestas odio. Nunc accumsan,
            lectus et vestibulum vulputate, purus arcu varius neque, sit amet
            congue lectus turpis sit amet augue. Nunc nec scelerisque lacus.
            Etiam quis tortor pulvinar, egestas est sed, rutrum lacus. Donec id
            urna sit amet dui cursus sodales in gravida lacus. Nunc rutrum urna
            nec sodales tincidunt. Integer et vehicula mi. Donec dictum nulla a
            ipsum blandit iaculis. Ut fringilla dapibus lacus eu rutrum.
            Suspendisse potenti. Sed dolor est, ornare vel accumsan at,
            fringilla non velit. Suspendisse quam leo, euismod eget lectus
            dapibus, porttitor porta dui. Sed auctor accumsan nunc, et auctor ex
            euismod pulvinar. Morbi leo diam, elementum at libero a, lobortis
            hendrerit dolor. Donec magna nisi, pulvinar a libero non, blandit
            blandit est. Suspendisse rutrum elit sit amet sapien imperdiet, in
            aliquet arcu interdum. Pellentesque condimentum, ipsum sed fringilla
            imperdiet, enim lectus lacinia augue, in cursus nisl dolor nec
            massa. Donec eget risus egestas, faucibus nisl ac, dignissim nisl.
            Sed et lacus at nunc vulputate volutpat. Aliquam quis gravida quam.
            Cras accumsan sem sit amet enim accumsan efficitur. Duis porta sed
            lacus in dignissim. Proin facilisis diam quis justo efficitur, ut
            aliquet lorem volutpat. Integer nec fermentum nisi. Vestibulum non
            libero eros. Aliquam mollis tellus eu diam porta venenatis. Interdum
            et malesuada fames ac ante ipsum primis in faucibus. Duis bibendum
            elementum lectus in fringilla. Integer id ex sit amet ante rutrum
            tincidunt accumsan at mi. Nullam suscipit pellentesque gravida.
            Proin tortor ex, egestas eu mauris et, placerat rhoncus dolor. Nunc
            convallis accumsan pretium. Donec suscipit condimentum orci ut
            faucibus. Donec massa felis, dictum quis bibendum accumsan, semper
            ut lorem. Nullam in nunc in velit placerat facilisis. Duis non
            cursus nulla. Duis non erat a leo faucibus ornare. Sed accumsan est
            lorem, at efficitur ante consequat sed. Aenean nunc elit,
            pellentesque et metus consequat, imperdiet sollicitudin enim. Fusce
            eleifend neque lacus, sed hendrerit neque fermentum in. Sed ut ipsum
            vel nibh facilisis aliquam. Vestibulum commodo metus sit amet nisi
            fermentum interdum. Sed convallis efficitur urna, et feugiat mi.
            Proin hendrerit diam erat, at consequat ante egestas a. Nunc congue
            et nunc eget ultricies. Donec et arcu a massa commodo fringilla.
            Praesent ante ex, consequat at velit eu, tempor vestibulum tortor.
            Sed aliquam ligula nec sapien euismod, at gravida lacus tincidunt.
            Vivamus sed sagittis purus, vitae ullamcorper enim. Donec auctor
            eleifend malesuada. In iaculis elit nisl, eget efficitur dolor
            varius vitae. Pellentesque ut lobortis dui. Suspendisse quis semper
            sem. Nunc neque enim, volutpat sit amet accumsan id, suscipit sed
            turpis. Nullam erat felis, suscipit sit amet ex a, consequat
            tincidunt leo.
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescriptionTabs;
