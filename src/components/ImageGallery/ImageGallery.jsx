import propTypes from "prop-types";
import css from "./ImageGallery.module.css";
import ImageCard from "./ImageCard/ImageCard";

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imagesList}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.imagesListElement}>
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
