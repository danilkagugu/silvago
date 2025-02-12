import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SilvagoBanner from "../SilvagoBanner/SilvagoBanner";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <Container>
      <SilvagoBanner />
      <Header />
      <div className={css.main}>{children}</div>
      <Footer />
    </Container>
  );
};

export default Layout;
