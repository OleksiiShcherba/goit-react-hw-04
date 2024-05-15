import css from "./LoadMoreBtn.module.css";
import propTypes from "prop-types";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <>
      <button className={css.LoadMoreButton} type="button" onClick={onClick}>
        Load more
      </button>
    </>
  );
};

LoadMoreBtn.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default LoadMoreBtn;
