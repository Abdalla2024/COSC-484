import React from 'react';
import ProfilePicture from './components/ProfilePicture';
import HobbyList from './components/HobbyList';
import './App.css';


function App({ data }) {
  return (
    <div className="app-container">
      <h1>Abdalla Abdelmagid</h1>
      <ProfilePicture src="profilePicture.jpg" alt="My face" />
      <h2>My Hobbies:</h2>
      <HobbyList hobbies={data.hobbies} />
    </div>
  );
}

export default App;