import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Building2, Award, Users, Star } from 'lucide-react';
import '../styles/architectural-minimalism.css';

const ArchitecturalMinimalism = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const solutions = [
    {
      id: 1,
      title: "Стеклянные фасады",
      subtitle: "Панорамные решения",
      description: "Современные стеклянные системы с высокими теплоизоляционными свойствами",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
      category: "Материалы"
    },
    {
      id: 2,
      title: "Металлические панели",
      subtitle: "Композитные системы",
      description: "Легкие и прочные панели с уникальными цветовыми решениями",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      category: "Технологии"
    },
    {
      id: 3,
      title: "Вентилируемые фасады",
      subtitle: "Инновационные решения",
      description: "Эффективная теплоизоляция с естественной вентиляцией",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      category: "Системы"
    },
    {
      id: 4,
      title: "Деревянные фасады",
      subtitle: "Экологичные материалы",
      description: "Натуральные решения для создания уютной атмосферы",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      category: "Экология"
    }
  ];

  const stats = [
    { number: "500+", label: "Проектов", icon: Building2 },
    { number: "15", label: "Лет опыта", icon: Award },
    { number: "50+", label: "Специалистов", icon: Users },
    { number: "100%", label: "Качество", icon: Star }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF1F4] to-[#FFFFFF] overflow-hidden">
      {/* Abstract 3D Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Concentric Circles */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full border border-[#B7BBC3]"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.02 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="absolute top-40 right-40 w-64 h-64 rounded-full border border-[#B7BBC3]"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.01 }}
          transition={{ duration: 2, delay: 0.9 }}
          className="absolute top-60 right-60 w-32 h-32 rounded-full border border-[#B7BBC3]"
        />

        {/* Geometric Lines */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute top-1/3 left-0 w-96 h-px bg-gradient-to-r from-transparent via-[#B7BBC3] to-transparent"
        />
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.03 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute top-2/3 right-0 w-80 h-px bg-gradient-to-l from-transparent via-[#B7BBC3] to-transparent"
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#5F758D] rounded-sm opacity-20"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-3/4 right-1/3 w-6 h-6 bg-[#5F758D] rounded-sm opacity-15"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 px-8 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: '#E8EBEE',
                boxShadow: '8px 8px 16px #DDE1E7, -8px -8px 16px #FFFFFF'
              }}
            >
              <Building2 className="w-6 h-6 text-[#5F758D]" />
            </div>
            <span className="text-2xl font-manrope font-light text-[#5F758D] tracking-wide">
              Фасадные решения
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
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-[#5F758D] hover:text-[#B7BBC3] font-inter font-light text-sm tracking-wide transition-colors duration-300 relative group"
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
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-[#5F758D] font-inter font-light text-sm tracking-wide transition-all duration-300"
            style={{
              background: '#E8EBEE',
              boxShadow: '8px 8px 16px #DDE1E7, -8px -8px 16px #FFFFFF',
              borderRadius: '24px'
            }}
          >
            Связаться с нами
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-manrope font-light text-[#5F758D] mb-8 tracking-tight leading-tight">
              Современные
              <span className="block font-extralight text-[#B7BBC3]">
                фасадные решения
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-[#B7BBC3] font-inter font-light max-w-3xl mx-auto leading-relaxed mb-16"
            >
              Создаем архитектурные решения, которые сочетают эстетическое совершенство 
              и функциональную эффективность для современного строительства
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 px-10 py-4 text-[#5F758D] font-inter font-light text-lg tracking-wide transition-all duration-300"
                style={{
                  background: '#E8EBEE',
                  boxShadow: '8px 8px 16px #DDE1E7, -8px -8px 16px #FFFFFF',
                  borderRadius: '32px'
                }}
              >
                <span>Начать проект</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 text-[#B7BBC3] font-inter font-light text-lg tracking-wide transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid #DDE1E7',
                  borderRadius: '32px'
                }}
              >
                Посмотреть портфолио
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="px-8 py-20">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                onHoverStart={() => setHoveredCard(solution.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group cursor-pointer"
              >
                <div
                  className="relative overflow-hidden rounded-3xl h-80 transition-all duration-500"
                  style={{
                    background: '#E8EBEE',
                    boxShadow: hoveredCard === solution.id
                      ? '12px 12px 24px #DDE1E7, -12px -12px 24px #FFFFFF'
                      : '8px 8px 16px #DDE1E7, -8px -8px 16px #FFFFFF'
                  }}
                >
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
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
        <div className="max-w-6xl mx-auto">
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
                    boxShadow: 'inset 8px 8px 16px #DDE1E7, inset -8px -8px 16px #FFFFFF',
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
          background: '#E8EBEE',
          boxShadow: 'inset 0 8px 16px #DDE1E7'
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: '#FFFFFF',
                boxShadow: 'inset 4px 4px 8px #DDE1E7, inset -4px -4px 8px #FFFFFF'
              }}
            >
              <Building2 className="w-4 h-4 text-[#5F758D]" />
            </div>
            <span className="text-xl font-manrope font-light text-[#5F758D] tracking-wide">
              Фасадные решения
            </span>
          </div>
          <p className="text-[#B7BBC3] font-inter font-light text-sm tracking-wide">
            © 2025 Фасадные решения. Все права защищены.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default ArchitecturalMinimalism;
