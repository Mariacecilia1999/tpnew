import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ title, movies }) => {
  const visibleMovies = movies.slice(0, 10);

  return (
    <div className='rounded  border border-gray-800 my-5 ml-0 w-full lg:w-5/12  lg:ml-10'>
      <h2 className='py-2 w-full bg-gray-800 py-3 text-white text-lg text-center'>{title}</h2>
      <div className='flex flex-col px-5'>
        {visibleMovies.map((movie) => (
          <div key={movie.id}> 
            <div className='py-2 flex justify-between border-b-2 border-gray-100'>  
              <div class="w-7 h-7 overflow-hidden">
                <img
                  class="rounded-full w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div className='w-full px-5 flex justify-between items-center '>
                <p className='w-1/2 text-xs'>{movie.title}</p>
                <p>
                  <Link to={`/movie/${movie.id}`}>
                    <svg className='w-6 h-6    text-white  bg-blue-400  hover:bg-blue-300 rounded rounded-full' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
