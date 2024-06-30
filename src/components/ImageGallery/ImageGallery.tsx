import { FC } from "react";
import css from "./ImageGallery.module.css";
import ImageCard from "./ImageCard/ImageCard";

type GalaryImage = {
  id: string;
  imageLinkSmall: string;
  imageLinkModal: string;
  alternativeName: string | undefined;
};

type ImageGalleryProps = {
  imagesForGallery: GalaryImage[];
  showModal: (imageLink: string, alt: string) => void;
};

const ImageGallery: FC<ImageGalleryProps> = ({
  imagesForGallery,
  showModal,
}) => {
  return (
    <ul className={css.imagesList}>
      {imagesForGallery.map((image) => (
        <li key={image.id} className={css.imagesListElement}>
          <ImageCard
            imageLinkSmall={image.imageLinkSmall}
            alternativeName={image?.alternativeName ?? "No description"}
            imageLinkModal={image.imageLinkModal}
            showModal={showModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
