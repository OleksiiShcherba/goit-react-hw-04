import { requestImages } from "../services/unsplash";
import { toast } from "react-hot-toast";

const useUnsplash = (setImages, setError, setLoad) => {
  async function fetchImages(search, page) {
    try {
      setError(null);
      setLoad(true);

      const imagesNew = await requestImages(search, page);
      if (imagesNew?.results?.length > 0) {
        setImages((prevState) => {
          if (Object.keys(prevState).length === 0) {
            return imagesNew;
          } else {
            return {
              ...imagesNew,
              results: [...prevState.results, ...imagesNew.results],
            };
          }
        });
        toast.success("Images loaded successfully");
      } else {
        toast.error("No images found");
      }
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoad(false);
    }
  }

  return { fetchImages };
};

export default useUnsplash;
