import Modal from "react-modal";
import { FC } from "react";
import css from "./ImageModal.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgb(1, 0, 0, 0.9)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    height: "720px",
    width: "1280px",
    overlay: "hidden",
  },
};

Modal.setAppElement("body");

type ImageModalProps = {
  modalHide: () => void;
  modalShow?: {
    link?: string;
    alt?: string;
  };
};

const ImageModal: FC<ImageModalProps> = ({ modalHide, modalShow = {} }) => {
  return (
    <Modal
      isOpen={Object.keys(modalShow).length > 0}
      onRequestClose={modalHide}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img
        className={css.modalImage}
        src={modalShow?.link}
        alt={modalShow?.alt}
      />
    </Modal>
  );
};

export default ImageModal;
