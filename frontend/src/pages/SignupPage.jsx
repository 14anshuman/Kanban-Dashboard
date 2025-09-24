import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!authContext) {
      setError('Auth service not available');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authContext.signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bunker">
      <div className="w-full max-w-md p-8 space-y-6 bg-bunker-light rounded-lg shadow-lg border border-bunker-lighter hover:transform hover:scale-101 shadow-blue-100 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-center text-black">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-bunker-lighter border-1 border-bunker-lighter rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-gray-700 p-3"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-bunker-lighter border-1 border-bunker-lighter rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-gray-700 p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-bunker-lighter border-1 border-bunker-lighter rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm text-gray-700 p-3"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer bg-black " disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-700">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
