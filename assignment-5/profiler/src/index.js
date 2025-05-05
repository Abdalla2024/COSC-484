import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const data = {
  profilePicture: 'profile.jpg',
  hobbies: [
    { id: 1, name: 'Sports' },
    { id: 2, name: 'Chess' },
    { id: 3, name: 'Coding' },
  ],
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App data={data}/>
  </React.StrictMode>
);