import { FC, MouseEvent } from "react";
import css from "./ImageCard.module.css";

type ImageCardProps = {
  imageLinkSmall: string;
  alternativeName: string;
  imageLinkModal: string;
  showModal: (imageLink: string, alt: string) => void;
};

const ImageCard: FC<ImageCardProps> = ({
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
        onClick={(event: MouseEvent<HTMLImageElement>) =>
          showModal(imageLinkModal, alternativeName)
        }
      />
    </div>
  );
};

export default ImageCard;
