import React from 'react';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <div className="App">
      <header style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '15px 0',
        marginBottom: '20px'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ margin: 0, fontSize: '28px' }}>Barstool Archive</h1>
        </div>
      </header>
      <main>
        <ArticleList />
      </main>
    </div>
  );
}

export default App;