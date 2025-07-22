import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, ArrowLeft, Lock } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      description: 'Visa, Mastercard, Verve',
      icon: CreditCard
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Building
    },
    {
      id: 'wallet',
      name: 'Mobile Wallet',
      description: 'Pay with mobile money',
      icon: Smartphone
    }
  ];

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart and redirect
      clearCart();
      toast.success('Payment successful! Your order is being prepared.');
      navigate('/delivery');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const deliveryFee = 500;
  const totalAmount = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-primary-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to proceed with payment</p>
            <button
              onClick={() => navigate('/order')}
              className="bg-primary-orange text-primary-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              className="flex items-center space-x-4"
            >
              <button
                onClick={() => navigate('/order')}
                className="text-primary-white hover:text-primary-orange transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-primary-white">
                  Secure <span className="text-primary-orange">Payment</span>
                </h1>
                <p className="text-xl text-gray-300 mt-2">
                  Complete your order with our secure payment system
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-primary-black mb-6">Choose Payment Method</h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-primary-orange bg-primary-orange/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        selectedMethod === method.id ? 'bg-primary-orange text-primary-white' : 'bg-gray-100'
                      }`}>
                        <method.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form */}
              {selectedMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-orange focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-orange focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-orange focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-orange focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedMethod === 'transfer' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Transfer Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-semibold">Risky Burger Ltd</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-semibold">7313132759</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-semibold">Monnify Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold text-primary-orange">₦{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-primary-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary-orange">₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-primary-orange text-primary-white py-4 rounded-lg font-semibold hover:bg-accent-orange transition-colors duration-200 flex items-center justify-center space-x-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="h-5 w-5" />
                <span>{processing ? 'Processing...' : `Pay ₦${totalAmount.toLocaleString()}`}</span>
              </button>

              <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;