import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const apiKey = '659287366f675fec513ad974dd716af0';
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );

        if (response.ok) {
          const data = await response.json();
          setRecommendedMovies(data.results.slice(0, 5));
        } else {
          console.error('Error al obtener películas recomendadas');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchRecommendedMovies();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % recommendedMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + recommendedMovies.length) % recommendedMovies.length);
  };

  const handleNavClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative max-h-vh-85 md:h-full w-full overflow-hidden">
      <button className="absolute left-0 transform -translate-y-1/2  text-4xl cursor-pointer" onClick={prevSlide}>&lt;</button>
      <div className="h-full flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {recommendedMovies.map((movie, index) => (
          <div key={movie.id} className="flex-none w-full h-full text-center relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover object-top"
              style={{ objectPosition: 'center 20%' }}
            />
  
            <div className="rounded h-2/2 w-full lg:w-9/12 py-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-end p-4 bg-gray-200 bg-opacity-75">
              <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
              <p className="w-full mb-4 text-xs">
                {movie.overview}
              </p>
              <Link to={`/movie/${movie.id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 text-xs rounded">Ver más...</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button className="absolute right-0 transform -translate-y-1/2 text-white text-2xl cursor-pointer" onClick={nextSlide}>&gt;</button>
      <div className=" absolute  bottom-1 left-1/2 transform -translate-x-1/2 flex items-center">
        {recommendedMovies.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 bg-white rounded-full mx-2 cursor-pointer ${index === currentSlide ? 'bg-blue-500' : ''}`}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
