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
    <li style={{ 
      listStyle: 'none', 
      marginBottom: '20px',
      border: '1px solid #eee',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
      maxWidth: '800px'
    }}>
      <div style={{ display: 'flex', padding: '20px' }}>
        {/* Left side - Article image */}
        <div style={{ flexShrink: 0, marginRight: '20px' }}>
          <img
            src={thumbnailUrl}
            alt={article.title}
            style={{ 
              width: '220px', 
              height: '165px', 
              objectFit: 'cover',
              display: 'block',
              borderRadius: '4px'
            }}
          />
        </div>
        
        {/* Right side - Article content */}
        <div style={{ flex: 1 }}>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#000' }}
          >
            <h2 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '24px',
              fontWeight: 'bold',
              lineHeight: '1.2'
            }}>
              {article.title}
            </h2>
          </a>
          
          {/* Author info */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginTop: '20px',
            marginBottom: '10px' 
          }}>
            <img
              src={avatarUrl}
              alt={article.author ? article.author.name : 'Author'}
              style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                marginRight: '8px' 
              }}
            />
            <span>{article.author ? article.author.name : 'Unknown Author'}</span>
            <span style={{ 
              marginLeft: 'auto', 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              {article.comment_count || 0} comments
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ArticleItem;
