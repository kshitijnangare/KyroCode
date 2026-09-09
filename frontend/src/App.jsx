import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import Preloader from './components/Layout/Preloader';

function App() {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem("preloader_shown") === "true";
  });

  // const isTargetPage = location.pathname === '/';
  // const showPreloader = !loaded && isTargetPage;
  const showPreloader = !loaded;

  return (
    <BrowserRouter>
      <>
        {showPreloader && (
          <Preloader onComplete={() => {
            sessionStorage.setItem("preloader_shown", "true");
            setLoaded(true);
          }} />
        )}
      </>
    </BrowserRouter>
  )
}

export default App
