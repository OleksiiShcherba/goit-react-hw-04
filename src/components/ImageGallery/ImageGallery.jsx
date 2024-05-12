import propTypes from "prop-types";

import ImageCard from "./ImageCard/ImageCard";

const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map((image) => {
        return (
          <li key={image.id}>
            <ImageCard
              imageLinkSmall={image.imageLinkSmall}
              alternativeName={image.alternativeName}
            />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      imageLinkSmall: propTypes.string.isRequired,
      alternativeName: propTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
