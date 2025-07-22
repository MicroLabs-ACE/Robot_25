import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Clock, Star, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { addItem } = useCart();

  const featuredProducts = [
    {
      id: 'risky-combo',
      name: 'Risky Burger Combo',
      price: 2500,
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
      description: 'Toasted bread sandwich with fried egg, mixed veggies, fried meat pack, and fruit slices',
      rating: 4.8,
      time: '25 min'
    },
    {
      id: 'zobo-drink',
      name: 'Zobo Herbal Drink',
      price: 800,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
      description: 'Multi-nutritional Nigerian herbal drink with health benefits',
      rating: 4.6,
      time: '15 min'
    },
    {
      id: 'bottled-water',
      name: 'Premium Bottled Water',
      price: 300,
      image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg',
      description: 'Clean, chilled bottled water for perfect hydration',
      rating: 4.9,
      time: '10 min'
    }
  ];

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-primary-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-primary-black to-accent-gray py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-black text-primary-white mb-4">
                Welcome back, <span className="text-primary-orange">{user?.name}</span>!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Ready for another bold and clean meal experience?
              </p>
              <Link
                to="/order"
                className="inline-flex items-center space-x-2 bg-primary-orange text-primary-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-orange transition-all duration-300 group"
              >
                <span>Start Ordering</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-black text-primary-black mb-4">
                Featured <span className="text-primary-orange">Products</span>
              </h2>
              <p className="text-xl text-gray-600">
                Our most popular items, loved by customers across Lagos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary-orange text-primary-white px-3 py-1 rounded-full text-sm font-semibold">
                      ₦{product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-black mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{product.time}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-primary-orange text-primary-white py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-accent-light">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-black text-primary-black mb-4">
                Quick <span className="text-primary-orange">Actions</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Reorder Last Meal',
                  description: 'Get your favorite combo again',
                  icon: '🔄',
                  action: '/order'
                },
                {
                  title: 'Track Order',
                  description: 'See where your food is',
                  icon: '📍',
                  action: '/delivery'
                },
                {
                  title: 'Update Location',
                  description: 'Change delivery address',
                  icon: '🏠',
                  action: '/location'
                },
                {
                  title: 'View Menu',
                  description: 'Browse all our products',
                  icon: '📋',
                  action: '/order'
                }
              ].map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link
                    to={action.action}
                    className="block bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <div className="text-4xl mb-4">{action.icon}</div>
                    <h3 className="text-lg font-bold text-primary-black mb-2 group-hover:text-primary-orange transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600">{action.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promotions */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-primary-orange to-accent-orange rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-black text-primary-white mb-4">
                Special Offer!
              </h2>
              <p className="text-xl text-primary-white mb-8">
                Get 20% off your next order when you refer a friend
              </p>
              <button className="bg-primary-white text-primary-orange px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Share & Save
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;