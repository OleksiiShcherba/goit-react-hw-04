import { requestImages } from "../services/unsplash";
import { toast } from "react-hot-toast";
import { Images } from "../components/App/App.type";

type SetImagesWithPrevState = (prevState: Images) => Images;
type SetImages = (images: Images | SetImagesWithPrevState) => void;

type SetError = (error: string | null) => void;
type SetLoad = (isLoading: boolean) => void;

const useUnsplash = (
  setImages: SetImages,
  setError: SetError,
  setLoad: SetLoad
) => {
  async function fetchImages(search: string, page: number): Promise<void> {
    try {
      setError(null);
      setLoad(true);

      const imagesNew: Images = await requestImages(search, page);
      if (imagesNew.results.length > 0) {
        setImages((prevState: Images): Images => {
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
      setError("An error occurred");
    } finally {
      setLoad(false);
    }
  }

  return { fetchImages };
};

export default useUnsplash;
