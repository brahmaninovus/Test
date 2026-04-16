import React from 'react';
import Header from './components/Header';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <NotesProvider>
      <div className="app-container">
        <Header />
        <h1>Hello, Novus</h1>
        
      </div>
    </NotesProvider> //test
  );
}

export default App;
