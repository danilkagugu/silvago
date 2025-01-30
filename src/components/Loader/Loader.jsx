import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#666"
      secondaryColor="#999999"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
