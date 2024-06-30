import axios, { AxiosResponse } from "axios";
import { Images } from "../components/App/App.type";

const auth_token = "Client-ID BdxO1O7S3izCS3BsVVT--hQt0dntSCJH-i-vCfUjT18";

axios.defaults.baseURL = "https://api.unsplash.com";

export const requestImages = async (
  query: string,
  page: number,
  perPage: number = 12
): Promise<Images> => {
  const response: AxiosResponse<Images> = await axios.get("/search/photos", {
    params: {
      query,
      page,
      per_page: perPage,
    },
    headers: {
      Authorization: auth_token,
    },
  });

  return response.data;
};
