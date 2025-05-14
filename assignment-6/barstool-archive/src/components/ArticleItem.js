import React from 'react';

function ArticleItem({ article }) {
  // For article thumbnail, use the location and images properties
  const thumbnailUrl = article.thumbnail && article.thumbnail.location && article.thumbnail.images
    ? article.thumbnail.location + article.thumbnail.images.small
    : 'https://via.placeholder.com/200';
    
  // For author avatar, use the avatar URL directly from the author object
  const avatarUrl = article.author && article.author.avatar
    ? article.author.avatar
    : 'https://via.placeholder.com/50';

  return (
    <li style={{ listStyle: 'none', marginBottom: '20px' }}>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <h2>{article.title}</h2>
      </a>

      <img
        src={thumbnailUrl}
        alt={article.title}
        style={{ maxWidth: '200px', display: 'block' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
        <img
          src={avatarUrl}
          alt={article.author ? article.author.name : 'Author'}
          style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px' }}
        />
        <span>{article.author ? article.author.name : 'Unknown Author'}</span>
      </div>

      <p style={{ marginTop: '4px' }}>{article.comment_count || 0} comments</p>
    </li>
  );
}

export default ArticleItem;
