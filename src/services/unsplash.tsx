import axios from "axios";

const auth_token = "Client-ID BdxO1O7S3izCS3BsVVT--hQt0dntSCJH-i-vCfUjT18";

axios.defaults.baseURL = "https://api.unsplash.com";

export const requestImages = async (query, page, perPage = 12) => {
  const response = await axios.get("/search/photos", {
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
