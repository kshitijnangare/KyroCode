import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Preloader from './components/layout/Preloader';
import Home from './pages/Home';

function App() {
  const [loaded, setLoaded] = useState(() => {
    return sessionStorage.getItem('preloader_shown') === 'true';
  });

  const showPreloader = !loaded;

  return (
    <BrowserRouter>
      <>
        {/* {showPreloader && (
          <Preloader
            onComplete={() => {
              sessionStorage.setItem('preloader_shown', 'true');
              setLoaded(true);
            }}
          />
        )} */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
