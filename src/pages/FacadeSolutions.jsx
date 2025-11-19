import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Award, Users } from 'lucide-react';
import '../styles/neumorphism.css';

const FacadeSolutions = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const facadeCards = [
    {
      id: 1,
      title: "Стеклянные фасады",
      subtitle: "Современные решения из закаленного стекла",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      description: "Панорамные фасады с высокими теплоизоляционными свойствами",
      features: ["Энергоэффективность", "Долговечность", "Эстетика"]
    },
    {
      id: 2,
      title: "Металлические панели",
      subtitle: "Композитные материалы нового поколения",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      description: "Прочные и легкие панели с уникальными цветовыми решениями",
      features: ["Малый вес", "Пожаробезопасность", "Разнообразие"]
    },
    {
      id: 3,
      title: "Керамогранит",
      subtitle: "Натуральная красота и надежность",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
      description: "Искусственный камень с характеристиками природного",
      features: ["Морозостойкость", "Устойчивость к УФ", "Легкий уход"]
    },
    {
      id: 4,
      title: "Вентилируемые фасады",
      subtitle: "Инновационная система крепления",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: "Эффективная теплоизоляция с естественной вентиляцией",
      features: ["Теплоизоляция", "Вентиляция", "Долговечность"]
    },
    {
      id: 5,
      title: "Деревянные фасады",
      subtitle: "Экологичность и тепло",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      description: "Натуральные материалы для создания уютной атмосферы",
      features: ["Экологичность", "Теплоизоляция", "Естественность"]
    }
  ];

  const stats = [
    { number: "500+", label: "Реализованных проектов" },
    { number: "15", label: "Лет опыта" },
    { number: "50+", label: "Сотрудников" },
    { number: "100%", label: "Довольных клиентов" }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % facadeCards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [facadeCards.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EBEE] to-[#FFFFFF]">
      {/* Glassmorphism Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/20 border-b border-white/10"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: "#f8f9fa",
                  boxShadow: "inset 4px 4px 8px #e9ecef, inset -4px -4px 8px #ffffff"
                }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg"></div>
              </div>
              <span className="text-2xl font-manrope font-bold text-gray-800 tracking-tight">
                Фасадные решения
              </span>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Главная', 'О нас', 'Каталог', 'Проекты', 'Контакты'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-gray-700 hover:text-gray-900 font-inter font-medium transition-colors duration-300 relative group"
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 group-hover:w-full"></div>
                </motion.a>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-2xl font-inter font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              }}
            >
              Получить консультацию
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-manrope font-bold text-gray-800 mb-8 tracking-tight">
              Современные
              <span className="block bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                фасадные решения
              </span>
            </h1>
            <p className="text-2xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Создаем уникальные фасады, которые сочетают эстетическое совершенство 
              и функциональную эффективность для вашего здания
            </p>
          </motion.div>

          {/* Interactive Slider */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 100 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
              <AnimatePresence mode="wait">
                {facadeCards.map((card, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.6,
                        scale: isActive ? 1.05 : 1,
                        y: 0
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.08,
                        y: -10,
                        transition: { duration: 0.3 }
                      }}
                      className={`relative cursor-pointer group ${
                        isActive ? 'lg:col-span-2 lg:row-span-2' : ''
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div
                        className="relative overflow-hidden rounded-3xl h-80"
                        style={{
                          background: "#f8f9fa",
                          boxShadow: isActive 
                            ? "20px 20px 40px #e9ecef, -20px -20px 40px #ffffff"
                            : "8px 8px 16px #e9ecef, -8px -8px 16px #ffffff"
                        }}
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onLoad={() => console.log(`✅ Фасад загружен: ${card.title}`)}
                          onError={(e) => {
                            console.error(`❌ Ошибка загрузки фасада: ${card.title} - ${card.image}`);
                            e.target.src = '/images/placeholder.svg';
                          }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl font-manrope font-bold mb-2"
                          >
                            {card.title}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-200 font-inter mb-4"
                          >
                            {card.subtitle}
                          </motion.p>
                          
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 }}
                              className="space-y-2"
                            >
                              <p className="text-gray-300 font-inter text-sm mb-3">
                                {card.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {card.features.map((feature, featureIndex) => (
                                  <span
                                    key={featureIndex}
                                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-inter"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mb-16">
              {facadeCards.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-3xl"
                style={{
                  background: "#f8f9fa",
                  boxShadow: "inset 8px 8px 16px #e9ecef, inset -8px -8px 16px #ffffff"
                }}
              >
                <div className="text-4xl font-manrope font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-inter text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Glassmorphism Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-20 py-12 px-6"
        style={{
          background: "rgba(248, 249, 250, 0.8)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "inset 0 8px 32px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "#f8f9fa",
                boxShadow: "inset 4px 4px 8px #e9ecef, inset -4px -4px 8px #ffffff"
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg"></div>
            </div>
            <span className="text-xl font-manrope font-bold text-gray-800">
              Фасадные решения
            </span>
          </div>
          <p className="text-gray-600 font-inter">
            © 2025 Фасадные решения. Все права защищены.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default FacadeSolutions;
