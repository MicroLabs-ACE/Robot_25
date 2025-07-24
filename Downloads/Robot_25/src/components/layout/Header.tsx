import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ChefHat, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isChef } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat size={28} className="text-orange-500" />
          <span className="text-2xl font-bold logo-text">OAK-Cafeteria</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to={
              !user
                ? "/"
                : user.role === "chef"
                ? "/chef/dashboard"
                : user.role === "customer"
                ? "/menu"
                : "/"
            }
            className={`font-medium transition-colors ${
              isActive("/")
                ? "text-orange-500 dark:text-orange-400"
                : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
            }`}
          >
            Home
          </Link>
          {isAuthenticated && user && user.role === "customer" && (
            <Link
              to="/menu"
              className={`font-medium transition-colors ${
                isActive("/menu")
                  ? "text-orange-500 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
              }`}
            >
              Menu
            </Link>
          )}
          {isAuthenticated && isChef ? (
            <Link
              to="/chef/dashboard"
              className={`font-medium transition-colors ${
                isActive("/chef/dashboard")
                  ? "text-orange-500 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
              }`}
            >
              Chef Dashboard
            </Link>
          ) : null}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link
              to={
                !user
                  ? "/"
                  : user.role === "chef"
                  ? "/chef/dashboard"
                  : user.role === "customer"
                  ? "/menu"
                  : "/"
              }
              className={`px-4 py-2 rounded-md font-medium ${
                isActive("/")
                  ? "bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && user && user.role === "customer" && (
              <Link
                to="/menu"
                className={`px-4 py-2 rounded-md font-medium ${
                  isActive("/menu")
                    ? "bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
            )}
            {isAuthenticated && isChef ? (
              <Link
                to="/chef/dashboard"
                className={`px-4 py-2 rounded-md font-medium ${
                  isActive("/chef/dashboard")
                    ? "bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Chef Dashboard
              </Link>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
