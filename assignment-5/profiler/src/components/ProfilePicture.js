import React from 'react';

function ProfilePicture({ src, alt }) {
  return <img src={src} alt={alt} className="profile-picture" />;
}

export default ProfilePicture;