import { Bars } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <Bars
        height="80"
        width="80"
        radius="9"
        color="#3d43ab"
        ariaLabel="loading"
        wrapperClass={css.wrapperStyle}
      />
    </>
  );
};

export default Loader;
