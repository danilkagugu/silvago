// import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import UserMenu from "../../components/UserMenu/UserMenu";
import UserSettings from "../../components/UserSettings/UserSettings";
// import { getArea, getSities } from "../../services/NovaPoshtaApi";

const UserCabinet = () => {
  // const [areas, setAreas] = useState([]);
  // const [cities, setCities] = useState([]);

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const citiesData = await getSities();
  //       setCities(citiesData);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };

  //   fetchCities();
  // }, []);

  // useEffect(() => {
  //   const fetchAreas = async () => {
  //     try {
  //       const ariesData = await getArea();
  //       setAreas(ariesData);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };

  //   fetchAreas();
  // }, []);
  // console.log(cities);
  // console.log("areas:", areas);
  return (
    <div>
      <Header />
      <UserMenu />
      <UserSettings />
    </div>
  );
};

export default UserCabinet;
