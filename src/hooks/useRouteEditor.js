import { useState, useEffect } from 'react';

export const useRouteEditor = (planId) => {
  const [currentRoute, setCurrentRoute] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);

  // Загрузка существующих маршрутов
  useEffect(() => {
    loadExistingRoutes();
  }, [planId]);

  const loadExistingRoutes = async () => {
    try {
      // Проверяем localStorage
      const localData = localStorage.getItem(`routes-${planId}`);
      if (localData) {
        const routes = JSON.parse(localData);
        setSavedRoutes(routes);
        console.log(`✅ Загружены маршруты из localStorage для ${planId}`);
        return;
      }

      // Пытаемся загрузить из файла
      const response = await fetch(`/routes/${planId}.json`);
      if (response.ok) {
        const routes = await response.json();
        setSavedRoutes(routes);
        console.log(`✅ Загружены маршруты из файла для ${planId}`);
      }
    } catch (error) {
      console.log(`ℹ️ Нет сохраненных маршрутов для ${planId}`);
    }
  };

  // Отменить последнюю точку
  const undoLastPoint = () => {
    setCurrentRoute(prev => prev.slice(0, -1));
  };

  // Завершить текущий маршрут
  const finishRoute = () => {
    if (currentRoute.length < 2) {
      alert('Маршрут должен содержать минимум 2 точки');
      return;
    }

    const newRoute = {
      id: `route-${Date.now()}`,
      points: currentRoute
    };

    setSavedRoutes(prev => [...prev, newRoute]);
    setCurrentRoute([]);
    console.log('✅ Маршрут завершен:', newRoute);
  };

  // Удалить маршрут
  const deleteRoute = (routeId) => {
    setSavedRoutes(prev => prev.filter(r => r.id !== routeId));
    console.log('🗑️ Маршрут удален:', routeId);
  };

  // Очистить все
  const clearAll = () => {
    if (confirm('Удалить все маршруты?')) {
      setSavedRoutes([]);
      setCurrentRoute([]);
    }
  };

  // Сохранить маршруты
  const saveRoutes = () => {
    // Сохраняем в localStorage
    localStorage.setItem(`routes-${planId}`, JSON.stringify(savedRoutes));

    // Скачиваем JSON файл
    const blob = new Blob([JSON.stringify(savedRoutes, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `routes-${planId}.json`;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`💾 Сохранено ${savedRoutes.length} маршрутов для ${planId}`);
    alert(`Маршруты сохранены! (${savedRoutes.length} шт.)\nФайл: routes-${planId}.json`);
  };

  return {
    currentRoute,
    setCurrentRoute,
    savedRoutes,
    setSavedRoutes,
    undoLastPoint,
    finishRoute,
    deleteRoute,
    clearAll,
    saveRoutes
  };
};

