import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus, ShoppingCart, Clock, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const OrderPage: React.FC = () => {
  const { items, addItem, updateQuantity, removeItem, total, itemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('combos');

  const products = {
    combos: [
      {
        id: 'risky-combo',
        name: 'Risky Burger Combo',
        price: 2500,
        image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
        description: 'Toasted bread sandwich with fried egg, mixed veggies, fried meat pack, and fruit slices',
        rating: 4.8,
        time: '25 min',
        customizations: ['Extra Meat (+₦500)', 'Extra Veggies (+₦200)', 'Spicy Sauce (+₦100)']
      }
    ],
    drinks: [
      {
        id: 'zobo-drink',
        name: 'Zobo Herbal Drink',
        price: 800,
        image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
        description: 'Multi-nutritional Nigerian herbal drink with health benefits',
        rating: 4.6,
        time: '15 min',
        customizations: ['Large Size (+₦200)', 'Extra Ginger (+₦100)']
      },
      {
        id: 'bottled-water',
        name: 'Premium Bottled Water',
        price: 300,
        image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg',
        description: 'Clean, chilled bottled water for perfect hydration',
        rating: 4.9,
        time: '10 min',
        customizations: []
      }
    ]
  };

  const categories = [
    { id: 'combos', name: 'Combos', icon: '🍔' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' }
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast.success(`${product.name} added to cart!`);
  };

  const getCartItemQuantity = (productId: string) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-primary-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary-black to-accent-gray py-12">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-black text-primary-white mb-4">
                Order Your <span className="text-primary-orange">Risky Meal</span>
              </h1>
              <p className="text-xl text-gray-300">
                Bold flavors, clean ingredients, delivered fast
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <div className="flex space-x-4 mb-8 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary-orange text-primary-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-semibold">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="space-y-6">
                {products[selectedCategory as keyof typeof products].map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-primary-black mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm">{product.time}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-orange mb-4">
                              ₦{product.price.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Customizations */}
                        {product.customizations.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-700 mb-2">Customizations:</h4>
                            <div className="flex flex-wrap gap-2">
                              {product.customizations.map((custom, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {custom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Add to Cart Controls */}
                        <div className="flex items-center justify-between">
                          {getCartItemQuantity(product.id) > 0 ? (
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(product.id, getCartItemQuantity(product.id) - 1)}
                                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-xl font-semibold w-8 text-center">
                                {getCartItemQuantity(product.id)}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, getCartItemQuantity(product.id) + 1)}
                                className="w-10 h-10 bg-primary-orange text-primary-white rounded-full flex items-center justify-center hover:bg-accent-orange transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="bg-primary-orange text-primary-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors duration-200 flex items-center space-x-2"
                            >
                              <ShoppingCart className="h-5 w-5" />
                              <span>Add to Cart</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="text-2xl font-bold text-primary-black mb-6 flex items-center space-x-2">
                  <ShoppingCart className="h-6 w-6" />
                  <span>Your Order</span>
                </h3>

                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-600">₦{item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-primary-orange text-primary-white rounded-full flex items-center justify-center hover:bg-accent-orange transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₦{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-semibold">₦500</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                        <span>Total</span>
                        <span className="text-primary-orange">₦{(total + 500).toLocaleString()}</span>
                      </div>
                    </div>

                    <Link
                      to="/payment"
                      className="w-full bg-primary-orange text-primary-white py-4 rounded-lg font-semibold hover:bg-accent-orange transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Payment</span>
                      <span>({itemCount} items)</span>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;