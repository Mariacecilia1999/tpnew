import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import MovieList from './MovieList';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint, setStateFunction) => {
      try {
        const apiKey = '659287366f675fec513ad974dd716af0';
        const response = await fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}&language=en-US&page=1`);
        
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }

        const data = await response.json();
        setStateFunction(data.results);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchData('/movie/popular', setPopularMovies);
    fetchData('/movie/top_rated', setTopRatedMovies);
  }, []);

  return (
    <div>
      <div className='h-full md:h-64'>
        <Slider />
      </div>
      <div className='flex flex-col   md:justify-center md:flex-row'>
        <MovieList title="Peliculas Populares" movies={popularMovies}/>
        <MovieList title="Peliculas Mejor Puntadas" movies={topRatedMovies} />
      </div>
    </div>
  );
};

export default Home;
