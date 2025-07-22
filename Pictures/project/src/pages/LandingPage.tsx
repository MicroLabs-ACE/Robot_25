import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Shield, MapPin } from 'lucide-react';
import Navigation from '../components/Navigation';

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [currentSection, setCurrentSection] = useState(0);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollPosition / windowHeight);
      setCurrentSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navigation />
      
      {/* Hero Section - The Risky Burger Unwrapped */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary-black via-accent-gray to-primary-black">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg')] bg-cover bg-center" />
        </motion.div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <img 
                src="/LOGO3.png" 
                alt="Risky Burger Logo" 
                className="h-24 w-auto mx-auto mb-6"
              />
            </motion.div>

            <motion.h1
              style={{ y: textY }}
              className="text-5xl md:text-7xl font-black text-primary-white mb-6 leading-tight"
            >
              Eat Bold. <span className="text-primary-orange">Eat Clean.</span>
              <br />
              <span className="text-primary-orange">Delivered Fast.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Experience Nigeria's boldest burger combo - toasted perfection with fried egg, mixed veggies, premium meat, and fresh fruit slices.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/auth"
                className="group bg-primary-orange text-primary-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent-orange transition-all duration-300 flex items-center space-x-2"
              >
                <span>Order Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="text-primary-white border border-primary-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-white hover:text-primary-black transition-all duration-300">
                Watch Story
              </button>
            </motion.div>

            {/* Floating Burger Animation */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 right-10 hidden lg:block"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-primary-orange to-accent-orange rounded-full opacity-80 blur-xl" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-white"
        >
          <div className="w-6 h-10 border-2 border-primary-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Nutritional Breakdown Section */}
      <section className="min-h-screen bg-gradient-to-br from-primary-white to-accent-light py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-primary-black mb-6">
              Nutrition <span className="text-primary-orange">Meets</span> Flavor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every Risky Burger combo is carefully crafted to deliver maximum nutrition without compromising on taste.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🥪",
                title: "Premium Burger",
                description: "Toasted bread with fried egg and fresh mixed vegetables",
                nutrients: ["Protein: 25g", "Fiber: 8g", "Vitamins: A, B, C"]
              },
              {
                icon: "🥩",
                title: "Fried Meat Pack",
                description: "Sealed package of perfectly seasoned fried meat",
                nutrients: ["Protein: 30g", "Iron: 15mg", "B-Vitamins"]
              },
              {
                icon: "🍎",
                title: "Fresh Fruit Slices",
                description: "Seasonal fruit slices packed with natural vitamins",
                nutrients: ["Vitamin C: 60mg", "Antioxidants", "Natural Sugars"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-primary-black mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.nutrients.map((nutrient, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-primary-orange" />
                      <span className="text-sm text-gray-700">{nutrient}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle & Delivery Section */}
      <section className="min-h-screen bg-gradient-to-br from-primary-black to-accent-gray py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-primary-white mb-6">
              Delivered to You — <span className="text-primary-orange">Wherever You Are</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From office breaks to late-night cravings, we bring bold flavors right to your doorstep.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Features */}
            <div className="space-y-8">
              {[
                {
                  icon: Clock,
                  title: "Lightning Fast Delivery",
                  description: "Average delivery time of 25 minutes or less"
                },
                {
                  icon: Shield,
                  title: "Quality Guaranteed",
                  description: "Fresh ingredients, sealed packaging, temperature controlled"
                },
                {
                  icon: MapPin,
                  title: "Anywhere in Lagos",
                  description: "We deliver to every corner of Lagos State"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-primary-orange p-3 rounded-full">
                    <feature.icon className="h-6 w-6 text-primary-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              {[
                {
                  name: "Adebayo O.",
                  role: "Software Developer",
                  text: "Perfect for my lunch breaks. Healthy, filling, and always on time!"
                },
                {
                  name: "Kemi A.",
                  role: "Marketing Executive",
                  text: "Finally, fast food that doesn't make me feel guilty. Love the fresh ingredients!"
                },
                {
                  name: "Tunde M.",
                  role: "Student",
                  text: "The delivery is incredibly fast and the packaging keeps everything fresh."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-primary-orange/20"
                >
                  <p className="text-primary-white mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-primary-orange">{testimonial.name}</p>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/auth"
              className="inline-flex items-center space-x-2 bg-primary-orange text-primary-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-accent-orange transition-all duration-300 group"
            >
              <span>Start Your Risky Journey</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;