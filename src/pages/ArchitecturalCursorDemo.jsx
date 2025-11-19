import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Award, Users, Star } from 'lucide-react';
import ArchitecturalCursor from '../components/ArchitecturalCursor';

const ArchitecturalCursorDemo = () => {
  const [activeDemo, setActiveDemo] = useState('default');

  const demoSections = [
    {
      id: 'default',
      title: 'Основное состояние',
      description: 'Матовый чёрный круг 12-14px с внутренним свечением',
      color: 'bg-white'
    },
    {
      id: 'hover',
      title: 'Hover эффект',
      description: 'Увеличение до 26-28px с белым свечением',
      color: 'bg-gray-50'
    },
    {
      id: 'click',
      title: 'Click анимация',
      description: 'Короткий импульс сжатия до 10px',
      color: 'bg-gray-100'
    }
  ];

  const interactiveElements = [
    {
      type: 'button',
      title: 'Навигационная кнопка',
      description: 'Стандартная кнопка с hover эффектом'
    },
    {
      type: 'link',
      title: 'Текстовая ссылка',
      description: 'Интерактивная ссылка в тексте'
    },
    {
      type: 'card',
      title: 'Карточка проекта',
      description: 'Интерактивная карточка с hover анимацией'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ArchitecturalCursor />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-black rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-medium text-black tracking-wide">
                Архитектурный курсор
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {demoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveDemo(section.id)}
                  className={`cursor-hover text-sm font-light uppercase tracking-[0.15em] transition-all duration-300 ${
                    activeDemo === section.id ? 'text-black' : 'text-gray-500'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-light mb-8 tracking-tight leading-tight text-black"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Архитектурный
              <span className="block font-extralight text-gray-400">
                курсор
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Минималистичный премиальный курсор в стиле архитектурного сайта
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed mb-16"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Матовый чёрный круг с мягким внутренним свечением и плавными анимациями
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Demo Sections */}
      <section className="px-6 py-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight text-black">
              Демонстрация эффектов
            </h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Интерактивные элементы для тестирования различных состояний курсора
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {interactiveElements.map((element, index) => (
              <motion.div
                key={element.type}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
                  <h3 className="text-xl font-light mb-4 text-black">
                    {element.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {element.description}
                  </p>
                  
                  {element.type === 'button' && (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="cursor-hover flex items-center justify-center space-x-3 px-8 py-3 text-white font-medium text-sm tracking-wide transition-all duration-300 bg-black rounded-lg mx-auto"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span>Интерактивная кнопка</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                  
                  {element.type === 'link' && (
                    <motion.a
                      href="#"
                      whileHover={{ y: -2 }}
                      className="cursor-hover inline-block text-sm font-light text-black uppercase tracking-[0.15em] transition-all duration-300 hover:text-gray-600"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Интерактивная ссылка
                    </motion.a>
                  )}
                  
                  {element.type === 'card' && (
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="cursor-hover bg-gray-50 p-6 rounded-xl transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-black rounded-lg mx-auto mb-4"></div>
                      <p className="text-xs text-gray-600">Наведите курсор</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cursor Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-12 rounded-3xl"
          >
            <h3 className="text-3xl font-light mb-8 text-center text-black">
              Технические характеристики
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-medium mb-6 text-black">Визуальные параметры</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Диаметр (основной):</span>
                    <span className="text-black font-medium">12-14px</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Цвет:</span>
                    <span className="text-black font-medium">#0D0D0D</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Hover размер:</span>
                    <span className="text-black font-medium">26-28px</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Click размер:</span>
                    <span className="text-black font-medium">10px</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Размытие краёв:</span>
                    <span className="text-black font-medium">0.5px</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-medium mb-6 text-black">Анимационные эффекты</h4>
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Внутреннее свечение:</span>
                    <span className="text-black font-medium">#00000040</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Hover свечение:</span>
                    <span className="text-black font-medium">#FFFFFF25</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Fade trail:</span>
                    <span className="text-black font-medium">20% opacity</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Инерция:</span>
                    <span className="text-black font-medium">Spring physics</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Click импульс:</span>
                    <span className="text-black font-medium">120ms</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 py-16 mt-20 bg-black"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg">
              <Building2 className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-medium text-white tracking-wide">
              Архитектурный курсор
            </span>
          </div>
          <p className="font-light text-sm tracking-wide text-gray-400">
            © 2025 Минималистичный премиальный курсор. Все права защищены.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default ArchitecturalCursorDemo;
