import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import LoadingSpinner from './LoadingSpinner';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '659287366f675fec513ad974dd716af0';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`;

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setMovieDetails(data);

          if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find((video) => video.type === 'Trailer');
            if (trailer) {
              setTrailerKey(trailer.key);
            }
          }
        } else {
          console.error('Error al obtener detalles de la película');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!movieDetails) {
    return <LoadingSpinner />;
  }

  const releaseYear = new Date(movieDetails.release_date).getFullYear();

  return (
    <div className="px-5 relative bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}')` }}>
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10">
        <div className='flex  flex-col lg:flex-row items-center justify-center py-20'>
          <img className='h-1/2 w-60' src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
          <div className='h-1/2 lg:w-1/2 ml-10 text-white'>
            <div className='flex justify-around items-center pb-10'>
              <div className='flex '>
                <h1 className='text-3xl'>{movieDetails.title}<span className='ml-2 pt-5 text-lg'>{releaseYear}</span></h1>
              </div>
              {trailerKey && (
                <div>
                  <button onClick={openModal} className='w-32  hover:text-blue-400 text-xs' >Ver Trailer</button>
                </div>
              )}
            </div>
            <h4 className='py-3 text-xs font-bold'>General</h4>
            <p className='text-xs py-2'>{movieDetails.overview}</p>
            <h6 className='py-2 text-xs font-bold'>Géneros</h6>
            <ul className='list-disc'>
              {movieDetails.genres.map((genero, index) => (
                <li className='ml-7  text-xs' key={index}>{genero.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Tráiler Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          },
          content: {
            width: '90%',
            maxWidth: '800px',
            background: 'transparent',
            border: 'none',
          },
        }}>
        {trailerKey && (
          <iframe
            title="Tráiler"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
        <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded mt-4">Cerrar</button>
      </Modal>
    </div>
  );
};

export default MovieDetails;
