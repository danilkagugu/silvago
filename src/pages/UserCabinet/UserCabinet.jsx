import { Outlet } from "react-router-dom";
import css from "./UserCabinet.module.css";
import UserMenu from "../../components/UserMenu/UserMenu";
import Layout from "../../components/Layout/Layout";

const UserCabinet = () => {
  return (
    <Layout>
      <div className={css.wrapper}>
        <div className={css.layout}>
          <div className={css.layoutMain}>
            <div className={css.layoutMainInner}>
              <Outlet />
            </div>
          </div>
          <aside className={css.layoutAside}>
            <UserMenu />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default UserCabinet;
