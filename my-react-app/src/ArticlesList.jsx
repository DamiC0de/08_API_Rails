import { useState, useEffect } from 'react';
import api from './api';

function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get('/articles').then(response => {
      setArticles(response.data);
    });
  }, []);

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ArticlesList;
