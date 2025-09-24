import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) return null;

  const { user, logout } = authContext;

  return (
    <header className="flex items-center justify-between p-4 bg-bunker-light border-b border-bunker-lighter h-16">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-900">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="px-4 pr-2 py-2 text-sm font-medium  cursor-pointer text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bunker focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
