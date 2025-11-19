import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building2, Award, Users, Star, ChevronRight, Menu, X } from 'lucide-react';
import PremiumSplashScreen from '../components/PremiumSplashScreen';
import CustomCursor from '../components/CustomCursor';

const PremiumArchitectureStudio = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  const navItems = [
    'Главная',
    'Благоустройство', 
    'Фасадные решения',
    'Планировочные решения',
    'Галерея',
    'Контакты'
  ];

  const projects = [
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
      title: "Планировочные решения",
      subtitle: "Функциональная архитектура",
      description: "Оптимизируем пространство для максимальной эффективности и комфорта",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      category: "Планировка"
    },
    {
      id: 3,
      title: "Благоустройство территории",
      subtitle: "Гармония с природой",
      description: "Создаем ландшафтные решения, которые дополняют архитектурную концепцию",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      category: "Ландшафт"
    }
  ];

  const stats = [
    { number: "500+", label: "Проектов", icon: Building2 },
    { number: "15", label: "Лет опыта", icon: Award },
    { number: "50+", label: "Специалистов", icon: Users },
    { number: "100%", label: "Качество", icon: Star }
  ];

  if (showSplash) {
    return <PremiumSplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#0C0D12] backdrop-blur-xl"
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center space-x-4"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                <img
                  src="/logo/logo.svg.svg"
                  alt="Логотип"
                  className="w-6 h-6"
                />
              </div>
              <span 
                className="text-lg font-medium text-white tracking-wide"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.05em'
                }}
              >
                Архитектурные решения
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                  className="cursor-hover text-sm font-light text-white uppercase tracking-[0.15em] transition-all duration-300 hover:text-gray-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-3">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item}
                      href="#"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-light text-white uppercase tracking-[0.15em] py-2 transition-colors hover:text-gray-300"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
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
              className="text-6xl md:text-8xl font-light mb-8 tracking-tight leading-tight text-black"
              style={{ fontFamily: 'Inter, sans-serif' }}
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
              className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Создаем архитектурные решения, вдохновленные передовыми технологиями
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed mb-16"
              style={{ fontFamily: 'Inter, sans-serif' }}
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
                className="cursor-hover flex items-center space-x-3 px-10 py-4 text-white font-medium text-lg tracking-wide transition-all duration-300 bg-black rounded-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>Начать проект</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-hover flex items-center space-x-3 px-10 py-4 font-light text-lg tracking-wide transition-all duration-300 border border-gray-300 text-black rounded-none hover:bg-gray-50"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>Узнать больше</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-20 bg-[#F7F8FA]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 
              className="text-4xl md:text-5xl font-light mb-6 tracking-tight text-black"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Наши проекты
            </h2>
            <p 
              className="text-lg text-gray-600 font-light max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Инновационные технологии и материалы для создания архитектуры будущего
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-hover bg-white"
                >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2">
                      <span className="text-xs text-white/70 font-light tracking-widest uppercase">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-light mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/80 font-light mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20">
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
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div 
                    className="text-3xl font-light mb-2 tracking-tight text-black"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-sm font-light tracking-wide text-gray-600"
                    style={{ fontFamily: 'Inter, sans-serif' }}
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
        className="px-6 py-16 mt-20 bg-[#0C0D12]"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg">
              <img
                src="/logo/logo.svg.svg"
                alt="Логотип"
                className="w-4 h-4"
              />
            </div>
            <span 
              className="text-xl font-medium text-white tracking-wide"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              Архитектурные решения
            </span>
          </div>
          <p 
            className="font-light text-sm tracking-wide text-gray-400"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            © 2025 Архитектурные решения. Все права защищены.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default PremiumArchitectureStudio;
