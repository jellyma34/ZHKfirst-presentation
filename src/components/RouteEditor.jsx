import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Trash2, Undo, Download } from 'lucide-react';

const RouteEditor = ({ planId, onClose, renderControlsBelow = false, activeLayer = 'pedestrian' }) => {
  const svgRef = useRef(null);
  const [currentRoute, setCurrentRoute] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPointIndex, setDraggedPointIndex] = useState(null);

  // Стили линий в зависимости от типа слоя
  const getLineStyle = () => {
    if (activeLayer === 'fire_roads') {
      return {
        stroke: '#ff3b3b',
        strokeWidth: 3,
        opacity: 0.9
      };
    } else {
      return {
        stroke: '#4b5563',
        strokeWidth: 3,
        opacity: 0.8
      };
    }
  };

  const getPointStyle = () => {
    if (activeLayer === 'fire_roads') {
      return {
        fill: '#ff3b3b',
        stroke: '#ffffff',
        strokeWidth: 2
      };
    } else {
      return {
        fill: '#4b5563',
        stroke: '#ffffff',
        strokeWidth: 2
      };
    }
  };

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

  // Получение координат в SVG
  const getSVGCoords = (e) => {
    const svg = svgRef.current;
    if (!svg) return null;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: Math.round(cursor.x), y: Math.round(cursor.y) };
  };

  // Клик по SVG - добавление точки
  const handleSVGClick = (e) => {
    if (isDragging) return;
    if (e.target.tagName === 'circle') return; // Не добавляем точку при клике на точку

    const coords = getSVGCoords(e);
    if (coords) {
      setCurrentRoute(prev => [...prev, coords]);
      console.log('➕ Добавлена точка:', coords);
    }
  };

  // Начало перетаскивания
  const handlePointMouseDown = (index, e) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedPointIndex(index);
  };

  // Перетаскивание точки
  const handleMouseMove = (e) => {
    if (!isDragging || draggedPointIndex === null) return;

    const coords = getSVGCoords(e);
    if (coords) {
      setCurrentRoute(prev => {
        const newRoute = [...prev];
        newRoute[draggedPointIndex] = coords;
        return newRoute;
      });
    }
  };

  // Завершение перетаскивания
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedPointIndex(null);
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
      points: currentRoute,
      type: activeLayer // Сохраняем тип маршрута
    };

    setSavedRoutes(prev => [...prev, newRoute]);
    setCurrentRoute([]);
    console.log(`✅ ${activeLayer === 'fire_roads' ? 'Пожарный проезд' : 'Маршрут'} завершен:`, newRoute);
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

  // Конвертация точек в SVG path
  const pointsToPath = (points) => {
    if (!points || points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  // Обработчики мыши на document
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, draggedPointIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(3px)'
      }}
    >
      {/* Панель инструментов - перемещена вниз под блок масштабирования */}
      <div style={{
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '12px',
        zIndex: 1300
      }}>
        {/* Текущий маршрут */}
        {currentRoute.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            minWidth: '180px',
            maxWidth: '220px'
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
              Точек: {currentRoute.length}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={undoLastPoint}
                disabled={currentRoute.length === 0}
                style={{
                  flex: 1,
                  background: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                <Undo size={14} /> Отменить
              </button>
              <button
                onClick={finishRoute}
                disabled={currentRoute.length < 2}
                style={{
                  flex: 1,
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                ✓ Завершить
              </button>
            </div>
          </div>
        )}

        {/* Сохраненные маршруты */}
        {savedRoutes.length > 0 && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            minWidth: '180px',
            maxWidth: '220px',
            maxHeight: '150px',
            overflowY: 'auto'
          }}>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: '600', 
              color: '#5F758D',
              marginBottom: '8px'
            }}>
              Маршруты ({savedRoutes.length})
            </div>
            {savedRoutes.map((route, idx) => (
              <div key={route.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px',
                background: '#f8f9fa',
                borderRadius: '6px',
                marginBottom: '4px'
              }}>
                <span style={{ fontSize: '12px', color: '#333' }}>
                  Маршрут {idx + 1} ({route.points.length} т.)
                </span>
                <button
                  onClick={() => deleteRoute(route.id)}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '11px'
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Основные действия */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minWidth: '180px',
          maxWidth: '200px'
        }}>
          <button
            onClick={saveRoutes}
            disabled={savedRoutes.length === 0}
            style={{
              background: savedRoutes.length === 0 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              cursor: savedRoutes.length === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <Save size={16} /> Сохранить
          </button>

          <button
            onClick={clearAll}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <Trash2 size={16} /> Очистить всё
          </button>

          <button
            onClick={onClose}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <X size={16} /> Закрыть
          </button>
        </div>
      </div>

      {/* SVG редактор */}
      <svg
        ref={svgRef}
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleSVGClick}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'crosshair'
        }}
      >
        {/* Сохраненные маршруты */}
        {savedRoutes.map((route) => (
          <g key={route.id}>
            <path
              d={pointsToPath(route.points)}
              style={{
                ...getLineStyle(),
                fill: 'none',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                filter: activeLayer === 'fire_roads' 
                  ? 'drop-shadow(0 0 4px rgba(255, 59, 59, 0.6))'
                  : 'drop-shadow(0 0 4px rgba(0, 229, 255, 0.6))'
              }}
            />
            {route.points.map((point, idx) => (
              <circle
                key={`${route.id}-${idx}`}
                cx={point.x}
                cy={point.y}
                r={5}
                style={{
                  ...getPointStyle(),
                  cursor: 'pointer'
                }}
              />
            ))}
          </g>
        ))}

        {/* Текущий редактируемый маршрут */}
        {currentRoute.length > 0 && (
          <g>
            {currentRoute.length > 1 && (
              <path
                d={pointsToPath(currentRoute)}
                style={{
                  ...getLineStyle(),
                  fill: 'none',
                  strokeDasharray: '8 4',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  filter: activeLayer === 'fire_roads' 
                    ? 'drop-shadow(0 0 4px rgba(255, 59, 59, 0.6))'
                    : 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.6))'
                }}
              />
            )}
            {currentRoute.map((point, idx) => (
              <circle
                key={`current-${idx}`}
                cx={point.x}
                cy={point.y}
                r={7}
                onMouseDown={(e) => handlePointMouseDown(idx, e)}
                style={{
                  ...getPointStyle(),
                  cursor: 'move',
                  filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.4))'
                }}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Подсказка - перемещена наверх */}
      <div style={{
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '12px 20px',
        fontSize: '14px',
        color: '#5F758D',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        fontWeight: '500',
        zIndex: 1310
      }}>
        ✏️ Кликайте по плану, чтобы создать точки маршрута. Перетаскивайте точки для коррекции.
      </div>
    </motion.div>
  );
};

export default RouteEditor;

