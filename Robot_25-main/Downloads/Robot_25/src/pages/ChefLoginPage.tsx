import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChefHat, Key, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFirebase } from '../hooks/useFirebase';

const ChefLoginPage: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setIsChef } = useAuth();
  const { verifyChefKey } = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessKey.trim()) {
      toast.error('Please enter your access key');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const isValidKey = await verifyChefKey(accessKey);
      
      if (isValidKey) {
        setIsChef(true);
        localStorage.setItem('chefKey', accessKey); // Store the key for later use
        toast.success('Login successful!');
        navigate('/chef/dashboard');
      } else {
        toast.error('Invalid access key');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <ChefHat size={32} className="text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chef Login</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your access key to access the Chef Dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="accessKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Access Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                id="accessKey"
                name="accessKey"
                type="password"
                required
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="input pl-10"
                placeholder="Enter your chef access key"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-3 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need an access key? Contact the cafeteria admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefLoginPage;