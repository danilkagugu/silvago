// import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import TestUserProfile from "../../components/TestUserProfile/TestUserProfile";
// import { getUnipro, sendProductData } from "../../services/productApi";

const DeliveryAndPayment = () => {
  // const [unipro, setUnipro] = useState();
  // const [qqq, setQqq] = useState();
  // console.log("qqq: ", qqq);
  // console.log("unipro: ", unipro);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getUnipro();
  //       const res = await sendProductData();
  //       setQqq(res);
  //       setUnipro(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <Layout>
      <TestUserProfile />
      {/* <ul>
        {unipro &&
          unipro.goods.map((item) => (
            <li key={item.barcode}>
              <p>{item.name}</p>
            </li>
          ))}
      </ul> */}
    </Layout>
  );
};

export default DeliveryAndPayment;
