import "./App.css";
import "modern-normalize";

import { useState, useEffect, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";

import { requestImages } from "./services/unsplash";

function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    if (search.length === 0) {
      return;
    }

    async function fetchImages() {
      try {
        setImages([]);
        setError(null);
        setLoad(true);

        const imagesNew = await requestImages(search);
        if (imagesNew && imagesNew.results.length > 0) {
          setImages(imagesNew.results);
        }

        toast.success("Images loaded successfully");
      } catch (error) {
        setError(error?.message || "An error occurred");
      } finally {
        setLoad(false);
      }
    }

    fetchImages();
  }, [search]);

  const imagesForGallery = useMemo(() => {
    return images.map((image) => {
      return {
        id: image?.id,
        imageLinkSmall: image?.urls?.small,
        alternativeName: image?.description,
      };
    });
  }, [images]);

  console.log(error);

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={setSearch} />
      {images?.length > 0 && <ImageGallery images={imagesForGallery} />}
      {isLoad && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
    </>
  );
}

export default App;
