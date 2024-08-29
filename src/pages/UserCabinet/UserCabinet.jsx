import { Outlet } from "react-router-dom";
import css from "./UserCabinet.module.css";
import UserMenu from "../../components/UserMenu/UserMenu";
import Layout from "../../components/Layout/Layout";

const UserCabinet = () => {
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.sidebar}>
          <UserMenu />
        </div>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default UserCabinet;
