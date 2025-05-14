import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleItem from './ArticleItem';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://www.jalirani.com/files/barstool.json')
      .then(response => {
        console.log('Article data sample:', response.data[0]);
        setArticles(response.data);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul style={{ padding: 0 }}>
      {articles.map(article => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ul>
  );
}

export default ArticleList;