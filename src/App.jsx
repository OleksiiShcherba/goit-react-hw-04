import "./App.css";
import "modern-normalize";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState([]);

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar
        onSubmit={(text) => {
          console.log(text);
        }}
      />
      {images?.length > 0 && <ImageGallery images={images} />}
    </>
  );
}

export default App;
