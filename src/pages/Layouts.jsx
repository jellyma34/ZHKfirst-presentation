import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Home, Building2, Users, ArrowRight, Maximize2, Square, Bed, Car, TreePine, X } from 'lucide-react';

const Layouts = () => {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [filter, setFilter] = useState('all');

  const layoutTypes = [
    { id: 'all', label: 'Все', icon: Layout },
    { id: 'apartments', label: 'Квартиры', icon: Home },
    { id: 'houses', label: 'Дома', icon: Building2 },
    { id: 'offices', label: 'Офисы', icon: Users }
  ];

  const layouts = [
    {
      id: 1,
      type: 'apartments',
      title: 'Студия 35 м²',
      area: '35 м²',
      rooms: '1',
      price: 'от 3 500 000 ₽',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
      features: ['Открытая планировка', 'Панорамные окна', 'Встроенная кухня', 'Современная сантехника'],
      description: 'Современная студия с продуманной планировкой и качественной отделкой. Идеально подходит для молодых специалистов.',
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      type: 'apartments',
      title: '2-комнатная 65 м²',
      area: '65 м²',
      rooms: '2',
      price: 'от 6 200 000 ₽',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      features: ['Изолированные комнаты', 'Лоджия', 'Кухня-гостиная', 'Ванная комната'],
      description: 'Просторная двухкомнатная квартира с удобной планировкой и качественными материалами отделки.',
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      type: 'houses',
      title: 'Коттедж 150 м²',
      area: '150 м²',
      rooms: '5',
      price: 'от 12 000 000 ₽',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
      features: ['Два этажа', 'Гараж', 'Терраса', 'Камин', 'Сауна'],
      description: 'Просторный двухэтажный коттедж с гаражом и террасой. Идеальный дом для большой семьи.',
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      type: 'offices',
      title: 'Офисное пространство 200 м²',
      area: '200 м²',
      rooms: '8',
      price: 'от 25 000 ₽/мес',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      features: ['Open space', 'Переговорные', 'Кухня', 'Зона отдыха', 'Парковка'],
      description: 'Современное офисное пространство с открытой планировкой и всеми необходимыми зонами.',
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      type: 'apartments',
      title: '3-комнатная 85 м²',
      area: '85 м²',
      rooms: '3',
      price: 'от 8 500 000 ₽',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
      features: ['Просторная гостиная', 'Две спальни', 'Кухня-столовая', 'Две лоджии'],
      description: 'Комфортная трехкомнатная квартира для семьи с детьми. Все комнаты изолированы.',
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    },
    {
      id: 6,
      type: 'houses',
      title: 'Таунхаус 120 м²',
      area: '120 м²',
      rooms: '4',
      price: 'от 9 800 000 ₽',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
      features: ['Три уровня', 'Придомовая территория', 'Гараж', 'Мансарда'],
      description: 'Стильный таунхаус в современном стиле с придомовой территорией и гаражом.',
      floorPlan: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop'
    }
  ];

  const filteredLayouts = filter === 'all' 
    ? layouts 
    : layouts.filter(layout => layout.type === filter);

  const getRoomIcon = (type) => {
    switch (type) {
      case 'apartments': return <Home className="w-4 h-4" />;
      case 'houses': return <Building2 className="w-4 h-4" />;
      case 'offices': return <Users className="w-4 h-4" />;
      default: return <Layout className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop)` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl font-manrope font-bold text-white mb-6">
                Планировочные решения
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 font-inter max-w-3xl">
                Создаем функциональные и эргономичные планировки, 
                которые максимально эффективно используют пространство
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-4 gradient-bg text-white rounded-xl font-inter font-medium hover:shadow-lg transition-all duration-300"
                >
                  <span>Заказать проект</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-4 glass text-white rounded-xl font-inter font-medium hover:shadow-lg transition-all duration-300"
                >
                  <Maximize2 className="w-5 h-5" />
                  <span>3D визуализация</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gradient-to-br from-neomorph-light to-neomorph-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {layoutTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(type.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-inter font-medium transition-all duration-300 ${
                    filter === type.id
                      ? 'neomorph-inset text-accent-blue'
                      : 'neomorph-small text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{type.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Layouts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-manrope font-bold gradient-text mb-6">
              Выберите планировку
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
              Разнообразные варианты планировок для любых потребностей и бюджетов
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredLayouts.map((layout, index) => (
                <motion.div
                  key={layout.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="neomorph overflow-hidden hover-lift cursor-pointer"
                  onClick={() => setSelectedLayout(layout)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={layout.image}
                      alt={layout.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onLoad={() => console.log(`✅ Планировка загружена: ${layout.title}`)}
                      onError={(e) => {
                        console.error(`❌ Ошибка загрузки планировки: ${layout.title}`);
                        e.target.src = '/images/placeholder.svg';
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 neomorph-small text-sm font-inter font-medium text-accent-blue">
                      {layout.type === 'apartments' ? 'Квартира' : 
                       layout.type === 'houses' ? 'Дом' : 'Офис'}
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 neomorph-small flex items-center justify-center">
                      {getRoomIcon(layout.type)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-manrope font-semibold text-gray-800 mb-2">
                      {layout.title}
                    </h3>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 font-inter mb-4">
                      <div className="flex items-center space-x-1">
                        <Square className="w-4 h-4" />
                        <span>{layout.area}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bed className="w-4 h-4" />
                        <span>{layout.rooms} комнат</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-inter mb-4 text-sm leading-relaxed">
                      {layout.description.substring(0, 100)}...
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-manrope font-bold gradient-text">
                        {layout.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 neomorph-small flex items-center justify-center text-accent-blue hover:neomorph transition-all duration-300"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedLayout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedLayout(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto neomorph"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-manrope font-bold text-gray-800 mb-2">
                      {selectedLayout.title}
                    </h2>
                    <div className="flex items-center space-x-6 text-gray-600 font-inter">
                      <div className="flex items-center space-x-2">
                        <Square className="w-5 h-5" />
                        <span>{selectedLayout.area}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bed className="w-5 h-5" />
                        <span>{selectedLayout.rooms} комнат</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getRoomIcon(selectedLayout.type)}
                        <span>{selectedLayout.type === 'apartments' ? 'Квартира' : 
                               selectedLayout.type === 'houses' ? 'Дом' : 'Офис'}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLayout(null)}
                    className="w-10 h-10 neomorph-small flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Images */}
                  <div className="space-y-4">
                    <div className="neomorph-small overflow-hidden rounded-xl">
                      <img
                        src={selectedLayout.image}
                        alt={selectedLayout.title}
                        loading="lazy"
                        className="w-full h-64 object-cover"
                        onLoad={() => console.log(`✅ Изображение в модале загружено`)}
                        onError={(e) => {
                          console.error(`❌ Ошибка изображения в модале`);
                          e.target.src = '/images/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="neomorph-small overflow-hidden rounded-xl">
                      <img
                        src={selectedLayout.floorPlan}
                        alt={`План ${selectedLayout.title}`}
                        loading="lazy"
                        className="w-full h-64 object-cover"
                        onLoad={() => console.log(`✅ План в модале загружен`)}
                        onError={(e) => {
                          console.error(`❌ Ошибка загрузки плана в модале`);
                          e.target.src = '/images/placeholder.svg';
                        }}
                      />
                      <div className="p-4 text-center">
                        <span className="text-sm font-inter text-gray-600">Планировочная схема</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-manrope font-semibold text-gray-800 mb-3">
                        Описание
                      </h3>
                      <p className="text-gray-600 font-inter leading-relaxed">
                        {selectedLayout.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-manrope font-semibold text-gray-800 mb-3">
                        Особенности
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedLayout.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 neomorph-small"
                          >
                            <div className="w-2 h-2 bg-accent-blue rounded-full flex-shrink-0" />
                            <span className="text-gray-600 font-inter">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="neomorph-inset p-6 text-center">
                      <div className="text-3xl font-manrope font-bold gradient-text mb-2">
                        {selectedLayout.price}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 gradient-bg text-white rounded-xl font-inter font-medium hover:shadow-lg transition-all duration-300"
                        >
                          Заказать проект
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 neomorph-small text-accent-blue font-inter font-medium hover:neomorph-inset transition-all duration-300"
                        >
                          3D визуализация
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 gradient-light">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-800 mb-6">
              Не нашли подходящую планировку?
            </h2>
            <p className="text-xl text-gray-600 font-inter mb-8 max-w-2xl mx-auto">
              Мы создадим индивидуальную планировку специально под ваши потребности и предпочтения
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 gradient-bg text-white rounded-xl font-inter font-medium text-lg hover:shadow-lg transition-all duration-300"
            >
              Создать индивидуальный проект
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Layouts;
