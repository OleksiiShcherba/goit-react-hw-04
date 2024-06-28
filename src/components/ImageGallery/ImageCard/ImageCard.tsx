import propTypes from "prop-types";
import css from "./ImageCard.module.css";

const ImageCard = ({
  imageLinkSmall,
  alternativeName,
  imageLinkModal,
  showModal,
}) => {
  return (
    <div className={css.imageWrapper}>
      <img
        className={css.imageElement}
        src={imageLinkSmall}
        alt={alternativeName}
        onClick={() => showModal(imageLinkModal, alternativeName)}
      />
    </div>
  );
};

ImageCard.propTypes = {
  imageLinkSmall: propTypes.string.isRequired,
  alternativeName: propTypes.string.isRequired,
  imageLinkModal: propTypes.string.isRequired,
  showModal: propTypes.func.isRequired,
};

export default ImageCard;
