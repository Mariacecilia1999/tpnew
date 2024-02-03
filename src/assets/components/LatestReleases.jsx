import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';

const LatestReleases = () => {
  const [latestReleases, setLatestReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchLatestReleases = async () => {
      try {
        const apiKey = '659287366f675fec513ad974dd716af0';
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setLatestReleases(data.results);
        } else {
          console.error('Error al obtener datos de la API');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReleases();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-center text-lg my-8">Películas en Cartelera</h1>

      {loading && <LoadingSpinner />}

      <div className="flex flex-wrap justify-center">
        {latestReleases.map((movie) => (
          <div key={movie.id} className="border rounded my-2 mx-2 w-full sm:w-1/2 md:w-1/3 lg:w-2/12 xl:w-2/12   transition-transform transform-gpu hover:shadow-lg">
            <Link to={`/movie/${movie.id}`} className="block relative text-center">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto mb-2 rounded-t"
              />
              <h3 className="h-8 text-xs font-semibold mb-2">{movie.title}</h3>
              <span className="py-1 text-gray-400 hover:text-blue-400 flex items-center justify-center border-t  block text-xs" role="img" aria-label="Ver detalles">
                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
              </span>
            </Link>
          </div>
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={152} 
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LatestReleases;
