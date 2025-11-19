import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const InteractivePlanViewer = ({ 
  children, 
  externalZoom = 100, 
  onZoomChange,
  minZoom = 25,
  maxZoom = 400,
  resetTrigger, // Новый prop для сброса при изменении
  showHint = true // Пропс для управления отображением подсказки
}) => {
  const [scale, setScale] = useState(externalZoom / 100);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(null);
  const [showResetNotification, setShowResetNotification] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false); // Флаг активации зума
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const prevResetTrigger = useRef(resetTrigger);

  // Синхронизация внешнего zoom с внутренним scale
  useEffect(() => {
    setScale(externalZoom / 100);
  }, [externalZoom]);

  // Автоматический сброс при изменении resetTrigger (например, при смене этажа)
  useEffect(() => {
    if (resetTrigger !== prevResetTrigger.current && prevResetTrigger.current !== undefined) {
      prevResetTrigger.current = resetTrigger;
      
      // Плавный сброс к начальному состоянию
      setScale(1);
      setPosition({ x: 0, y: 0 });
      
      if (onZoomChange) {
        onZoomChange(100);
      }
      
      // Уведомление о сбросе отключено по требованию
      // setShowResetNotification(true);
      // setTimeout(() => setShowResetNotification(false), 2000);
      
      console.log('🔄 План сброшен к исходному состоянию');
    }
    
    // Инициализация на первом рендере
    if (prevResetTrigger.current === undefined) {
      prevResetTrigger.current = resetTrigger;
    }
  }, [resetTrigger, onZoomChange]);

  // Обработка колеса мыши для zoom
  const handleWheel = useCallback((e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
      return;
    }

    e.preventDefault();

    // Активируем зум, если ещё не активирован
    if (!isZoomActive) {
      setIsZoomActive(true);
    }

    const delta = -e.deltaY;
    const zoomFactor = delta > 0 ? 1.1 : 0.9;
    const newScale = Math.max(minZoom / 100, Math.min(maxZoom / 100, scale * zoomFactor));
    
    if (newScale !== scale) {
      // Zoom к курсору
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const deltaScale = newScale - scale;
      const newX = position.x - (x - rect.width / 2) * deltaScale;
      const newY = position.y - (y - rect.height / 2) * deltaScale;
      
      setScale(newScale);
      setPosition({ x: newX, y: newY });
      
      // Уведомляем родительский компонент об изменении zoom
      if (onZoomChange) {
        onZoomChange(Math.round(newScale * 100));
      }
    }
  }, [isZoomActive, scale, position, minZoom, maxZoom, onZoomChange]);

  // Обработка клика для активации зума
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    setIsZoomActive(true);
    console.log('🎯 План активирован для зума');
  }, []);

  // Начало перетаскивания
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Только левая кнопка мыши
    
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    // Изменяем курсор
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, [position]);

  // Перемещение
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Ограничение перемещения
    const rect = containerRef.current.getBoundingClientRect();
    const contentWidth = rect.width * scale;
    const contentHeight = rect.height * scale;
    
    const maxX = Math.max(0, (contentWidth - rect.width) / 2);
    const maxY = Math.max(0, (contentHeight - rect.height) / 2);
    
    setPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY))
    });
  }, [isDragging, dragStart, scale]);

  // Конец перетаскивания
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = scale > 1 ? 'grab' : 'default';
      }
    }
  }, [isDragging, scale]);

  // Двойной клик для сброса
  const handleDoubleClick = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    if (onZoomChange) {
      onZoomChange(100);
    }
  }, [onZoomChange]);

  // Вычисление расстояния между двумя touch-точками
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Обработка touch start
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      // Pinch gesture
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1) {
      // Pan gesture
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      });
    }
  }, [position]);

  // Обработка touch move
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      // Pinch zoom
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      const scaleDelta = distance / lastTouchDistance;
      const newScale = Math.max(minZoom / 100, Math.min(maxZoom / 100, scale * scaleDelta));
      
      if (newScale !== scale) {
        setScale(newScale);
        setLastTouchDistance(distance);
        
        if (onZoomChange) {
          onZoomChange(Math.round(newScale * 100));
        }
      }
    } else if (e.touches.length === 1 && isDragging) {
      // Pan
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      const rect = containerRef.current.getBoundingClientRect();
      const contentWidth = rect.width * scale;
      const contentHeight = rect.height * scale;
      
      const maxX = Math.max(0, (contentWidth - rect.width) / 2);
      const maxY = Math.max(0, (contentHeight - rect.height) / 2);
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  }, [lastTouchDistance, scale, isDragging, dragStart, minZoom, maxZoom, onZoomChange]);

  // Обработка touch end
  const handleTouchEnd = useCallback(() => {
    setLastTouchDistance(null);
    setIsDragging(false);
  }, []);

  // Добавление/удаление глобальных обработчиков
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Обновление курсора при изменении масштаба
  useEffect(() => {
    if (containerRef.current && !isDragging) {
      containerRef.current.style.cursor = scale > 1 ? 'grab' : 'default';
    }
  }, [scale, isDragging]);

  // Обработка клика вне плана для деактивации зума
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsZoomActive(false);
        console.log('🚫 План деактивирован - зум отключен');
      }
    };

    if (isZoomActive) {
      document.addEventListener('click', handleDocumentClick);
      return () => document.removeEventListener('click', handleDocumentClick);
    }
  }, [isZoomActive]);

  // Привязка wheel-события с отключенным пассивным режимом
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelListener = (event) => handleWheel(event);
    container.addEventListener('wheel', wheelListener, { passive: false });

    return () => {
      container.removeEventListener('wheel', wheelListener);
    };
  }, [handleWheel]);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: scale > 1 ? 'grab' : 'default',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      <motion.div
        ref={contentRef}
        animate={{
          scale: scale,
          x: position.x,
          y: position.y
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
        style={{
          transformOrigin: 'center center',
          width: '100%',
          height: '100%',
          willChange: 'transform'
        }}
      >
        {children}
      </motion.div>
      
      {/* Hint при первой загрузке */}
      {showHint && scale === 1 && !showResetNotification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 2 }}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: '500',
            pointerEvents: 'none',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            lineHeight: '1.5'
          }}
        >
          💡 Клик по плану → колесо мыши/Pinch - масштаб | Перетаскивание - перемещение | Двойной клик - сброс
        </motion.div>
      )}

      {/* Уведомление о сбросе при смене этажа - ОТКЛЮЧЕНО */}
      {false && showResetNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #5F758D 0%, #4a5f7a 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            pointerEvents: 'none',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(95, 117, 141, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '18px' }}>🔄</span>
          <span>План сброшен к исходному масштабу</span>
        </motion.div>
      )}
    </div>
  );
};

export default InteractivePlanViewer;

