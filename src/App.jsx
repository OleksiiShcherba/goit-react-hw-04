import "./App.css";
import "modern-normalize";

import { useState, useEffect, useMemo, useRef } from "react";
import { Toaster } from "react-hot-toast";
import useUnsplash from "./hooks/useUnsplash";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState({});
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [isLoad, setLoad] = useState(false);
  const [modalData, setModalData] = useState({});
  const loadMoreRef = useRef();

  const { fetchImages } = useUnsplash(setImages, setError, setLoad);

  useEffect(() => {
    if (search.length === 0) {
      return;
    }

    setImages({});

    fetchImages(search);
  }, [search]);

  useEffect(() => {
    if (images?.results?.length > 0) {
      scrollToLoadMore();
    }
  }, [images?.results]);

  const imagesForGallery = useMemo(() => {
    const imagesList = images?.results;

    if (imagesList) {
      return imagesList.map((image) => {
        return {
          id: image?.id,
          imageLinkSmall: image?.urls?.small,
          imageLinkModal: image?.urls?.regular,
          alternativeName: image?.alt_description ?? image?.description,
        };
      });
    } else {
      return [];
    }
  }, [images?.results]);

  const loadMoreAction = async (page) => {
    await fetchImages(search, page);
  };

  const scrollToLoadMore = () => {
    loadMoreRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const modalHide = () => {
    setModalData({});
  };

  const showModal = (imageLink, alt) => {
    setModalData({ link: imageLink, alt: alt });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={setSearch} />
      {imagesForGallery.length > 0 && (
        <ImageGallery images={imagesForGallery} showModal={showModal} />
      )}
      {isLoad && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
      {images?.results && images?.page && images.page < images.total_pages && (
        <LoadMoreBtn
          endRef={loadMoreRef}
          onClick={() => loadMoreAction(images.page)}
        />
      )}
      <ImageModal modalShow={modalData} modalHide={modalHide} />
    </div>
  );
}

export default App;
