import propTypes from "prop-types";

const ImageCard = ({ imageLinkSmall, alternativeName }) => {
  return (
    <div>
      <img src={imageLinkSmall} alt={alternativeName} />
    </div>
  );
};

ImageCard.propTypes = {
  imageLinkSmall: propTypes.string.isRequired,
  alternativeName: propTypes.string.isRequired,
};

export default ImageCard;
