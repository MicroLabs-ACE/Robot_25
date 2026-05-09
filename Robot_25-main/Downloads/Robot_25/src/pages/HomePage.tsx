import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, UtensilsCrossed, Zap, Bot, Clock } from 'lucide-react';

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to <span className="block mt-2">OAK-Cafeteria</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The future of dining is here. Order delicious meals from your table and enjoy robot delivery service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/menu" className="btn bg-white text-orange-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg transition hover:scale-105">
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
            
            <div className="card p-8 hover:shadow-lg transition-shadow border text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Delicious Food</h3>
              <p>
                Enjoy our wide selection of traditional and contemporary dishes, prepared with the freshest ingredients.
              </p>
            </div>

            <div className="card p-8 hover:shadow-lg transition-shadow border text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Ordering</h3>
              <p>
                Place your order from your table using our digital menu system.
              </p>
            </div>

            <div className="card p-8 hover:shadow-lg transition-shadow border text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Robot Delivery</h3>
              <p>
                Our smart robots deliver your food right to your table.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="mb-12">
            Experience the future of dining with our simple 3-step process
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold">1. Browse & Order</h3>
              <p>Choose your meal from the digital menu.</p>
            </div>

            <div>
              <h3 className="font-semibold">2. Chef Prepares</h3>
              <p>Fresh meals prepared quickly.</p>
            </div>

            <div>
              <h3 className="font-semibold">3. Robot Delivers</h3>
              <p>Delivered directly to your table.</p>
            </div>
          </div>

          <div className="mt-10">
            <Link to="/menu" className="btn btn-primary inline-flex items-center gap-2">
              Order Now <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Offers</h2>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            
            <div className="card p-6 border">
              <h3 className="font-semibold">Rice & Meat + Coke</h3>
              <p>₦3,400</p>
              <div className="flex justify-center items-center gap-2 mt-2">
                <Clock size={16} />
                <span>15 mins</span>
              </div>
            </div>

            <div className="card p-6 border">
              <h3 className="font-semibold">Jollof Rice Combo</h3>
              <p>₦5,500</p>
              <div className="flex justify-center items-center gap-2 mt-2">
                <Clock size={16} />
                <span>20 mins</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;