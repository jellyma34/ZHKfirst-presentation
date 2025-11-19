import React, { useRef, useEffect, useState } from 'react';

const RouteEditorSVG = ({
  currentRoute,
  setCurrentRoute,
  savedRoutes,
  onPointDragStart,
  onPointDragEnd
}) => {
  const svgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPointIndex, setDraggedPointIndex] = useState(null);

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
    if (e.target.tagName === 'circle') return;

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
    <svg
      ref={svgRef}
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid meet"
      onClick={handleSVGClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'crosshair',
        zIndex: 100,
        pointerEvents: 'all'
      }}
    >
      {/* Сохраненные маршруты с белой подложкой */}
      {savedRoutes.map((route) => (
        <g key={route.id}>
          {/* Белая подложка */}
          <path
            d={pointsToPath(route.points)}
            style={{
              stroke: 'white',
              strokeWidth: 10,
              fill: 'none',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              opacity: 0.8
            }}
          />
          {/* Основная жёлтая линия */}
          <path
            d={pointsToPath(route.points)}
            style={{
              stroke: '#fff000',
              strokeWidth: 6,
              fill: 'none',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 1)) drop-shadow(0 0 8px rgba(255, 240, 0, 1)) drop-shadow(0 0 12px rgba(255, 240, 0, 0.8))',
              opacity: 1
            }}
          />
          {route.points.map((point, idx) => (
            <circle
              key={`${route.id}-${idx}`}
              cx={point.x}
              cy={point.y}
              r={5}
              style={{
                fill: '#00e5ff',
                stroke: '#fff',
                strokeWidth: 2,
                cursor: 'pointer'
              }}
            />
          ))}
        </g>
      ))}

      {/* Текущий редактируемый маршрут с белой подложкой */}
      {currentRoute.length > 0 && (
        <g>
          {currentRoute.length > 1 && (
            <>
              {/* Белая подложка для текущего маршрута */}
              <path
                d={pointsToPath(currentRoute)}
                style={{
                  stroke: 'white',
                  strokeWidth: 10,
                  fill: 'none',
                  strokeDasharray: '10 5',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  opacity: 0.8
                }}
              />
              {/* Основная жёлтая линия текущего маршрута */}
              <path
                d={pointsToPath(currentRoute)}
                style={{
                  stroke: '#ffc107',
                  strokeWidth: 6,
                  fill: 'none',
                  strokeDasharray: '10 5',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 1)) drop-shadow(0 0 6px rgba(255, 193, 7, 1)) drop-shadow(0 0 12px rgba(255, 193, 7, 0.8))',
                  opacity: 1
                }}
              />
            </>
          )}
          {currentRoute.map((point, idx) => (
            <circle
              key={`current-${idx}`}
              cx={point.x}
              cy={point.y}
              r={7}
              onMouseDown={(e) => handlePointMouseDown(idx, e)}
              style={{
                fill: '#ffc107',
                stroke: '#fff',
                strokeWidth: 2,
                cursor: 'move',
                filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.4))'
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
};

export default RouteEditorSVG;

