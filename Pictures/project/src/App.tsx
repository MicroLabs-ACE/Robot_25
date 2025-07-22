import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import DeliveryPage from './pages/DeliveryPage';
import LocationPage from './pages/LocationPage';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-primary-white">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/location" element={<LocationPage />} />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#111111',
                  color: '#FAF9F6',
                  border: '1px solid #F55C16',
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;