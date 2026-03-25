const API_KEY = "YOUR_API_KEY_HERE";

export const fetchNews = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=6&apiKey=${API_KEY}`
    );

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Failed to fetch news");
    }

    return data.articles;
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
};