import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumLoader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClickable, setIsClickable] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Make loader clickable after 2 seconds
    const clickableTimer = setTimeout(() => {
      setIsClickable(true);
    }, 2000);

    // Auto-complete after 4 seconds
    const autoCompleteTimer = setTimeout(() => {
      if (isLoading) {
        handleComplete();
      }
    }, 4000);

    return () => {
      clearTimeout(clickableTimer);
      clearTimeout(autoCompleteTimer);
    };
  }, [isLoading]);

  const handleComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 1000);
  };

  const handleClick = () => {
    if (isClickable && !isTransitioning) {
      handleComplete();
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #F7F8FA 0%, #FFFFFF 100%)'
          }}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
              }}
              exit={{ 
                scale: 0.3, 
                opacity: 0,
                x: -200,
                y: -100
              }}
              transition={{ 
                initial: { duration: 0.8, ease: "easeOut" },
                exit: { duration: 1, ease: "easeInOut" }
              }}
              className="relative mb-12"
            >
              {/* Glow Effect */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 -m-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(60, 64, 72, 0.15) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
              
              {/* Logo */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0 rgba(60, 64, 72, 0.1)',
                    '0 0 30px rgba(60, 64, 72, 0.2)',
                    '0 0 0 rgba(60, 64, 72, 0.1)'
                  ]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative w-32 h-32 flex items-center justify-center"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  boxShadow: '0 8px 32px rgba(60, 64, 72, 0.08), 0 2px 8px rgba(60, 64, 72, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
              >
                <img
                  src="/logo/logo.svg.svg"
                  alt="Архитектурный логотип"
                  className="w-20 h-20"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(60, 64, 72, 0.1))'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                delay: 0.5, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="mb-8 text-center"
            >
              <h1 
                className="text-lg font-inter font-light tracking-widest"
                style={{ 
                  color: '#3C4048',
                  letterSpacing: '0.15em',
                  lineHeight: '1.4'
                }}
              >
                АРХИТЕКТУРА, ВДОХНОВЛЕННАЯ ТЕХНОЛОГИЯМИ
              </h1>
            </motion.div>

            {/* Interactive Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isClickable ? 1 : 0.3 }}
              transition={{ 
                delay: 1, 
                duration: 0.6, 
                ease: "easeOut" 
              }}
              className="flex items-center space-x-3 cursor-pointer transition-all duration-300"
              style={{
                opacity: isClickable ? 1 : 0.3
              }}
            >
              {/* Pulsing Dot */}
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
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#A0A3A8',
                  boxShadow: '0 0 8px rgba(160, 163, 168, 0.3)'
                }}
              />
              
              {/* Hint Text */}
              <span 
                className="text-sm font-inter font-light"
                style={{ 
                  color: '#A0A3A8',
                  letterSpacing: '0.05em'
                }}
              >
                Нажмите для продолжения
              </span>
            </motion.div>

            {/* Subtle Progress Indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64 h-px overflow-hidden"
            >
              <div 
                className="h-full w-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #3C4048 50%, transparent 100%)',
                  opacity: 0.3
                }}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-1/3 h-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #3C4048 100%)',
                  opacity: 0.6
                }}
              />
            </motion.div>
          </div>

          {/* Background Ambient Light */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Light */}
            <motion.div
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(60, 64, 72, 0.05) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />
            
            {/* Bottom Light */}
            <motion.div
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(60, 64, 72, 0.03) 0%, transparent 70%)',
                filter: 'blur(30px)'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumLoader;
