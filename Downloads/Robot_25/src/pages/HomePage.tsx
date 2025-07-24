import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ChevronRight, UtensilsCrossed, Zap, Notebook as Robot, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white flex justify-center items-center py-24 overflow-hidden h-[80vh]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="block mt-2">OAK-Cafeteria</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
              The future of dining is here. Order delicious meals from your table and enjoy robot delivery service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
              <Link to="/menu" className="btn bg-white text-orange-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg transform transition hover:scale-105">
                View Menu
              </Link>
              <a href="#how-it-works" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition">
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Boxes */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Delicious Food</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy our wide selection of traditional and contemporary dishes, prepared with the freshest ingredients.
              </p>
            </div>
            
            <div className="card p-8 hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Fast Ordering</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Place your order from your table using our digital menu system. No waiting in line or flagging down servers.
              </p>
            </div>
            
            <div className="card p-8 hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Robot size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Robot Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our smart robots deliver your food right to your table, ensuring a contactless and efficient experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of dining with our simple 3-step process
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Browse & Order</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse our digital menu and place your order directly from your table.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Chef Prepares</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our skilled chefs prepare your meal with fresh ingredients and careful attention.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Robot Delivers</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our robot delivers your meal directly to your table for a contactless experience.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/menu" className="btn btn-primary inline-flex items-center space-x-2">
                <span>Order Now</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Special Offers</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Enjoy great value with our combo meals and daily specials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Combo meal" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Save ₦200
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Rice & Meat + Coke</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our popular rice and meat combo with a refreshing Coke. Perfect for lunch or dinner.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-orange-500 font-bold text-xl">₦3,400</span>
                    <span className="text-gray-400 line-through ml-2">₦3,600</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={16} className="mr-1" />
                    <span>Ready in 15 mins</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Combo meal" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Save ₦500
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Jollof Rice & Bigger Chicken + Moi-Moi</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our signature jollof rice with a generous portion of chicken and a side of Moi-Moi.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-orange-500 font-bold text-xl">₦5,500</span>
                    <span className="text-gray-400 line-through ml-2">₦6,000</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={16} className="mr-1" />
                    <span>Ready in 20 mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/menu" className="btn btn-outline">
              View All Specials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;