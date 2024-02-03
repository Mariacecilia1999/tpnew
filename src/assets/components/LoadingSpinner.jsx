import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-5 rounded-lg flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <FaSpinner className="mr-2 animate-spin" />
      <span>Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;
