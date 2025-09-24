import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-200">Page Not Found</h2>
      <p className="text-gray-400 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg font-semibold bg-primary text-white rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bunker-light focus:ring-primary"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
