import { RotatingLines } from "react-loader-spinner";
const LoaderSearch = () => {
  return (
    <RotatingLines
      visible={true}
      height="20"
      width="20"
      color="#808080" // 🎨 Сірий колір (hex)
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
      strokeColor="#808080"
    />
  );
};

export default LoaderSearch;
