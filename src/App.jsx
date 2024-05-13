import "./App.css";
import "modern-normalize";

import { useState, useEffect, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import { requestImages } from "./services/unsplash";

function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length === 0) {
      return;
    }

    async function fetchImages() {
      try {
        const imagesNew = await requestImages(search);
        if (imagesNew) {
          setImages((imagesCurrent) => {
            return [...imagesCurrent, ...imagesNew.results];
          });
        }
      } catch (error) {
        toast.error(error);
      } finally {
        toast.success("Images loaded successfully");
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

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={setSearch} />
      {images?.length > 0 && <ImageGallery images={imagesForGallery} />}
    </>
  );
}

export default App;
