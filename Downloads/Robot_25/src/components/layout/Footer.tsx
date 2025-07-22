import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat size={24} className="text-orange-500" />
              <span className="text-xl font-bold logo-text">OAK-Cafeteria</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">
              Modern smart cafeteria with delicious food and robot delivery service. 
              Enjoy your meals with an innovative dining experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/chef/login" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  Chef Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">123 Campus Drive, University Area</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+234 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">info@oak-cafeteria.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} OAK-Cafeteria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;