import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import KanbanPage from './pages/KanbanPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) return <div className="text-center p-8">Loading...</div>;

  const { isAuthenticated } = authContext;

  return (
    // <div className="flex h-screen bg-bunker text-gray-200">
      

        <main className="h-full overflow-y-auto bg-bunker-light mt-2">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
            />
            
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />}
            />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:projectId" element={<KanbanPage />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
     
  );
};

export default App;
