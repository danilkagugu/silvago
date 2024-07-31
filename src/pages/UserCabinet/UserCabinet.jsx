import { Outlet } from "react-router-dom";

import UserMenu from "../../components/UserMenu/UserMenu";
import Layout from "../../components/Layout/Layout";
// import UserSettings from "../../components/UserSettings/UserSettings";

const UserCabinet = () => {
  return (
    <Layout>
      <UserMenu />
      <Outlet />
    </Layout>
  );
};

export default UserCabinet;
