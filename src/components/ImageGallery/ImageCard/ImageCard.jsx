import propTypes from "prop-types";
import css from "./ImageCard.module.css";

const ImageCard = ({ imageLinkSmall, alternativeName }) => {
  return (
    <div className={css.imageWrapper}>
      <img
        className={css.imageElement}
        src={imageLinkSmall}
        alt={alternativeName}
      />
    </div>
  );
};

ImageCard.propTypes = {
  imageLinkSmall: propTypes.string.isRequired,
  alternativeName: propTypes.string.isRequired,
};

export default ImageCard;
