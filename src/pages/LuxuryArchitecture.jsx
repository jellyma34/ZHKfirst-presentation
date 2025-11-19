import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Building2, Award, Users, Star, ChevronRight } from 'lucide-react';
import '../styles/luxury-architecture.css';

const LuxuryArchitecture = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);

  const solutions = [
    {
      id: 1,
      title: "Стеклянные фасады",
      subtitle: "Панорамные решения",
      description: "Современные стеклянные системы с высокими теплоизоляционными свойствами",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      category: "Материалы"
    },
    {
      id: 2,
      title: "Металлические панели",
      subtitle: "Композитные системы",
      description: "Легкие и прочные панели с уникальными цветовыми решениями",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      category: "Технологии"
    },
    {
      id: 3,
      title: "Вентилируемые фасады",
      subtitle: "Инновационные решения",
      description: "Эффективная теплоизоляция с естественной вентиляцией",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      category: "Системы"
    }
  ];

  const stats = [
    { number: "500+", label: "Проектов", icon: Building2 },
    { number: "15", label: "Лет опыта", icon: Award },
    { number: "50+", label: "Специалистов", icon: Users },
    { number: "100%", label: "Качество", icon: Star }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsLoaded(true), 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EBEE] to-[#FFFFFF] overflow-hidden">
      {/* Luxury Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#E8EBEE]"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Rotating Logo */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative mb-8"
              >
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center"
                  style={{
                    background: '#E8EBEE',
                    boxShadow: '20px 20px 40px #C5C9CE, -20px -20px 40px #FFFFFF, inset 4px 4px 8px #C5C9CE, inset -4px -4px 8px #FFFFFF'
                  }}
                >
                  <Building2 className="w-12 h-12 text-[#5F758D]" />
                </div>
                
                {/* Glowing Effect */}
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(95, 117, 141, 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)'
                  }}
                />
              </motion.div>
              
              {/* Loading Text */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl font-manrope font-light text-[#5F758D] mb-4 tracking-wide"
              >
                Архитектурная студия
              </motion.h1>
              
              {/* Loading Progress */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="w-64 h-1 bg-[#DDE1E7] rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full w-1/3 bg-gradient-to-r from-[#5F758D] to-[#B7BBC3] rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Rectangles */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-20 w-16 h-16 rounded-2xl opacity-10"
          style={{
            background: '#E8EBEE',
            boxShadow: '8px 8px 16px #C5C9CE, -8px -8px 16px #FFFFFF'
          }}
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 left-16 w-12 h-12 rounded-2xl opacity-8"
          style={{
            background: '#E8EBEE',
            boxShadow: '6px 6px 12px #C5C9CE, -6px -6px 12px #FFFFFF'
          }}
        />

        {/* Floating Circles */}
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full opacity-12"
          style={{
            background: '#E8EBEE',
            boxShadow: '10px 10px 20px #C5C9CE, -10px -10px 20px #FFFFFF'
          }}
        />
      </div>

      {/* Glassmorphism Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/10 border-b border-white/20"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-4"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(232, 235, 238, 0.8)',
                  boxShadow: '8px 8px 16px rgba(197, 201, 206, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)'
                }}
              >
                <Building2 className="w-6 h-6 text-[#5F758D]" />
              </div>
              <span className="text-xl font-manrope font-light text-[#5F758D] tracking-wide">
                Архитектурная студия
              </span>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {['Главная', 'О нас', 'Каталог', 'Проекты', 'Контакты'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-[#5F758D] hover:text-[#B7BBC3] font-inter font-light text-sm tracking-wide transition-all duration-300 relative group"
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-[#5F758D] transition-all duration-300 group-hover:w-full"></div>
                </motion.a>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 text-[#5F758D] font-inter font-light text-sm tracking-wide transition-all duration-300"
              style={{
                background: 'rgba(232, 235, 238, 0.8)',
                boxShadow: '8px 8px 16px rgba(197, 201, 206, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                borderRadius: '24px'
              }}
            >
              Связаться с нами
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-7xl md:text-9xl font-manrope font-light text-[#5F758D] mb-8 tracking-tight leading-tight"
            >
              Современные
              <span className="block font-extralight text-[#B7BBC3]">
                фасады
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-2xl md:text-3xl text-[#B7BBC3] font-inter font-light max-w-4xl mx-auto leading-relaxed mb-6"
            >
              Инновационные решения для экстерьера
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg text-[#B7BBC3] font-inter font-light max-w-2xl mx-auto leading-relaxed mb-16"
            >
              Создаем уникальные фасады, сочетающие эстетику и функциональность.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 px-12 py-5 text-[#FFFFFF] font-inter font-light text-lg tracking-wide transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #5F758D 0%, #B7BBC3 100%)',
                  boxShadow: '8px 8px 16px rgba(95, 117, 141, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)',
                  borderRadius: '32px'
                }}
              >
                <span>Начать проект</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 px-12 py-5 text-[#5F758D] font-inter font-light text-lg tracking-wide transition-all duration-300 relative group"
                style={{
                  background: 'rgba(232, 235, 238, 0.8)',
                  border: '1px solid rgba(221, 225, 231, 0.5)',
                  borderRadius: '32px'
                }}
              >
                <Play className="w-5 h-5" />
                <span>Смотреть видео</span>
                
                {/* Glowing Effect */}
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(95, 117, 141, 0.1) 0%, transparent 70%)',
                    filter: 'blur(10px)'
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="px-8 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-manrope font-light text-[#5F758D] mb-6 tracking-tight">
              Наши решения
            </h2>
            <p className="text-lg text-[#B7BBC3] font-inter font-light max-w-2xl mx-auto">
              Инновационные технологии и материалы для создания уникальных фасадов
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredElement(solution.id)}
                onHoverEnd={() => setHoveredElement(null)}
                className="group cursor-pointer"
              >
                <div
                  className="relative overflow-hidden rounded-3xl h-80 transition-all duration-500"
                  style={{
                    background: '#E8EBEE',
                    boxShadow: hoveredElement === solution.id
                      ? '12px 12px 24px #C5C9CE, -12px -12px 24px #FFFFFF'
                      : '8px 8px 16px #C5C9CE, -8px -8px 16px #FFFFFF'
                  }}
                >
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2">
                      <span className="text-xs text-white/70 font-inter font-light tracking-wide uppercase">
                        {solution.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-manrope font-light mb-2 tracking-tight">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-white/80 font-inter font-light mb-3">
                      {solution.subtitle}
                    </p>
                    <p className="text-xs text-white/60 font-inter font-light leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-8 transition-all duration-300"
                  style={{
                    background: '#E8EBEE',
                    boxShadow: 'inset 8px 8px 16px #C5C9CE, inset -8px -8px 16px #FFFFFF',
                    borderRadius: '32px'
                  }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#5F758D]" />
                  </div>
                  <div className="text-3xl font-manrope font-light text-[#5F758D] mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#B7BBC3] font-inter font-light tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-8 py-16 mt-20"
        style={{
          background: 'rgba(232, 235, 238, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'inset 0 8px 16px rgba(197, 201, 206, 0.3)'
        }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                boxShadow: 'inset 4px 4px 8px rgba(197, 201, 206, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.8)'
              }}
            >
              <Building2 className="w-4 h-4 text-[#5F758D]" />
            </div>
            <span className="text-xl font-manrope font-light text-[#5F758D] tracking-wide">
              Архитектурная студия
            </span>
          </div>
          <p className="text-[#B7BBC3] font-inter font-light text-sm tracking-wide">
            © 2025 Архитектурная студия. Все права защищены.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default LuxuryArchitecture;
