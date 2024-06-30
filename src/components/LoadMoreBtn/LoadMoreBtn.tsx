import css from "./LoadMoreBtn.module.css";
import { FC, RefObject } from "react";

type LoadMoreBtnProps = {
  endRef: RefObject<HTMLDivElement>;
  onClick: () => void;
};

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ endRef, onClick }) => {
  return (
    <>
      <button className={css.LoadMoreButton} type="button" onClick={onClick}>
        Load more
      </button>
      <div ref={endRef}></div>
    </>
  );
};

export default LoadMoreBtn;
