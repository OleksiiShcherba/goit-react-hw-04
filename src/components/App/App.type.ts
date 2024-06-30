export type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  description?: string;
};

export type Images = {
  results: Image[];
  total_pages: number;
  total: number;
};
