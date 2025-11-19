import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/landscaping.css';

const Landscaping = () => {
  const [activeLayers, setActiveLayers] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null); // 'fire_roads'
  const [firePaths, setFirePaths] = useState([]);
  const [fireRoadsVisible, setFireRoadsVisible] = useState(false);
  const [isParkingOverlayVisible, setIsParkingOverlayVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedVisualization, setSelectedVisualization] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const filtersRef = useRef(null);
  const planSectionRef = useRef(null);
  const visualizationImages = [
    '1_11-Фото.jpg',
    '1_12-Фото.jpg',
    '1_13-Фото.jpg',
    '1_14-Фото.jpg',
    '1_15-Фото.jpg',
    '1_16-Фото.jpg',
  ];

  // Загрузка данных из JSON файла при активации слоя
  useEffect(() => {
    if (activeLayer === 'fire_roads') {
      fetch('/plans/genplan/routes.json')
        .then(res => res.json())
        .then(data => setFirePaths(data))
        .catch(err => console.error('Ошибка загрузки маршрутов пожарных проездов', err));
    }
  }, [activeLayer]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!planSectionRef.current) return;
      const rect = planSectionRef.current.getBoundingClientRect();
      const shouldShow = rect.bottom > 180 && rect.top < window.innerHeight;
      setShowFilters((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  const handleParkingOverlayToggle = () => {
    setActiveLayer(null);
    setFireRoadsVisible(false);
    setIsParkingOverlayVisible((prev) => !prev);
  };

  const toggleLayer = (layer) => {
    setIsParkingOverlayVisible(false);
    setActiveLayers((prev) => {
      const isCurrentlyActive = prev.includes(layer);
      const newLayers = isCurrentlyActive
        ? prev.filter((l) => l !== layer)
        : [...prev, layer];
      
      console.log(`${isCurrentlyActive ? '❌ Отключен' : '✅ Включен'} слой: ${layer}`);
      
      // Специальное логирование для пожарных проездов
      if (layer === 'fireRoads') {
        console.log(`🚒 Пожарные проезды ${isCurrentlyActive ? 'скрыты' : 'отображены'}`);
      }
      
      return newLayers;
    });
  };

  const handleFireRoadsClick = () => {
    setIsParkingOverlayVisible(false);
    setActiveLayer(activeLayer === 'fire_roads' ? null : 'fire_roads');
  };

  const handleFireRoadsFilterClick = () => {
    setIsParkingOverlayVisible(false);
    setFireRoadsVisible(!fireRoadsVisible);
    console.log(`🚒 Пожарные проезды ${!fireRoadsVisible ? 'включены' : 'отключены'}`);
  };


  return (
    <div 
      className="landscaping-page min-h-screen overflow-x-hidden bg-[#f8fafc]"
      style={{
        background: 'linear-gradient(180deg, #f9fafc 0%, #eef1f6 100%)',
        minHeight: '100vh',
        paddingTop: '6rem',
        paddingBottom: '4rem'
      }}
    >
      {/* Контейнер с генпланом и фильтрами */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="px-6 text-center font-sans text-3xl font-semibold text-[#1f2933] md:text-4xl"
        style={{ marginTop: '4rem', marginBottom: '2.5rem' }}
      >
        Схема планировочной организации земельного участка
      </motion.h2>

      <div
        className="landscaping-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2.5fr 1fr',
          alignItems: 'flex-start',
          gap: '3rem',
          padding: '3rem 5rem',
          maxWidth: '1920px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Блок с ситуационной схемой слева */}
        <div
          className="situational-scheme-left"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0',
            fontFamily: 'Inter, sans-serif',
            alignSelf: 'flex-start'
          }}
        >
          <div
            style={{
              background: '#f3f4f6',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              maxWidth: '100%',
              width: '100%',
              marginBottom: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '12px 12px 24px rgba(0, 0, 0, 0.15), -12px -12px 24px rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <img
              src="/plans/genplan/4.png"
              alt="Ситуационная схема"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                objectFit: 'contain',
                display: 'block'
              }}
              onLoad={() => console.log('✅ Ситуационная схема загружена')}
              onError={(e) => {
                console.error('❌ Ошибка загрузки ситуационной схемы');
                e.target.src = '/images/placeholder.svg';
              }}
            />
          </div>
          <p
            style={{
              textAlign: 'center',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              margin: '0',
              lineHeight: '1.2'
            }}
          >
            Ситуационная схема
          </p>
        </div>

        {/* Центральный блок с планом */}
        <div
          ref={planSectionRef}
          id="genplan-section"
          className="plan-container"
          style={{
            position: 'relative',
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            transform: 'scale(0.9)',
            transformOrigin: 'center top',
            transition: 'transform 0.3s ease',
            alignSelf: 'flex-start',
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '900px',
            width: '100%'
          }}
        >
          <div className="relative w-full max-w-[1200px] overflow-hidden">
            {/* Основное изображение генплана */}
            <img
              src="/plans/genplan/основное.jpg"
              alt="Генплан благоустройства"
              className="block h-auto w-full object-contain"
              onLoad={() => console.log('✅ Генплан загружен')}
              onError={(e) => {
                console.error('❌ Ошибка загрузки генплана');
                e.target.src = '/images/placeholder.svg';
              }}
            />

            {/* Слои */}
            {activeLayers
              .filter(layer => layer !== 'Пожарные проезды')
              .map((layer) => {
                let layerPath;
                if (layer === 'Вход в здание') {
                  layerPath = '/plans/genplan/3.png';
                } else if (layer === 'fireRoads') {
                  layerPath = '/plans/genplan/6.png';
                } else {
                  layerPath = `/genplan/${layer}.png`;
                }

                return (
                  <motion.img
                    key={layer}
                    src={layerPath}
                    alt={layer}
                    className={`absolute inset-0 h-full w-full object-contain pointer-events-none ${layer === 'Вход в здание' ? 'entrance-blink' : ''}`}
                    style={{
                      zIndex: layer === 'Вход в здание' ? 100 : 2,
                      mixBlendMode: 'normal',
                      opacity: layer === 'fireRoads' ? 0.6 : (layer === 'Вход в здание' ? 1 : 0.85)
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: layer === 'Вход в здание' ? 1 : (layer === 'fireRoads' ? 0.6 : 0.85) }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onLoad={() => console.log(`✅ Слой загружен: ${layer}`)}
                    onError={(e) => {
                      console.error(`❌ Ошибка загрузки слоя: ${layer}`);
                      e.target.style.display = 'none';
                    }}
                  />
                );
              })}

            {/* Слой пожарных проездов */}
            <img
              src="/plans/genplan/6.png"
              alt="Пожарные проезды"
              className="absolute inset-0 h-full w-full object-contain pointer-events-none"
              style={{
                zIndex: 3,
                opacity: fireRoadsVisible ? 0.6 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
              onLoad={() => fireRoadsVisible && console.log('✅ Слой пожарных проездов загружен')}
              onError={(e) => {
                console.error('❌ Ошибка загрузки слоя пожарных проездов');
                e.target.style.display = 'none';
              }}
            />

            {/* Слой заезда в паркинг */}
            {isParkingOverlayVisible && (
              <img
                src="/plans/genplan/7.png"
                alt="Заезд в паркинг"
                className="absolute inset-0 h-full w-full object-contain pointer-events-none animate-parking-fade"
                style={{ zIndex: 4 }}
                onLoad={() => console.log('✅ Слой заезда в паркинг загружен')}
                onError={(e) => {
                  console.error('❌ Ошибка загрузки слоя заезда в паркинг');
                  e.target.style.display = 'none';
                }}
              />
            )}

            {/* SVG для отрисовки пожарных проездов */}
            {activeLayer === 'fire_roads' && (
              <svg
                viewBox="0 0 2000 2000"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
                style={{ zIndex: 10 }}
              >
                <defs>
                  {/* Эффект свечения для пожарных проездов */}
                  <filter id="fireGlow">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FF4500" floodOpacity="0.8" />
                  </filter>

                  {/* Стрелка на конце линии */}
                  <marker
                    id="fireArrowEnd"
                    markerWidth="40"
                    markerHeight="40"
                    refX="10"
                    refY="5"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <polygon points="0 0, 10 5, 0 10" fill="#FF4500" />
                  </marker>

                  {/* CSS анимация для пунктирной линии */}
                  <style>
                    {`
                      @keyframes dashFlow {
                        0% { stroke-dashoffset: 0; }
                        100% { stroke-dashoffset: -60; }
                      }
                    `}
                  </style>
                </defs>

                {/* Пожарные проезды с анимацией */}
                {firePaths.map((path, i) => {
                  const pathData = path.points ? path.points : path;
                  const points = pathData.map(p => `${p.x},${p.y}`).join(' ');

                  return (
                    <polyline
                      key={`fire-${i}`}
                      points={points}
                      stroke="#FF4500"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="18 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      markerEnd="url(#fireArrowEnd)"
                      style={{
                        animation: 'dashFlow 2s linear infinite',
                        filter: 'url(#fireGlow)',
                        opacity: 0.95
                      }}
                    />
                  );
                })}
              </svg>
            )}
          </div>
        </div>

        {/* Панель фильтров справа */}
        <div
          ref={filtersRef}
          className="layer-filters w-full max-w-[420px] lg:w-[420px]"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '24px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            padding: '1.5rem',
            height: 'fit-content',
            position: 'sticky',
            top: '3rem',
            alignSelf: 'flex-start',
            marginTop: '0.5rem',
            opacity: showFilters ? 1 : 0,
            visibility: showFilters ? 'visible' : 'hidden',
            pointerEvents: showFilters ? 'auto' : 'none',
            transition: 'opacity 0.4s ease, visibility 0.4s ease'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: '#2C3E50'
            }}
          >
            Фильтры слоёв
          </h3>


          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Кнопка "Пожарные проезды" */}
            <button
              onClick={handleFireRoadsFilterClick}
              className={`w-full text-left px-4 py-2 rounded-xl ${
                fireRoadsVisible
                  ? 'bg-blue-100 text-blue-700 border-blue-400' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
              } shadow-sm border`}
              style={{
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'background-color 0.15s ease, color 0.15s ease'
              }}
            >
              <span>Пожарные проезды</span>
            </button>

            {/* Кнопка "Заезд паркинг" */}
            <button
              onClick={handleParkingOverlayToggle}
              className={`w-full text-left px-4 py-2 rounded-xl transition-all ${
                isParkingOverlayVisible
                  ? 'bg-orange-100 text-orange-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
              style={{
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              <span>Заезд паркинг</span>
            </button>

            {/* Кнопка "Вход в здание" */}
            <button
              onClick={() => toggleLayer('Вход в здание')}
              className={`w-full text-left px-4 py-2 rounded-xl transition-all ${
                activeLayers.includes('Вход в здание')
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-sm`}
              style={{
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Вход в здание
            </button>
          </div>

          <h3 className="mt-6 text-center text-lg font-semibold text-[#1f2933]">
            Технико-экономические показатели
          </h3>

          <table className="mt-3 w-full border border-gray-300 border-collapse text-sm text-center text-[#1f2933] shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-1 font-medium">Наименование</th>
                <th className="border border-gray-300 px-2 py-1 font-medium whitespace-nowrap">Кол-во</th>
                <th className="border border-gray-300 px-2 py-1 font-medium">Примечание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-1 text-left">
                  Площадь территории в границах отвода
                </td>
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap">10313 м²</td>
                <td className="border border-gray-300 px-2 py-1">100%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 text-left">Площадь застройки</td>
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap">4315 м²</td>
                <td className="border border-gray-300 px-2 py-1">41,84%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 text-left">Площадь покрытий</td>
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap">3736 м²</td>
                <td className="border border-gray-300 px-2 py-1">36,23%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 text-left">Площадь озеленения</td>
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap">2262 м²</td>
                <td className="border border-gray-300 px-2 py-1">21,93%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <section
        id="visualizations"
        className="relative mx-auto mt-16 mb-0 flex w-full max-w-[1400px] flex-col items-center justify-center overflow-visible px-6 py-10 md:mt-20 md:px-12 lg:px-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 text-center font-sans text-3xl font-semibold text-[#2C3E50] sm:text-4xl"
        >
          Визуализации
        </motion.h2>

        <div className="relative grid min-h-screen grid-cols-1 items-start justify-center gap-y-[4px] gap-x-[12px] overflow-visible bg-transparent sm:grid-cols-2 lg:grid-cols-3">
          {visualizationImages.map((imageName, index) => {
            const isSelected = selectedVisualization === index;
            const isDimmed = selectedVisualization !== null && !isSelected;
            return (
              <motion.div
                key={imageName}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`group mx-auto w-full max-w-sm cursor-pointer rounded-2xl transform transition-all duration-700 ease-in-out will-change-transform origin-center shadow-xl bg-transparent ${
                  !isMobile && isSelected
                    ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2.5] z-50'
                    : 'relative scale-100'
                } ${isMobile && isSelected ? 'z-50' : ''} ${
                  isDimmed ? 'opacity-40' : 'opacity-100'
                } ${!isSelected && selectedVisualization === null ? 'hover:scale-[1.03]' : ''}`}
                style={{ transitionProperty: 'transform, opacity' }}
                onClick={() =>
                  setSelectedVisualization((prev) =>
                    prev === index ? null : index
                  )
                }
              >
                <img
                  src={`/genplan/${imageName}`}
                  alt={`Визуализация ${index + 1}`}
                  loading="lazy"
                  className={`h-64 w-full rounded-2xl object-cover shadow-2xl transition-transform duration-500 ease-in-out ${
                    isSelected && !isMobile ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                  onError={(e) => {
                    console.error(`❌ Ошибка загрузки визуализации: ${imageName}`);
                    e.currentTarget.src = '/images/placeholder.svg';
                    e.currentTarget.classList.remove('object-cover');
                    e.currentTarget.classList.add('object-contain', 'bg-white');
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {selectedVisualization !== null && (
          <div
            onClick={() => setSelectedVisualization(null)}
            className="absolute inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
          />
        )}

        {isMobile && selectedVisualization !== null && (
          <div
            onClick={() => setSelectedVisualization(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-opacity duration-500 ease-in-out"
          >
            <img
              src={`/genplan/${visualizationImages[selectedVisualization]}`}
              alt={`Визуализация ${selectedVisualization + 1}`}
              className="max-h-[90vh] w-full rounded-3xl object-contain shadow-2xl transition-transform duration-500 ease-in-out"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Landscaping;
