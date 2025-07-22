import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Phone, CheckCircle, Truck, Package, Home } from 'lucide-react';
import Navigation from '../components/Navigation';

const DeliveryPage: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState('preparing');
  const [estimatedTime, setEstimatedTime] = useState(25);
  const navigate = useNavigate();

  const statusSteps = [
    { id: 'preparing', label: 'Preparing', icon: Package, description: 'Your order is being prepared' },
    { id: 'transit', label: 'In Transit', icon: Truck, description: 'Your order is on the way' },
    { id: 'delivered', label: 'Delivered', icon: Home, description: 'Order delivered successfully' }
  ];

  useEffect(() => {
    // Simulate order progress
    const timer1 = setTimeout(() => {
      setOrderStatus('transit');
      setEstimatedTime(15);
    }, 5000);

    const timer2 = setTimeout(() => {
      setOrderStatus('delivered');
      setEstimatedTime(0);
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.id === orderStatus);
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
                Track Your <span className="text-primary-orange">Order</span>
              </h1>
              <p className="text-xl text-gray-300">
                Order #RB-2024-001 • Estimated delivery: {estimatedTime} minutes
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-primary-black mb-8 text-center">Order Status</h2>
            
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-primary-orange rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: `${((getCurrentStepIndex() + 1) / statusSteps.length) * 100}%` 
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>

              {/* Status Steps */}
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const isActive = index <= getCurrentStepIndex();
                  const isCurrent = index === getCurrentStepIndex();
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                          isActive
                            ? 'bg-primary-orange border-primary-orange text-primary-white'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}
                        animate={isCurrent ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                      >
                        <step.icon className="h-6 w-6" />
                      </motion.div>
                      <div className="mt-4 text-center">
                        <h3 className={`font-semibold ${isActive ? 'text-primary-orange' : 'text-gray-400'}`}>
                          {step.label}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Delivery Map */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-primary-black mb-4 flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-primary-orange" />
                <span>Live Tracking</span>
              </h3>
              
              {/* Mock Map */}
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                  {/* Mock roads */}
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-400 transform -translate-x-1/2"></div>
                  
                  {/* Restaurant marker */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-orange rounded-full border-2 border-white shadow-lg"></div>
                  
                  {/* Delivery location */}
                  <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  
                  {/* Moving delivery icon */}
                  <motion.div
                    className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    animate={{
                      x: [60, 180, 240],
                      y: [80, 120, 160]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Truck className="h-3 w-3 text-white" />
                  </motion.div>
                </div>
                
                <div className="relative z-10 text-center">
                  <p className="text-gray-600 mb-2">Live tracking will appear here</p>
                  <p className="text-sm text-gray-500">Rider: Ahmed O. • Phone: +234 801 234 5678</p>
                </div>
              </div>

              {orderStatus !== 'delivered' && (
                <div className="mt-4 p-4 bg-primary-orange/10 rounded-lg">
                  <div className="flex items-center space-x-2 text-primary-orange">
                    <Clock className="h-5 w-5" />
                    <span className="font-semibold">
                      Estimated arrival: {estimatedTime} minutes
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Order Details & Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary-black mb-4">Delivery Address</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-orange mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Home</p>
                    <p className="text-gray-600">123 Admiralty Way, Lekki Phase 1, Lagos</p>
                    <p className="text-sm text-gray-500 mt-1">Landmark: Near Shoprite</p>
                  </div>
                </div>
              </div>

              {/* Contact Rider */}
              {orderStatus === 'transit' && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-primary-black mb-4">Contact Rider</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center">
                        <span className="text-primary-white font-bold">AO</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Ahmed Okafor</p>
                        <p className="text-sm text-gray-600">Delivery Rider</p>
                      </div>
                    </div>
                    <button className="w-full bg-primary-orange text-primary-white py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors flex items-center justify-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <span>Call Rider</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Order Complete */}
              {orderStatus === 'delivered' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Order Delivered!</h3>
                  <p className="text-green-600 mb-6">
                    Your Risky Burger has been delivered successfully. Enjoy your meal!
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/home')}
                      className="w-full bg-primary-orange text-primary-white py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors"
                    >
                      Order Again
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Rate Your Experience
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary-black mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">1x Risky Burger Combo</span>
                    <span className="font-semibold">₦2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">1x Zobo Drink</span>
                    <span className="font-semibold">₦800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">₦500</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total Paid</span>
                    <span className="text-primary-orange">₦3,800</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;