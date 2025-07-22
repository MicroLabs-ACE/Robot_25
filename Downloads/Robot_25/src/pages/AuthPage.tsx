import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().optional(),
  role: z.enum(['customer', 'chef'])
});

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '' as 'customer' | 'chef'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (isRegistering) {
        const validatedData = userSchema.parse(formData);
        await register(
          validatedData.email,
          validatedData.password,
          validatedData.name,
          validatedData.role,
          validatedData.phoneNumber
        );
      } else {
        await login(formData.email, formData.password);
      }

      // Redirect based on role
      if (formData.role === 'chef') {
        navigate('/chef/dashboard');
      } else {
        navigate('/menu');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: 'customer' | 'chef') => {
    setFormData(prev => ({ ...prev, role }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg">
            <ChefHat size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to OAK-Cafeteria
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isRegistering ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        {isRegistering && !formData.role && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-6">
              Choose your role
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleRoleSelect('customer')}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-orange-500"
              >
                <User size={32} className="text-orange-500 mb-3" />
                <span className="font-medium text-gray-900 dark:text-white">Customer</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Order delicious meals
                </span>
              </button>
              
              <button
                onClick={() => handleRoleSelect('chef')}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-orange-500"
              >
                <ChefHat size={32} className="text-orange-500 mb-3" />
                <span className="font-medium text-gray-900 dark:text-white">Chef</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Manage orders & kitchen
                </span>
              </button>
            </div>
          </div>
        )}

        {(!isRegistering || formData.role) && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4">
            {isRegistering && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2\" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {formData.role === 'customer' && (
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`w-full pl-10 pr-12 py-2 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between mb-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : isRegistering ? 'Create Account' : 'Sign In'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setErrors({});
                }}
                className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-medium"
              >
                {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;