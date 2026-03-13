const BASE_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (img) => {
  if (!img) return "/placeholder.jpg";

  if (img.startsWith("http")) return img;

  return `${BASE_URL}${img}`;
};