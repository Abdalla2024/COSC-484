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
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
      <ul style={{ 
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px' 
      }}>
        {articles.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;