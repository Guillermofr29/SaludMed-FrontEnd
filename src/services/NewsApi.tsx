
const API_KEY = 'cadefdb0df524296b767da8dc4c6c789';
const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchNews = async () => {
  const response = await fetch(
    `${BASE_URL}?q=medicina&language=es&apiKey=${API_KEY}`,
  );
  const data = await response.json();
  return data.articles;
};
