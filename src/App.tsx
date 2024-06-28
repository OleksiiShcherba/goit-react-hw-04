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
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef();

  const { fetchImages } = useUnsplash(setImages, setError, setLoad);

  useEffect(() => {
    if (search?.length != 0) {
      setImages({});
      setPage(1);
      loadMoreAction();
    }
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      loadMoreAction();
    }
  }, [page]);

  useEffect(() => {
    if (images?.results?.length > 0 && page > 1) {
      const timeoutId = setTimeout(() => {
        scrollToLoadMore();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [images]);

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

  const scrollToLoadMore = () => {
    loadMoreRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const loadMoreAction = () => {
    fetchImages(search, page).catch((error) => {
      setError(error?.message || "An error occurred");
    });
  };

  const modalHide = () => {
    setModalData({});
  };

  const showModal = (imageLink, alt) => {
    setModalData({ link: imageLink, alt: alt });
  };

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
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
      {images?.results && images?.total_pages && page < images.total_pages && (
        <LoadMoreBtn endRef={loadMoreRef} onClick={incrementPage} />
      )}
      <ImageModal modalShow={modalData} modalHide={modalHide} />
    </div>
  );
}

export default App;
