import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import Home from './assets/components/Home';
import LatestReleases from './assets/components/LatestReleases';
import Popular from './assets/components/Popular';
import Search from './assets/components/Search';
import MovieDetails from './assets/components/MovieDetails';
import LoadingSpinner from './assets/components/LoadingSpinner';
import 'tailwindcss/tailwind.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setContentVisible(true);
    }, 2000);
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <div className={`app-content ${contentVisible ? 'visible' : 'hidden'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/latest-releases" element={<LatestReleases />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
        {loading && <LoadingSpinner />}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
