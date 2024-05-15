import "./App.css";
import "modern-normalize";

import { useState, useEffect, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import useUnsplash from "./hooks/useUnsplash";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

function App() {
  const [images, setImages] = useState({});
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [isLoad, setLoad] = useState(false);

  const { fetchImages } = useUnsplash(setImages, setError, setLoad);

  useEffect(() => {
    if (search.length === 0) {
      return;
    }

    setImages({});

    fetchImages(search);
  }, [search]);

  const imagesForGallery = useMemo(() => {
    const imagesList = images?.results;

    if (imagesList) {
      return imagesList.map((image) => {
        return {
          id: image?.id,
          imageLinkSmall: image?.urls?.small,
          alternativeName: image?.description,
        };
      });
    } else {
      return [];
    }
  }, [images?.results]);

  const loadMoreAction = (page) => {
    fetchImages(search, page);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={setSearch} />
      {imagesForGallery.length > 0 && (
        <ImageGallery images={imagesForGallery} />
      )}
      {isLoad && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
      {images?.results && images?.page && images.page < images.total_pages && (
        <LoadMoreBtn onClick={() => loadMoreAction(images.page)} />
      )}
    </>
  );
}

export default App;
