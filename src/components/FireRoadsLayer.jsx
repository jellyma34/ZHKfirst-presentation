import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FireRoadsLayer = ({ planId }) => {
  const [savedRoutes, setSavedRoutes] = useState([]);

  // Загрузка сохранённых маршрутов
  useEffect(() => {
    loadSavedRoutes();
  }, [planId]);

  const loadSavedRoutes = async () => {
    try {
      // Проверяем localStorage
      const localData = localStorage.getItem(`routes-${planId}`);
      if (localData) {
        const routes = JSON.parse(localData);
        // Фильтруем только пожарные проезды (если есть метка типа)
        const fireRoutes = routes.filter(route => route.type === 'fire_roads' || !route.type);
        setSavedRoutes(fireRoutes);
        console.log(`✅ Загружены пожарные проезды для ${planId}`);
        return;
      }

      // Пытаемся загрузить из файла
      const response = await fetch(`/routes/${planId}.json`);
      if (response.ok) {
        const routes = await response.json();
        const fireRoutes = routes.filter(route => route.type === 'fire_roads' || !route.type);
        setSavedRoutes(fireRoutes);
        console.log(`✅ Загружены пожарные проезды из файла для ${planId}`);
      }
    } catch (error) {
      console.log(`ℹ️ Нет сохраненных пожарных проездов для ${planId}`);
    }
  };

  // Преобразование точек в SVG path
  const pointsToPath = (points) => {
    if (points.length < 2) return '';
    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
  };

  if (savedRoutes.length === 0) {
    return null;
  }

  return (
    <motion.svg 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {savedRoutes.map((route) => (
        <motion.path
          key={route.id}
          d={pointsToPath(route.points)}
          style={{
            stroke: '#ff3b3b',
            strokeWidth: 3,
            fill: 'none',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            opacity: 0.9
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      ))}
    </motion.svg>
  );
};

export default FireRoadsLayer;
