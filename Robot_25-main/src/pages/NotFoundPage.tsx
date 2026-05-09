import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. Perhaps you're hungry? Check out our menu instead!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn btn-primary inline-flex items-center justify-center">
            <Home size={18} className="mr-2" />
            Go Home
          </Link>
          <Link to="/menu" className="btn btn-outline">
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;