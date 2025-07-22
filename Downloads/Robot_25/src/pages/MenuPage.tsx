import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ShoppingCart, Utensils, Coffee, Plus, Minus } from 'lucide-react';
import { menuItems, comboMeals, MenuItem, ComboMeal } from '../data/menuData';
import { formatCurrency } from '../utils/formatCurrency';
import { useFirebase } from '../hooks/useFirebase';

const tableOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isCombo: boolean;
}

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'main' | 'side' | 'drink' | 'combo'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { placeOrder } = useFirebase();

  const filteredMenuItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem | ComboMeal, isCombo: boolean) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.isCombo === isCombo
      );
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          isCombo
        }];
      }
    });
    
    toast.success(`${item.name} added to cart`);
  };

  const updateQuantity = (index: number, change: number) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const newQuantity = updatedCart[index].quantity + change;
      
      if (newQuantity <= 0) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index].quantity = newQuantity;
      }
      
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = async () => {
    if (!tableNumber) {
      toast.error('Please select a table number');
      return;
    }
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          isCombo: item.isCombo
        })),
        tableNumber,
        totalAmount: calculateTotal(),
        status: 'pending',
        timestamp: new Date().toISOString()
      };
      
      await placeOrder(orderData);
      
      toast.success('Order placed successfully!');
      setCart([]);
      setTableNumber('');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Our Menu</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Explore our delicious selection of meals, sides and drinks
      </p>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button 
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All Items
        </button>
        <button 
          onClick={() => setActiveCategory('main')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'main' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span className="flex items-center">
            <Utensils size={14} className="mr-1" />
            Main Dishes
          </span>
        </button>
        <button 
          onClick={() => setActiveCategory('side')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'side' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Sides
        </button>
        <button 
          onClick={() => setActiveCategory('drink')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'drink' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <span className="flex items-center">
            <Coffee size={14} className="mr-1" />
            Drinks
          </span>
        </button>
        <button 
          onClick={() => setActiveCategory('combo')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'combo' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          Combo Meals
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Menu Items */}
        {activeCategory !== 'combo' && filteredMenuItems.map((item) => (
          <div key={item.id} className="card overflow-hidden hover:shadow-lg transition-all">
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <span className="font-bold text-orange-500">{formatCurrency(item.price)}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>
              <button 
                onClick={() => handleAddToCart(item, false)}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Order
              </button>
            </div>
          </div>
        ))}
        
        {/* Combo Meals */}
        {(activeCategory === 'all' || activeCategory === 'combo') && comboMeals.map((combo) => (
          <div key={combo.id} className="card overflow-hidden hover:shadow-lg transition-all border-2 border-orange-100 dark:border-orange-900">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={combo.image} 
                alt={combo.name} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1">
                Save {formatCurrency(combo.savings)}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{combo.name}</h3>
                <span className="font-bold text-orange-500">{formatCurrency(combo.price)}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {combo.items.map(itemId => {
                  const item = menuItems.find(i => i.id === itemId);
                  return item ? item.name : '';
                }).join(' + ')}
              </p>
              <button 
                onClick={() => handleAddToCart(combo, true)}
                className="w-full btn btn-primary flex items-center justify-center"
              >
                <ShoppingCart size={16} className="mr-2" />
                Add Combo to Order
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Order Summary */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Order</h2>
        
        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Your cart is empty. Add some items to place an order.
          </p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.name} {item.isCombo && <span className="text-xs text-orange-500 font-bold">(Combo)</span>}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">{formatCurrency(item.price)} × {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => updateQuantity(index, -1)}
                      className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(index, 1)}
                      className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="ml-4 font-medium text-gray-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-lg font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Total:</span>
              <span className="text-orange-500">{formatCurrency(calculateTotal())}</span>
            </div>
            
            <div className="mb-6">
              <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Your Table
              </label>
              <select
                id="tableNumber"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="input"
                required
              >
                <option value="">Select a table</option>
                {tableOptions.map((table) => (
                  <option key={table} value={table}>Table {table}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleSubmitOrder}
              disabled={isSubmitting || cart.length === 0 || !tableNumber}
              className="w-full btn btn-primary py-3 text-lg flex items-center justify-center"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;