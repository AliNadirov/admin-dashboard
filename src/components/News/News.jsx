import { useEffect, useState } from "react";
import { fetchNews } from "../../services/newsService";
import "./News.css";

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchNews();
      setArticles(data);
    };

    load();
  }, []);

  return (
    <div className="news-container">
      <h3 className="news-title">Market Updates</h3>

      <div className="news-grid">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            <h4 className="news-title-text">{article.title}</h4>

            <p className="news-desc">{article.description}</p>

            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="news-link"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;