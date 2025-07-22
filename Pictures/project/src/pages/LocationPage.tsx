import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit, Trash2, Navigation as NavigationIcon, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import toast from 'react-hot-toast';

const LocationPage: React.FC = () => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      label: 'Home',
      address: '123 Admiralty Way, Lekki Phase 1, Lagos',
      landmark: 'Near Shoprite',
      isDefault: true
    },
    {
      id: '2',
      label: 'Office',
      address: '45 Adeola Odeku Street, Victoria Island, Lagos',
      landmark: 'Opposite GTBank',
      isDefault: false
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    landmark: ''
  });
  
  const navigate = useNavigate();

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    const address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, address]);
    setNewAddress({ label: '', address: '', landmark: '' });
    setShowAddForm(false);
    toast.success('Address added successfully!');
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.success('Address deleted successfully!');
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success('Default address updated!');
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success('Current location detected!');
          // In a real app, you would reverse geocode the coordinates
          setNewAddress({
            ...newAddress,
            address: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
          });
        },
        (error) => {
          toast.error('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
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
              className="flex items-center space-x-4"
            >
              <button
                onClick={() => navigate('/home')}
                className="text-primary-white hover:text-primary-orange transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-primary-white">
                  Delivery <span className="text-primary-orange">Locations</span>
                </h1>
                <p className="text-xl text-gray-300 mt-2">
                  Manage your delivery addresses
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Add New Address Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary-orange text-primary-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Address</span>
            </button>
          </motion.div>

          {/* Add Address Form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-primary-black mb-6">Add New Address</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Label *
                  </label>
                  <input
                    type="text"
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                    placeholder="e.g., Home, Office, Friend's Place"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <div className="relative">
                    <textarea
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      placeholder="Enter your full address"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-orange focus:outline-none"
                    />
                    <button
                      onClick={handleUseCurrentLocation}
                      className="absolute top-2 right-2 text-primary-orange hover:text-accent-orange transition-colors"
                      title="Use current location"
                    >
                      <NavigationIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={newAddress.landmark}
                    onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                    placeholder="e.g., Near Shoprite, Opposite GTBank"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-orange focus:outline-none"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddAddress}
                    className="bg-primary-orange text-primary-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-orange transition-colors"
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Saved Addresses */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-black">Saved Addresses</h2>
            
            {addresses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No addresses saved</h3>
                <p className="text-gray-500">Add your first delivery address to get started</p>
              </motion.div>
            ) : (
              addresses.map((address, index) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-200 ${
                    address.isDefault ? 'border-primary-orange' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${
                        address.isDefault ? 'bg-primary-orange text-primary-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <MapPin className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-bold text-primary-black">{address.label}</h3>
                          {address.isDefault && (
                            <span className="bg-primary-orange text-primary-white text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">{address.address}</p>
                        {address.landmark && (
                          <p className="text-sm text-gray-500">Landmark: {address.landmark}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="text-gray-400 hover:text-primary-orange transition-colors"
                          title="Set as default"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete address"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {!address.isDefault && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-primary-orange hover:text-accent-orange font-semibold transition-colors"
                      >
                        Set as Default
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Map Integration Note */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-accent-light rounded-2xl p-6 mt-8"
          >
            <h3 className="text-lg font-bold text-primary-black mb-3">📍 Interactive Map</h3>
            <p className="text-gray-600 mb-4">
              In the full version, you'll be able to pin your exact location on an interactive map 
              and get real-time GPS tracking for your deliveries.
            </p>
            <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Coming Soon</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;