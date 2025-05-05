import React from 'react';
import HobbyItem from './HobbyItem.js';

function HobbyList({ hobbies }) {
  return (
    <ul className="hobby-list">
      {hobbies.map(hobby => (
        <HobbyItem key={hobby.id} name={hobby.name} />
      ))}
    </ul>
  );
}

export default HobbyList;