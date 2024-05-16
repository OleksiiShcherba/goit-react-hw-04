import css from "./LoadMoreBtn.module.css";
import propTypes from "prop-types";

const LoadMoreBtn = ({ endRef, onClick }) => {
  return (
    <>
      <button className={css.LoadMoreButton} type="button" onClick={onClick}>
        Load more
      </button>
      <div ref={endRef}></div>
    </>
  );
};

LoadMoreBtn.propTypes = {
  endRef: propTypes.object.isRequired,
  onClick: propTypes.func.isRequired,
};

export default LoadMoreBtn;
