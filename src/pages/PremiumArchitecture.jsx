import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Award, Users, Star, ChevronRight } from 'lucide-react';
import PremiumLoader from '../components/PremiumLoader';
import '../styles/premium-architecture.css';

const PremiumArchitecture = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);

  const solutions = [
    {
      id: 1,
      title: "Современные фасады",
      subtitle: "Инновационные решения",
      description: "Создаем уникальные фасады, сочетающие эстетическое совершенство и функциональную эффективность",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      category: "Фасады"
    },
    {
      id: 2,
      title: "Технологии будущего",
      subtitle: "Умные системы",
      description: "Интегрируем передовые технологии в архитектурные решения для максимальной эффективности",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      category: "Технологии"
    },
    {
      id: 3,
      title: "Экологичные материалы",
      subtitle: "Устойчивое развитие",
      description: "Используем только экологически чистые материалы для создания здоровой среды обитания",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      category: "Экология"
    }
  ];

  const stats = [
    { number: "500+", label: "Проектов", icon: Building2 },
    { number: "15", label: "Лет опыта", icon: Award },
    { number: "50+", label: "Специалистов", icon: Users },
    { number: "100%", label: "Качество", icon: Star }
  ];

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  if (isLoading) {
    return <PremiumLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F8FA] to-[#FFFFFF] overflow-hidden">
      {/* Header with Logo */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100"
      >
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
              className="flex items-center space-x-3"
            >
              <div 
                className="w-10 h-10 flex items-center justify-center"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(60, 64, 72, 0.08), 0 1px 4px rgba(60, 64, 72, 0.04)'
                }}
              >
                <img
                  src="/logo/logo.svg.svg"
                  alt="Архитектурный логотип"
                  className="w-6 h-6"
                />
              </div>
              <span 
                className="text-lg font-inter font-light tracking-wide"
                style={{ color: '#3C4048' }}
              >
                Архитектурная студия
              </span>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {['Главная', 'О нас', 'Проекты', 'Технологии', 'Контакты'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-sm font-inter font-light tracking-wide transition-all duration-300 relative group"
                  style={{ color: '#3C4048' }}
                >
                  {item}
                  <div 
                    className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: '#3C4048' }}
                  ></div>
                </motion.a>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 text-sm font-inter font-light tracking-wide transition-all duration-300"
              style={{
                background: '#3C4048',
                color: '#FFFFFF',
                borderRadius: '20px',
                boxShadow: '0 4px 16px rgba(60, 64, 72, 0.15)'
              }}
            >
              Связаться с нами
            </motion.button>
          </div>
        </div>
      </motion.header>

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
              className="text-6xl md:text-8xl font-manrope font-light mb-8 tracking-tight leading-tight"
              style={{ color: '#3C4048' }}
            >
              Архитектура
              <span className="block font-extralight text-gray-400">
                будущего
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-500 font-inter font-light max-w-4xl mx-auto leading-relaxed mb-6"
            >
              Создаем архитектурные решения, вдохновленные передовыми технологиями
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg text-gray-400 font-inter font-light max-w-2xl mx-auto leading-relaxed mb-16"
            >
              Превращаем инновации в эстетически совершенные пространства
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
                className="flex items-center space-x-3 px-10 py-4 text-white font-inter font-light text-lg tracking-wide transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #3C4048 0%, #5A5E66 100%)',
                  borderRadius: '24px',
                  boxShadow: '0 8px 24px rgba(60, 64, 72, 0.2)'
                }}
              >
                <span>Начать проект</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 px-10 py-4 font-inter font-light text-lg tracking-wide transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: '#3C4048',
                  border: '1px solid rgba(60, 64, 72, 0.1)',
                  borderRadius: '24px',
                  boxShadow: '0 4px 16px rgba(60, 64, 72, 0.08)'
                }}
              >
                <span>Узнать больше</span>
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
            <h2 
              className="text-4xl md:text-5xl font-manrope font-light mb-6 tracking-tight"
              style={{ color: '#3C4048' }}
            >
              Наши решения
            </h2>
            <p className="text-lg text-gray-500 font-inter font-light max-w-2xl mx-auto">
              Инновационные технологии и материалы для создания архитектуры будущего
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
                    background: '#FFFFFF',
                    boxShadow: hoveredElement === solution.id
                      ? '0 20px 40px rgba(60, 64, 72, 0.12), 0 8px 16px rgba(60, 64, 72, 0.08)'
                      : '0 8px 24px rgba(60, 64, 72, 0.08), 0 2px 8px rgba(60, 64, 72, 0.04)'
                  }}
                >
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2">
                      <span className="text-xs text-white/70 font-inter font-light tracking-widest uppercase">
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
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    boxShadow: '0 8px 24px rgba(60, 64, 72, 0.08), 0 2px 8px rgba(60, 64, 72, 0.04)'
                  }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-6 h-6" style={{ color: '#3C4048' }} />
                  </div>
                  <div 
                    className="text-3xl font-manrope font-light mb-2 tracking-tight"
                    style={{ color: '#3C4048' }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-sm font-inter font-light tracking-wide"
                    style={{ color: '#A0A3A8' }}
                  >
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
          background: 'rgba(247, 248, 250, 0.8)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(60, 64, 72, 0.08)'
              }}
            >
              <img
                src="/logo/logo.svg.svg"
                alt="Логотип"
                className="w-4 h-4"
              />
            </div>
            <span 
              className="text-xl font-inter font-light tracking-wide"
              style={{ color: '#3C4048' }}
            >
              Архитектурная студия
            </span>
          </div>
          <p 
            className="font-inter font-light text-sm tracking-wide"
            style={{ color: '#A0A3A8' }}
          >
            © 2025 Архитектурная студия. Все права защищены.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default PremiumArchitecture;
