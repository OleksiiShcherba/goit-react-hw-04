import "./App.css";
import "modern-normalize";

import { useState, useEffect, useMemo, useRef } from "react";
import { Toaster } from "react-hot-toast";
import useUnsplash from "../../hooks/useUnsplash";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import { Images } from "./App.type";

type ModalData = {
  link?: string;
  alt?: string;
};

function App() {
  const [images, setImages] = useState<Images>({
    results: [],
    total_pages: 0,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoad, setLoad] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({});
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { fetchImages } = useUnsplash(setImages, setError, setLoad);

  useEffect(() => {
    if (search.length !== 0) {
      setImages({ results: [], total_pages: 0, total: 0 });
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
    if (images.results.length > 0 && page > 1) {
      const timeoutId = setTimeout(() => {
        scrollToLoadMore();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [images]);

  const imagesForGallery = useMemo(() => {
    return images.results.map((image) => ({
      id: image.id,
      imageLinkSmall: image.urls.small,
      imageLinkModal: image.urls.regular,
      alternativeName: image.alt_description ?? image.description,
    }));
  }, [images.results]);

  const scrollToLoadMore = (): void => {
    loadMoreRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const loadMoreAction = (): void => {
    fetchImages(search, page).catch((error) => {
      setError(error.message || "An error occurred");
    });
  };

  const modalHide = (): void => {
    setModalData({});
  };

  const showModal = (imageLink: string, alt: string): void => {
    setModalData({ link: imageLink, alt: alt });
  };

  const incrementPage = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={setSearch} />
      {imagesForGallery.length > 0 && (
        <ImageGallery
          imagesForGallery={imagesForGallery}
          showModal={showModal}
        />
      )}
      {isLoad && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
      {images.results.length > 0 && page < images.total_pages && (
        <LoadMoreBtn endRef={loadMoreRef} onClick={incrementPage} />
      )}
      <ImageModal modalShow={modalData} modalHide={modalHide} />
    </div>
  );
}

export default App;
