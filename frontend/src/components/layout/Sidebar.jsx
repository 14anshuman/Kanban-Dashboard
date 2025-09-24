import React from 'react';
import { NavLink } from 'react-router-dom';

const BarChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center px-4 py-2 mt-2 text-gray-400 rounded-lg hover:bg-bunker-lighter hover:text-gray-200 transition-colors duration-200 ${
        isActive ? 'bg-bunker-lighter text-gray-200' : ''
      }`
    }
  >
    {children}
  </NavLink>
);

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-bunker border-r border-bunker-lighter">
      <div className="flex items-center justify-center h-16 border-b border-bunker-lighter">
        <h1 className="text-2xl font-bold text-gray-900">Kanban</h1>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <nav>
          <NavItem to="/">
            <BarChartIcon />
            <span className="mx-4 font-medium text-gray-900">Dashboard</span>
          </NavItem>
          <NavItem to="/projects">
            <FolderIcon />
            <span className="mx-4 font-medium text-gray-900">Projects</span>
          </NavItem>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
