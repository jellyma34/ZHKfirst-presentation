import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ZoomIn, ZoomOut, RotateCcw, Maximize2, Edit3, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import PedestrianLayer from '../components/PedestrianLayer';
import RouteEditor from '../components/RouteEditor';
import RouteEditorSVG from '../components/RouteEditorSVG';
import RouteEditorControls from '../components/RouteEditorControls';
import InteractivePlanViewer from '../components/InteractivePlanViewer';
import { useRouteEditor } from '../hooks/useRouteEditor';
import '../styles/planning-solutions.css';

const PlanningSolutions = () => {
  const [selectedFloor, setSelectedFloor] = useState('underground-ground');
  const [activeLayers, setActiveLayers] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(100); // Масштаб по умолчанию 100%
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showZoningLayer, setShowZoningLayer] = useState(false);
  
  // Состояние для галереи изображений
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [imagesNotFound, setImagesNotFound] = useState(false);
  
  // Состояние для полноэкранного режима
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Hook для управления редактором маршрутов
  const routeEditorState = useRouteEditor(selectedFloor);

  // Загрузка изображений при выборе section2-floor-2
  useEffect(() => {
    if (selectedFloor === 'section2-floor-2') {
      loadImagesFromFolder('/plans/section-2-floor-2');
    } else {
      // Очищаем галерею для других этажей
      setGalleryImages([]);
      setCurrentImageIndex(0);
      setImagesNotFound(false);
    }
  }, [selectedFloor]);

  // Структура этажей с группировкой (без selectedSection)
  const floorGroups = [
    {
      id: 'general',
      title: 'Общие планы',
      floors: [
        { id: 'underground-ground', label: 'План подземно-надземного этажа на отм. +4.500', path: '/plans/floor-2-new/основное.jpg' },
        { id: 'general-floor-1', label: 'План первого этажа на отм. ±0.000', path: '/plans/floor 1/основное.jpg' }
      ]
    },
    {
      id: 'section1',
      title: 'Секция 1',
      floors: [
        { id: 'section1-floor-2', label: 'План второго этажа на отм. +3.900', path: '/plans/section-1-floor-2/Основное.jpg' },
        { id: 'section1-floor-3-10', label: 'План типового этажа на отм. +6.900...+27.900 (3–10 эт.)', path: '/plans/section-1-floor-3/Основное.jpg' },
        { id: 'section1-floor-11-14', label: 'План типового этажа на отм. +30.900...+39.900 (11–14 эт.)', path: '/plans/section-1-floor-11/Основное.jpg' }
      ]
    },
    {
      id: 'section2',
      title: 'Секция 2',
      floors: [
        { id: 'section2-floor-2', label: 'План второго этажа на отм. +3.900', path: '/plans/section-2-floor-2/Основное.jpg' },
        { id: 'section2-floor-3-10', label: 'План типового этажа на отм. +6.900...+27.900 (3–10 эт.)', path: '/plans/section-2-floor-3/Основное.jpg' },
        { id: 'section2-floor-11-14', label: 'План типового этажа на отм. +30.900...+39.900 (11–14 эт.)', path: '/plans/section-2-floor-3/Основное.jpg' }
      ]
    }
  ];

  const layers = [
    { id: 'apartments', label: 'Квартирография', file: '2.png' },
    { id: '1room', label: '1-комнатные', file: '3.png' },
    { id: '2room', label: '2-комнатные', file: '4.png' },
    { id: 'terraces', label: 'Террасы', file: '5.png' },
    { id: 'parking', label: 'Машино-места', file: '3.png' },
    { id: 'technical', label: 'Технические помещения', file: '2.png' },
    { id: 'storage', label: 'Кладовые', file: '1.png' },
    { id: 'admin-s1', label: 'Административные помещения С1', file: '2.png' },
    { id: 'admin-s2', label: 'Административные помещения С2', file: '4.png' },
    { id: 'mops', label: 'МОПы', file: '4.png' },
    { id: 'pedestrian', label: 'Движение пешеходов', file: '4.png' },
    { id: 'commercial', label: 'Коммерция', file: '6.png' }
  ];

  // Маппинг ID этажа → ключ конфигурации фильтров
  const floorTypeMap = {
    'underground-ground': 'underground',
    'general-floor-1': 'first',
    'section1-floor-2': 'section1_second',
    'section1-floor-3-10': 'section1_typical',
    'section1-floor-11-14': 'section1_typical',
    'section2-floor-2': 'section2_second',
    'section2-floor-3-10': 'section2_typical',
    'section2-floor-11-14': 'section2_typical'
  };

  // Конфигурация фильтров по этажам
  const floorFiltersConfig = {
    // Общие планы
    underground: ['Машино-места', 'Технические помещения', 'Кладовые', 'Административные помещения С2'],
    
    // Первый этаж
    first: ['МОПы', 'Административные помещения С1', 'Административные помещения С2', 'Террасы'],
    
    // Секция 1
    section1_second: ['Квартирография', '1-комнатные', '2-комнатные', 'МОПы', 'Террасы'],
    section1_typical: ['Квартирография', '1-комнатные', '2-комнатные'], // Без МОПы и Террасы
    
    // Секция 2
    section2_second: ['Квартирография', '1-комнатные', '2-комнатные', 'МОПы', 'Террасы'],
    section2_typical: ['Квартирография', '1-комнатные', '2-комнатные'], // Без МОПы и Террасы
  };

  // Получение доступных фильтров для текущего этажа
  const getAvailableFilters = (floorType) => {
    return floorFiltersConfig[floorType] || [];
  };

  // Получение текущего типа этажа для фильтров
  const currentFloorType = floorTypeMap[selectedFloor] || 'underground';

  const isSecondFloorSelected = selectedFloor === 'section1-floor-2' || selectedFloor === 'section2-floor-2';

  const toggleLayer = (layerId) => {
    const layer = layers.find(l => l.id === layerId);
    const isActive = activeLayers.includes(layerId);
    
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
    
    const layerPath = getLayerPath(layerId, layer?.file);
    console.log(`${isActive ? '❌ Отключен' : '✅ Включен'} слой: ${layer?.label}`);
    console.log(`📂 Путь к слою: ${layerPath}`);
  };

  // Сброс слоёв при смене этажа
  useEffect(() => {
    setActiveLayers([]);
    console.log('🔄 Слои сброшены при смене этажа');
  }, [selectedFloor]);

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 400) {
      setZoomLevel(prev => prev + 25);
    } else if (direction === 'out' && zoomLevel > 25) {
      setZoomLevel(prev => prev - 25);
    }
  };

  const resetZoom = () => {
    setZoomLevel(100); // Сброс к масштабу по умолчанию (100%)
  };

  // Функция для плавного скролла к следующему разделу
  const scrollToNextSection = () => {
    // Скроллим к концу страницы, чтобы показать следующий раздел
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const toggleZoningLayer = () => {
    setShowZoningLayer(prev => !prev);
    console.log(`🏗️ Слой зонирования разреза: ${!showZoningLayer ? 'включен' : 'отключен'}`);
  };

  // Функция для загрузки всех изображений из папки
  const loadImagesFromFolder = async (folderPath) => {
    setIsLoadingImages(true);
    setImagesNotFound(false);
    setGalleryImages([]);
    setCurrentImageIndex(0);

    try {
      // Список возможных изображений для загрузки
      const imageFiles = ['Основное.jpg', '2.png', '3.png', '4.png'];
      const loadedImages = [];

      // Проверяем каждое изображение
      for (const fileName of imageFiles) {
        const imagePath = `${folderPath}/${fileName}`;
        try {
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            loadedImages.push({
              src: imagePath,
              alt: fileName,
              name: fileName
            });
          }
        } catch (error) {
          console.log(`⚠️ Изображение не найдено: ${imagePath}`);
        }
      }

      if (loadedImages.length > 0) {
        setGalleryImages(loadedImages);
        setImagesNotFound(false);
        console.log(`✅ Загружено ${loadedImages.length} изображений из ${folderPath}`);
        console.log(`📸 Изображения:`, loadedImages.map(img => img.name).join(', '));
      } else {
        setImagesNotFound(true);
        console.log(`⚠️ Изображения для папки ${folderPath} не найдены`);
      }
    } catch (error) {
      console.error(`❌ Ошибка загрузки изображений из ${folderPath}:`, error);
      setImagesNotFound(true);
    } finally {
      setIsLoadingImages(false);
    }
  };

  // Функции навигации по галерее
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  // Функция для управления полноэкранным режимом
  const handleFullscreen = async () => {
    const planContainer = document.getElementById('plan-container');
    
    if (!planContainer) {
      console.error('❌ Контейнер плана не найден');
      return;
    }

    try {
      if (!document.fullscreenElement) {
        // Входим в полноэкранный режим
        await planContainer.requestFullscreen();
        setIsFullscreen(true);
        console.log('✅ Вход в полноэкранный режим');
      } else {
        // Выходим из полноэкранного режима
        await document.exitFullscreen();
        setIsFullscreen(false);
        console.log('✅ Выход из полноэкранного режима');
      }
    } catch (error) {
      console.error('❌ Ошибка управления полноэкранным режимом:', error);
    }
  };

  // Обработчик изменения полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);



  // Получение пути к изображению плана
  const getImagePath = () => {
    // Для section2-floor-2 используем галерею
    if (selectedFloor === 'section2-floor-2' && galleryImages.length > 0) {
      const currentImage = galleryImages[currentImageIndex];
      console.log(`🎯 СЕКЦИЯ 2 - ЭТАЖ 2 выбран!`);
      console.log(`📸 Текущее изображение: ${currentImage.name}`);
      console.log(`📁 Путь: ${currentImage.src}`);
      return currentImage.src;
    }

    // Поиск выбранного этажа во всех группах
    for (const group of floorGroups) {
      const floor = group.floors.find(f => f.id === selectedFloor);
      if (floor) {
        console.log(`✅ Загружаем план: ${floor.label}`);
        console.log(`📁 Путь к основному изображению: ${floor.path}`);
        console.log(`🏢 Группа: ${group.title}`);
        
        // Специальное логирование для секции 1, этаж 2
        if (floor.id === 'section1-floor-2') {
          console.log(`🎯 СЕКЦИЯ 1 - ЭТАЖ 2 выбран!`);
          console.log(`📍 Доступные слои для наложения:`);
          console.log(`   - Квартирография: /plans/section-1-floor-2/2.png`);
          console.log(`   - 1-комнатные: /plans/section-1-floor-2/3.png`);
          console.log(`   - 2-комнатные: /plans/section-1-floor-2/4.png`);
          console.log(`   - Террасы: /plans/section-1-floor-2/5.png`);
        }
        
        // Специальное логирование для секции 1, этажи 3-10
        if (floor.id === 'section1-floor-3-10') {
          console.log(`🎯 СЕКЦИЯ 1 - ТИПОВЫЕ ЭТАЖИ 3-10 выбраны!`);
          console.log(`📍 Доступные слои для наложения:`);
          console.log(`   - Квартирография: /plans/section-1-floor-3/2.png`);
          console.log(`   - 1-комнатные: /plans/section-1-floor-3/3.png`);
          console.log(`   - 2-комнатные: /plans/section-1-floor-3/4.png`);
          console.log(`   - Террасы: /plans/section-1-floor-3/5.png`);
        }
        
        return floor.path;
      }
    }
    
    // Fallback
    console.warn(`⚠️ Этаж не найден: ${selectedFloor}`);
    return `/plans/general/main.jpg`;
  };

  // Получение пути к слою с учётом разных этажей и специальных случаев
  const getLayerPath = (layerId, fileName) => {
    // Специальная обработка для подземно-надземного этажа
    if (selectedFloor === 'underground-ground') {
      if (layerId === 'parking') return '/plans/floor-2-new/3.png';
      if (layerId === 'technical') return '/plans/floor-2-new/2.png';
      if (layerId === 'storage') return '/plans/floor-2-new/1.png';
      if (layerId === 'admin-s2') return '/plans/floor-2-new/4.png';
    }
    
    // Специальная обработка для первого этажа
    if (selectedFloor === 'general-floor-1') {
      if (layerId === 'admin-s1') return '/plans/floor 1/2.png';
      if (layerId === 'admin-s2') return '/plans/floor 1/3.png';
      if (layerId === 'mops') return '/plans/floor 1/4.png';
      if (layerId === 'terraces') return '/plans/floor 1/5.png';
    }
    
    // Специальная обработка для секции 1, этаж 2
    if (selectedFloor === 'section1-floor-2') {
      if (layerId === 'terraces') return '/plans/section-1-floor-2/5.png';
    }
    
    // Специальная обработка для секции 2, этаж 2
    if (selectedFloor === 'section2-floor-2') {
      if (layerId === 'terraces') return '/plans/section-2-floor-2/5.png';
    }
    
    // Для остальных случаев используем стандартную логику
    const mainPath = getImagePath();
    const directory = mainPath.substring(0, mainPath.lastIndexOf('/'));
    const layerPath = `${directory}/${fileName}`;
    return layerPath;
  };

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: 'linear-gradient(180deg, #f9fafc 0%, #eef1f6 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Удалён для увеличения рабочей области */}

        <div 
          className="planning-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1fr) minmax(900px, 1.8fr) minmax(280px, 1fr)',
            alignItems: 'start',
            justifyContent: 'center',
            gap: '3rem',
            padding: '3rem 5rem',
            maxWidth: '1920px',
            margin: '0 auto',
            minHeight: '90vh',
            boxSizing: 'border-box'
          }}
        >
          {/* Left Panel - Floor Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              alignSelf: 'start',
              position: 'sticky',
              top: '3rem'
            }}
          >
            <div 
              className="neumorphic-card sidebar-panel"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                borderRadius: '25px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.05), inset -3px -3px 8px rgba(255, 255, 255, 0.9), 0 4px 20px rgba(0, 0, 0, 0.05)',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '320px',
                minWidth: '280px',
                height: 'auto',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
            >
              <h2 
                className="text-xl font-semibold text-[#2C3E50] mb-4"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Выбор этажа
              </h2>
              
              {/* Floor Groups */}
              <div className="space-y-4">
                {floorGroups.map((group, groupIndex) => (
                  <div key={group.id}>
                    {/* Group Title */}
                    <h4 
                      className="mb-2"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#2a2a2a',
                        opacity: 0.7,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        textAlign: 'left',
                        marginTop: groupIndex > 0 ? '0.5rem' : '0'
                      }}
                    >
                      {group.title}
                    </h4>
                    
                    {/* Floor Buttons */}
                    <div className="space-y-2">
                      {group.floors.map((floor) => (
                        <motion.button
                          key={floor.id}
                          whileHover={{ 
                            scale: 1.02,
                            y: 1
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedFloor(floor.id);
                            console.log(`🔄 Выбран этаж: ${floor.label}`);
                          }}
                          className="w-full text-left transition-all duration-300"
                          style={{
                            background: '#f7f8fa',
                            borderRadius: '12px',
                            padding: '0.6rem 1rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: selectedFloor === floor.id
                              ? 'inset 3px 3px 6px rgba(0,0,0,0.07), inset -3px -3px 6px rgba(255,255,255,0.9)'
                              : '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
                          }}
                        >
                          <span 
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: selectedFloor === floor.id ? '#5F758D' : '#2a2a2a',
                              display: 'block',
                              lineHeight: '1.4'
                            }}
                          >
                            {floor.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    
                    {/* Divider between groups */}
                    {groupIndex < floorGroups.length - 1 && (
                      <div 
                        style={{
                          height: '1px',
                          background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05) 50%, transparent)',
                          margin: '1rem 0'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center - Interactive Plan Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="floor-plan-container plan-wrapper-column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              alignSelf: 'start',
              gap: '20px'
            }}
          >
            <div 
              id="plan-container"
              className="floor-plan plan-container"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
                margin: '0 auto',
                marginTop: 0,
                width: '100%',
                maxWidth: '1400px',
                minHeight: '600px',
                alignSelf: 'flex-start'
              }}
            >
              <InteractivePlanViewer
                externalZoom={zoomLevel}
                onZoomChange={setZoomLevel}
                minZoom={25}
                maxZoom={400}
                resetTrigger={selectedFloor}
                showHint={false}
              >
                <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
                  {/* Main Plan Image */}
                  <div className="plan-wrapper">
                  {selectedFloor ? (
                    <>
                      {/* Сообщение об отсутствии изображений для section2-floor-2 */}
                      {selectedFloor === 'section2-floor-2' && imagesNotFound && (
                        <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <div className="text-6xl mb-4">📷</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                              Изображения для этой секции не найдены
                            </h3>
                            <p className="text-gray-500">
                              Проверьте наличие файлов в папке /public/plans/section-2-floor-2/
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Загрузка изображений для section2-floor-2 */}
                      {selectedFloor === 'section2-floor-2' && isLoadingImages && (
                        <div className="flex items-center justify-center min-h-[400px]">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-[#5F758D] border-t-transparent rounded-full"
                          />
                          <span className="ml-4 text-[#5F758D] font-medium">
                            Загрузка изображений...
                          </span>
                        </div>
                      )}

                      {/* Галерея изображений для section2-floor-2 */}
                      {selectedFloor === 'section2-floor-2' && galleryImages.length > 0 && !isLoadingImages && (
                        <div className="relative">
                          <motion.img
                            key={`${selectedFloor}-${currentImageIndex}`}
                            src={getImagePath()}
                            alt={galleryImages[currentImageIndex]?.alt || "План этажа"}
                            className="plan-image"
                            loading="eager"
                            decoding="sync"
                            style={{
                              width: '100%',
                              height: 'auto',
                              borderRadius: 0,
                              boxShadow: '0 0 0 transparent',
                              objectFit: 'contain',
                              transition: 'opacity 0.3s ease',
                              position: 'relative',
                              zIndex: 1,
                              border: 'none',
                              imageRendering: '-webkit-optimize-contrast',
                              imageRendering: 'crisp-edges',
                              imageRendering: 'pixelated'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            onLoad={() => {
                              setImageLoaded(true);
                              console.log('✅ Изображение галереи загружено:', getImagePath());
                            }}
                            onError={(e) => {
                              console.error('❌ Ошибка загрузки изображения галереи:', getImagePath());
                              e.target.src = '/images/placeholder.svg';
                              e.target.alt = `Изображение не найдено: ${getImagePath()}`;
                            }}
                          />

                          {/* Навигация по галерее - скрыта для Секция 2 → План второго этажа и План типового этажа */}
                          {(() => {
                            const hideArrows = selectedFloor === 'section2-floor-2' || selectedFloor === 'section2-floor-3-10';
                            return galleryImages.length > 1 && !hideArrows;
                          })() && (
                            <>
                              {/* Кнопка "Назад" */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.9)',
                                  backdropFilter: 'blur(8px)',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '48px',
                                  height: '48px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <ChevronLeft className="w-6 h-6 text-[#5F758D]" />
                              </motion.button>

                              {/* Кнопка "Вперед" */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.9)',
                                  backdropFilter: 'blur(8px)',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '48px',
                                  height: '48px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <ChevronRight className="w-6 h-6 text-[#5F758D]" />
                              </motion.button>

                              {/* Индикатор текущего изображения */}
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                                <div className="flex space-x-2">
                                  {galleryImages.map((_, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setCurrentImageIndex(index)}
                                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex
                                          ? 'bg-[#5F758D] scale-125'
                                          : 'bg-white/60 hover:bg-white/80'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Счетчик изображений */}
                              <div className="absolute top-4 right-4 z-10">
                                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  {currentImageIndex + 1} / {galleryImages.length}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {/* Обычное отображение для других этажей */}
                      {selectedFloor !== 'section2-floor-2' && (
                        <motion.img
                          key={selectedFloor}
                          src={getImagePath()}
                          alt="План этажа"
                          className="plan-image"
                          loading="eager"
                          decoding="sync"
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 0,
                            boxShadow: '0 0 0 transparent',
                            objectFit: 'contain',
                            transition: 'opacity 0.3s ease',
                            position: 'relative',
                            zIndex: 1,
                            border: 'none',
                            imageRendering: '-webkit-optimize-contrast',
                            imageRendering: 'crisp-edges',
                            imageRendering: 'pixelated'
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          onLoad={() => {
                            setImageLoaded(true);
                            console.log('✅ План этажа загружен:', getImagePath());
                          }}
                          onError={(e) => {
                            console.error('❌ Ошибка загрузки плана:', getImagePath());
                            console.warn('⚠️ Проверьте путь к файлу и его наличие в папке PUBLIC');
                            setImageLoaded(false);
                            // Показываем placeholder
                            e.target.src = '/images/placeholder.svg';
                            e.target.alt = `Изображение не найдено: ${getImagePath()}`;
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <p>Выберите этаж</p>
                  )}

                  {/* Layer Overlays */}
                  <AnimatePresence>
                    {activeLayers.map((layerId) => {
                      const layer = layers.find(l => l.id === layerId);
                      if (!layer) return null;
                      
                      // Для слоя "Движение пешеходов" используем анимацию
                      if (layerId === 'pedestrian') {
                        return null; // Рендерим отдельно ниже
                      }
                      
                      const layerPath = getLayerPath(layerId, layer.file);
                      
                      // Специальная прозрачность для слоя террас
                      const layerOpacity = layerId === 'terraces' ? 0.6 : 0.85;
                      
                      return (
                        <motion.img
                          key={layerId}
                          src={layerPath}
                          alt={layer.label}
                          className="absolute object-contain"
                          loading="eager"
                          decoding="sync"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            transformOrigin: 'center center',
                            width: '100%',
                            height: 'auto',
                            zIndex: 2,
                            pointerEvents: 'none',
                            mixBlendMode: 'normal',
                            transition: 'opacity 0.4s ease',
                            imageRendering: '-webkit-optimize-contrast',
                            imageRendering: 'crisp-edges',
                            imageRendering: 'pixelated'
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: layerOpacity }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          onLoad={() => {
                            console.log(`✅ Слой успешно наложен: ${layer.label}`);
                            console.log(`   📂 Путь: ${layerPath}`);
                            if (layerId === 'terraces') {
                              console.log(`   🏠 Слой террас загружен с прозрачностью 60%`);
                            }
                            if (selectedFloor === 'section1-floor-2') {
                              console.log(`   🎯 Наложение для Секции 1, Этаж 2`);
                            }
                            if (selectedFloor === 'section1-floor-3-10') {
                              console.log(`   🎯 Наложение для Секции 1, Типовые этажи 3-10`);
                            }
                          }}
                          onError={(e) => {
                            console.error(`❌ ОШИБКА загрузки слоя: ${layer.label}`);
                            console.error(`   📂 Попытка загрузки: ${layerPath}`);
                            console.error(`   💡 Проверьте наличие файла в папке PUBLIC`);
                            e.target.style.display = 'none';
                          }}
                        />
                      );
                    })}
                  </AnimatePresence>

                  {/* Анимация движения пешеходов */}
                  {activeLayers.includes('pedestrian') && !isEditorOpen && (
                    <PedestrianLayer planId={selectedFloor} />
                  )}

                  {/* Редактор маршрутов - SVG слой для рисования */}
                  {isEditorOpen && (
                    <RouteEditorSVG
                      currentRoute={routeEditorState.currentRoute}
                      setCurrentRoute={routeEditorState.setCurrentRoute}
                      savedRoutes={routeEditorState.savedRoutes}
                    />
                  )}

                  {/* Loading State */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-[#5F758D] border-t-transparent rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>
              </InteractivePlanViewer>
            </div>


            {/* Zoom Controls - перенесено под план */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="zoom-controls"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                position: isFullscreen ? 'fixed' : 'static',
                bottom: isFullscreen ? '20px' : 'auto',
                left: isFullscreen ? '50%' : 'auto',
                transform: isFullscreen ? 'translateX(-50%)' : 'none',
                zIndex: isFullscreen ? 9999 : 'auto',
                background: isFullscreen ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: isFullscreen ? 'blur(10px)' : 'none',
                borderRadius: isFullscreen ? '16px' : '0',
                padding: isFullscreen ? '12px 20px' : '0',
                boxShadow: isFullscreen ? '0 8px 32px rgba(0, 0, 0, 0.2)' : 'none'
              }}
            >
              <div 
                className="flex items-center space-x-4 p-4 rounded-2xl"
                style={{
                  border: 'none',
                  boxShadow: 'none',
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)'
                }}
              >
                {/* Zoom Out */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 25}
                  className="neumorphic-button p-3 rounded-xl disabled:opacity-50"
                >
                  <ZoomOut className="w-5 h-5 text-[#5F758D]" />
                </motion.button>

                {/* Zoom Slider */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-[#5F758D] font-medium">25%</span>
                  <div className="relative">
                    <input
                      type="range"
                      min="25"
                      max="400"
                      value={zoomLevel}
                      onChange={(e) => setZoomLevel(parseInt(e.target.value))}
                      className="w-32 h-2 bg-[#F6F7F9] rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="text-sm text-[#5F758D] font-medium">400%</span>
                </div>

                {/* Zoom In */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 400}
                  className="neumorphic-button p-3 rounded-xl disabled:opacity-50"
                >
                  <ZoomIn className="w-5 h-5 text-[#5F758D]" />
                </motion.button>

                {/* Current Zoom */}
                <div className="neumorphic-display px-4 py-2 rounded-xl">
                  <span className="text-sm font-medium text-[#5F758D]">
                    {zoomLevel}%
                  </span>
                </div>

                {/* Reset */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetZoom}
                  className="neumorphic-button p-3 rounded-xl"
                >
                  <RotateCcw className="w-5 h-5 text-[#5F758D]" />
                </motion.button>

                {/* Fullscreen */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFullscreen}
                  className="neumorphic-button p-3 rounded-xl"
                  style={{
                    background: isFullscreen 
                      ? 'linear-gradient(135deg, #5F758D 0%, #4a5f7a 100%)'
                      : undefined,
                    color: isFullscreen ? 'white' : undefined
                  }}
                  title={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
                >
                  <Maximize2 className="w-5 h-5" style={{ color: isFullscreen ? 'white' : '#5F758D' }} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Layer Filters */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              alignSelf: 'start',
              position: 'sticky',
              top: '3rem'
            }}
          >
            <div 
              className="neumorphic-card sidebar-panel"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                borderRadius: '25px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.05), inset -3px -3px 8px rgba(255, 255, 255, 0.9), 0 4px 20px rgba(0, 0, 0, 0.05)',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '320px',
                minWidth: '280px',
                height: 'auto',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
            >
              <h2 
                className="text-xl font-semibold text-[#2C3E50] mb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Фильтры слоёв
              </h2>

              {/* Кнопка редактора маршрутов - показывается только при активном слое "Движение пешеходов" */}
              {activeLayers.includes('pedestrian') && (
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditorOpen(!isEditorOpen)}
                  style={{
                    width: '100%',
                    background: isEditorOpen 
                      ? 'linear-gradient(135deg, #28a745 0%, #20883b 100%)'
                      : 'linear-gradient(135deg, #5F758D 0%, #4a5f7a 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    marginBottom: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: isEditorOpen 
                      ? '0 4px 12px rgba(40, 167, 69, 0.4)'
                      : '0 4px 12px rgba(95, 117, 141, 0.3)'
                  }}
                >
                  <Edit3 size={16} />
                  {isEditorOpen ? '✓ Редактирование активно' : 'Редактировать маршруты'}
                </motion.button>
              )}
              
              <AnimatePresence mode="wait">
                <div className="space-y-3">
                  {getAvailableFilters(currentFloorType).map((filterLabel) => {
                    // Находим слой по его label
                    const layer = layers.find(l => l.label === filterLabel);
                    if (!layer) {
                      console.warn(`⚠️ Слой не найден для фильтра: ${filterLabel}`);
                      return null;
                    }

                    if (layer.label === 'МОПы' && isSecondFloorSelected) {
                      return null;
                    }
                    
                    const isActive = activeLayers.includes(layer.id);
                    
                    return (
                      <motion.button
                        key={layer.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleLayer(layer.id)}
                        className={`w-full text-left p-3 rounded-2xl transition-all duration-300 ${
                          isActive
                            ? 'neumorphic-active'
                            : 'neumorphic-button'
                        }`}
                        style={{
                          backgroundColor: isActive ? '#e6f2ff' : undefined,
                          border: isActive ? '1px solid #4a8eff' : undefined,
                          transform: isActive ? 'scale(1.01)' : undefined
                        }}
                      >
                        <span 
                          className="text-base font-medium"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            color: isActive ? '#5F758D' : '#2C3E50'
                          }}
                        >
                          {layer.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </AnimatePresence>


              {/* Панель управления редактором маршрутов - в боковой панели */}
              {isEditorOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {/* Подсказка */}
                  <div style={{
                    fontSize: '12px',
                    color: '#5F758D',
                    marginBottom: '12px',
                    padding: '8px',
                    background: 'rgba(95, 117, 141, 0.1)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    ✏️ Кликайте по плану для создания точек
                  </div>

                  {/* Текущий маршрут */}
                  {routeEditorState.currentRoute.length > 0 && (
                    <div style={{
                      marginBottom: '12px',
                      padding: '10px',
                      background: '#fff9e6',
                      borderRadius: '8px',
                      border: '1px solid #ffc107'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#5F758D',
                        marginBottom: '8px'
                      }}>
                        Текущий маршрут
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                        Точек: {routeEditorState.currentRoute.length}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={routeEditorState.undoLastPoint}
                          disabled={routeEditorState.currentRoute.length === 0}
                          style={{
                            flex: 1,
                            background: '#ffc107',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}
                        >
                          ↩ Отменить
                        </button>
                        <button
                          onClick={routeEditorState.finishRoute}
                          disabled={routeEditorState.currentRoute.length < 2}
                          style={{
                            flex: 1,
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}
                        >
                          ✓ Завершить
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Сохранённые маршруты */}
                  {routeEditorState.savedRoutes.length > 0 && (
                    <div style={{
                      marginBottom: '12px',
                      padding: '10px',
                      background: '#e6f7ff',
                      borderRadius: '8px',
                      border: '1px solid #00e5ff',
                      maxHeight: '120px',
                      overflowY: 'auto'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#5F758D',
                        marginBottom: '8px'
                      }}>
                        Маршруты ({routeEditorState.savedRoutes.length})
                      </div>
                      {routeEditorState.savedRoutes.map((route, idx) => (
                        <div key={route.id} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '4px 6px',
                          background: 'white',
                          borderRadius: '4px',
                          marginBottom: '4px',
                          fontSize: '11px'
                        }}>
                          <span>Маршрут {idx + 1} ({route.points.length} т.)</span>
                          <button
                            onClick={() => routeEditorState.deleteRoute(route.id)}
                            style={{
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              cursor: 'pointer',
                              fontSize: '10px'
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Основные действия */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button
                      onClick={routeEditorState.saveRoutes}
                      disabled={routeEditorState.savedRoutes.length === 0}
                      style={{
                        width: '100%',
                        background: routeEditorState.savedRoutes.length === 0 ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        cursor: routeEditorState.savedRoutes.length === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      💾 Сохранить
                    </button>
                    <button
                      onClick={routeEditorState.clearAll}
                      style={{
                        width: '100%',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      🗑️ Очистить всё
                    </button>
                    <button
                      onClick={() => setIsEditorOpen(false)}
                      style={{
                        width: '100%',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      ✖ Закрыть
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Section Cut Block - Новый видовой блок с разрезом здания */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="section-cut-container"
          style={{
            width: '100%',
            maxWidth: '1400px',
            margin: '6rem auto 0 auto',
            padding: '0 2rem',
            position: 'static',
            zIndex: 'auto'
          }}
        >
          {/* Заголовок блока разреза */}
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2C3E50',
              textAlign: 'center',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #5F758D 0%, #4a5f7a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Схема функционального зонирования
          </motion.h3>

          {/* Контейнер для изображения разреза и фильтра */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}
          >
            {/* Основной контейнер с изображением */}
            <div
              className="section-cut-wrapper"
              style={{
                position: 'relative',
                background: 'transparent',
                borderRadius: '24px',
                padding: '1rem',
                overflow: 'hidden',
                minHeight: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: '1',
                maxWidth: '1000px'
              }}
            >
              <InteractivePlanViewer
                externalZoom={100}
                onZoomChange={() => {}} // Разрез не связан с общими элементами управления
                minZoom={25}
                maxZoom={300}
                resetTrigger="section-cut"
                showHint={false}
              >
                <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
                  {/* Основное изображение разреза */}
                  <motion.img
                    src="/plans/razrez/Основное.jpg"
                    alt="Разрез здания"
                    className="section-cut-image"
                    loading="eager"
                    decoding="sync"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '20px',
                      objectFit: 'contain',
                      transition: 'opacity 0.3s ease',
                      position: 'relative',
                      zIndex: 1,
                      border: 'none',
                      imageRendering: '-webkit-optimize-contrast',
                      imageRendering: 'crisp-edges',
                      imageRendering: 'pixelated',
                      maxHeight: '600px',
                      boxShadow: 'none'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onLoad={() => {
                      console.log('✅ Разрез здания загружен: /plans/razrez/Основное.jpg');
                    }}
                    onError={(e) => {
                      console.error('❌ Ошибка загрузки разреза: /plans/razrez/Основное.jpg');
                      console.warn('⚠️ Проверьте путь к файлу и его наличие в папке PUBLIC');
                      e.target.src = '/images/placeholder.svg';
                      e.target.alt = 'Изображение разреза не найдено';
                    }}
                  />

                  {/* Слой зонирования (условно отображается) */}
                  {showZoningLayer && (
                    <motion.img
                      src="/plans/razrez/2.png"
                      alt="Зонирование разреза"
                      className="absolute top-0 left-0 w-full h-auto"
                      loading="eager"
                      decoding="sync"
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: 'auto',
                        zIndex: 2,
                        pointerEvents: 'none',
                        mixBlendMode: 'normal',
                        opacity: 0.8,
                        borderRadius: '20px',
                        imageRendering: '-webkit-optimize-contrast',
                        imageRendering: 'crisp-edges',
                        imageRendering: 'pixelated',
                        maxHeight: '600px',
                        boxShadow: 'none'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      onLoad={() => {
                        console.log('✅ Слой зонирования разреза наложен');
                      }}
                      onError={(e) => {
                        console.log('ℹ️ Слой зонирования не найден');
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </InteractivePlanViewer>
            </div>

            {/* Фильтр слоя зонирования */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              style={{
                alignSelf: 'flex-start',
                position: 'sticky',
                top: '2rem'
              }}
            >
              <div 
                className="neumorphic-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  borderRadius: '32px',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.06), inset -4px -4px 12px rgba(255, 255, 255, 0.9), 0 8px 32px rgba(0, 0, 0, 0.08)',
                  padding: '24px',
                  width: '280px',
                  minWidth: '260px',
                  transition: 'all 0.3s ease'
                }}
              >
                <h4 
                  className="text-lg font-semibold text-[#2C3E50] mb-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Фильтры
                </h4>
                
                {/* Кнопка фильтра зонирования */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleZoningLayer}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-300 ${
                    showZoningLayer
                      ? 'neumorphic-active'
                      : 'neumorphic-button'
                  }`}
                  style={{
                    background: showZoningLayer ? '#f7f8fa' : '#f7f8fa',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: showZoningLayer
                      ? 'inset 3px 3px 6px rgba(0,0,0,0.07), inset -3px -3px 6px rgba(255,255,255,0.9)'
                      : '3px 3px 6px rgba(0,0,0,0.05), -3px -3px 6px rgba(255,255,255,0.8)'
                  }}
                >
                  <span 
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: showZoningLayer ? '#5F758D' : '#2a2a2a',
                      display: 'block',
                      lineHeight: '1.4'
                    }}
                  >
                    Зонирование
                  </span>
                </motion.button>

                {/* Легенда с условными обозначениями - только при активном зонировании */}
                <AnimatePresence>
                  {showZoningLayer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: 'easeInOut',
                        height: { duration: 0.3 }
                      }}
                      style={{
                        background: '#F3F4F6',
                        borderRadius: '16px',
                        padding: '16px',
                        boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.05), inset -2px -2px 4px rgba(255, 255, 255, 0.8)',
                        overflow: 'hidden'
                      }}
                    >
                      <h5 
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1B1B1F',
                          marginBottom: '12px',
                          opacity: 0.7
                        }}
                      >
                        Условные обозначения
                      </h5>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {/* Административные помещения секция 1 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#A8B3A2',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              color: '#1B1B1F',
                              opacity: 0.8,
                              lineHeight: '1.4'
                            }}
                          >
                            Административные помещения секция 1
                          </span>
                        </div>

                        {/* Технические помещения */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#F4A6A6',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              color: '#1B1B1F',
                              opacity: 0.8,
                              lineHeight: '1.4'
                            }}
                          >
                            Технические помещения
                          </span>
                        </div>

                        {/* Жилые помещения */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#DEEAF5',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              color: '#1B1B1F',
                              opacity: 0.8,
                              lineHeight: '1.4'
                            }}
                          >
                            Жилые помещения
                          </span>
                        </div>

                        {/* МОПы */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#F5EBAF',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              color: '#1B1B1F',
                              opacity: 0.8,
                              lineHeight: '1.4'
                            }}
                          >
                            МОПы
                          </span>
                        </div>

                        {/* Административные помещения секция 2 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#C7BAE1',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              color: '#1B1B1F',
                              opacity: 0.8,
                              lineHeight: '1.4'
                            }}
                          >
                            Административные помещения секция 2
                          </span>
                        </div>

                        {/* Машино-места */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#CFF9DE',
                              borderRadius: '4px',
                              flexShrink: 0
                            }}
                          />
                          <span 
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '14px',
                              color: '#1B1B1F',
                              opacity: 0.8,
                              lineHeight: '1.4'
                            }}
                          >
                            Машино-места
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Текстовый блок с технико-экономическими показателями */}
        <div className="w-full max-w-4xl mx-auto px-4 mt-5">
          <div className="text-center">
            <div className="text-base leading-relaxed text-gray-800 space-y-4">
              <div>
                <p className="font-medium mb-2">Продаваемая площадь — концепт-продукт:</p>
                <div className="ml-4 space-y-1">
                  <p>— Жилая — <span className="font-semibold">13 782</span> м²</p>
                  <p>— Коммерция — <span className="font-semibold">2 354</span> м²</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">Продаваемая площадь — посадка эскиз (до повышения этажности и балконов):</p>
                <div className="ml-4 space-y-1">
                  <p>— Жилая — <span className="font-semibold">10 919</span> м²</p>
                  <p>— Коммерция — <span className="font-semibold">2 108</span> м²</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Стрелка навигации вниз */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNextSection}
          className="fixed right-8 bottom-8 z-50 navigation-arrow"
          style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <ArrowDown 
            size={20} 
            className="arrow-icon"
            style={{ 
              color: '#5F758D',
              transition: 'color 0.3s ease'
            }} 
          />
        </motion.button>
      </div>
    </div>
  );
};

export default PlanningSolutions;
