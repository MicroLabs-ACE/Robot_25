import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginForm>();
  const signupForm = useForm<SignupForm>();

  const onLoginSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/home');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const onSignupSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await signup(data.email, data.password, data.name);
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black via-accent-gray to-primary-black flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg')] bg-cover bg-center" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-primary-orange/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src="/LOGO2.jpg" alt="Risky Burger" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary-white">
              {isLogin ? 'Welcome Back' : 'Join Risky Burger'}
            </h1>
            <p className="text-gray-300 mt-2">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-primary-black/30 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-primary-orange text-primary-white'
                  : 'text-gray-300 hover:text-primary-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-primary-orange text-primary-white'
                  : 'text-gray-300 hover:text-primary-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...loginForm.register('email', { required: 'Email is required' })}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-primary-black/30 border border-gray-600 rounded-lg text-primary-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...loginForm.register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 bg-primary-black/30 border border-gray-600 rounded-lg text-primary-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-orange text-primary-white py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...signupForm.register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-primary-black/30 border border-gray-600 rounded-lg text-primary-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                {signupForm.formState.errors.name && (
                  <p className="text-red-400 text-sm mt-1">{signupForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...signupForm.register('email', { required: 'Email is required' })}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-primary-black/30 border border-gray-600 rounded-lg text-primary-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                {signupForm.formState.errors.email && (
                  <p className="text-red-400 text-sm mt-1">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...signupForm.register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 bg-primary-black/30 border border-gray-600 rounded-lg text-primary-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-colors"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {signupForm.formState.errors.password && (
                  <p className="text-red-400 text-sm mt-1">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...signupForm.register('confirmPassword', { required: 'Please confirm your password' })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-4 py-3 bg-primary-black/30 border border-gray-600 rounded-lg text-primary-white placeholder-gray-400 focus:border-primary-orange focus:outline-none transition-colors"
                    placeholder="Confirm your password"
                  />
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-orange text-primary-white py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-primary-orange transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;