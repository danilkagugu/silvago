import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import UserMenu from "../../components/UserMenu/UserMenu";
// import UserSettings from "../../components/UserSettings/UserSettings";

const UserCabinet = () => {
  return (
    <div>
      <Header />
      <UserMenu />
      <Outlet />
    </div>
  );
};

export default UserCabinet;
