import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './CustomCursor';

const PremiumSplashScreen = ({ onComplete }) => {
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    // Make splash screen clickable after 2 seconds
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (isClickable) {
      onComplete?.();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-white">
        <CustomCursor />
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-full flex flex-col items-center justify-center cursor-pointer"
          onClick={handleClick}
        >
        <div className="flex flex-col items-center">
          {/* Logo with inner glow */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-12"
          >
            <motion.img
              src="/logo/logo.svg.svg"
              alt="Архитектурный логотип"
              className="w-24 h-24 relative z-10"
              style={{
                filter: 'drop-shadow(inset 0 0 20px rgba(0, 0, 0, 0.15))'
              }}
            />
            
            {/* Inner glow effect */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 w-24 h-24 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
            />
          </motion.div>

          {/* Main tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="text-lg font-light tracking-[0.3em] uppercase text-black mb-8 text-center"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            АРХИТЕКТУРА, ВДОХНОВЛЕННАЯ ТЕХНОЛОГИЯМИ
          </motion.h1>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClickable ? 1 : 0.3 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <p 
              className="text-xs text-[#A0A3A8] font-light tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Нажмите для продолжения
            </p>
          </motion.div>

          {/* Subtle click indicator */}
          {isClickable && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4, ease: "backOut" }}
              className="mt-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-1 h-1 bg-[#A0A3A8] rounded-full mx-auto"
              />
            </motion.div>
          )}
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PremiumSplashScreen;
