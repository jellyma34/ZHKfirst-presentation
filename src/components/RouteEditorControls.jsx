import React from 'react';
import { motion } from 'framer-motion';
import { Save, X, Trash2, Undo } from 'lucide-react';

const RouteEditorControls = ({
  currentRoute,
  savedRoutes,
  onUndoLastPoint,
  onFinishRoute,
  onDeleteRoute,
  onSaveRoutes,
  onClearAll,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '24px',
        paddingBottom: '24px'
      }}
    >
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
              onClick={onUndoLastPoint}
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
              onClick={onFinishRoute}
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
                onClick={() => onDeleteRoute(route.id)}
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
          onClick={onSaveRoutes}
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
          onClick={onClearAll}
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
    </motion.div>
  );
};

export default RouteEditorControls;

