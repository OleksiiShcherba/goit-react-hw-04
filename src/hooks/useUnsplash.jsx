import { requestImages } from "../services/unsplash";
import { toast } from "react-hot-toast";

const useUnsplash = (setImages, setError, setLoad) => {
  async function fetchImages(search, page = 1) {
    try {
      setError(null);
      setLoad(true);

      const imagesNew = await requestImages(search, page);
      if (imagesNew?.results) {
        setImages((prevState) => {
          if (Object.keys(prevState).length === 0) {
            return { ...imagesNew, page: 2 };
          } else {
            return {
              ...prevState,
              results: [...prevState.results, ...imagesNew.results],
              page: prevState.page + 1,
            };
          }
        });
      }

      toast.success("Images loaded successfully");
    } catch (error) {
      setError(error?.message || "An error occurred");
    } finally {
      setLoad(false);
    }
  }

  return { fetchImages };
};

export default useUnsplash;
