import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import HeaderBasket from "../HeaderBasket/HeaderBasket";

const LayoutBasket = ({ children }) => {
  return (
    <>
      <HeaderBasket />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default LayoutBasket;
