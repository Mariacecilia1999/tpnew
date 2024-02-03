import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLatestReleases = location.pathname === '/latest-releases';
  const isPopular = location.pathname === '/popular';
  const isSearch = location.pathname === '/search';

  return (
    <header className="bg-gray-800 py-3 text-white">
      <nav className="container mx-auto">
        <ul className="flex flex-wrap items-center h-full space-x-4">
          <li className="nav-item w-full sm:w-auto mb-2 sm:mb-0">
            <Link
              to="/"
              className={`nav-link px-4 py-3 text-sm lg:text-xs ${
                isHome ? 'text-white bg-blue-500 h-full' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item w-full sm:w-auto mb-2 sm:mb-0">
            <Link
              to="/latest-releases"
              className={`nav-link px-4 py-3 text-sm lg:text-xs ${
                isLatestReleases ? 'text-white bg-blue-500 h-full' : ''
              }`}
            >
              Últimos Lanzamientos
            </Link>
          </li>
          <li className="nav-item w-full sm:w-auto mb-2 sm:mb-0">
            <Link
              to="/popular"
              className={`nav-link px-4 py-3 text-sm lg:text-xs ${
                isPopular ? 'text-white bg-blue-500 h-full' : ''
              }`}
            >
              Populares
            </Link>
          </li>
          <li className="nav-item w-full sm:w-auto mb-2 sm:mb-0">
            <Link
              to="/search"
              className={`nav-link px-4 py-3 text-sm lg:text-xs ${
                isSearch ? 'text-white bg-blue-500 h-full' : ''
              }`}
            >
              Buscar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
