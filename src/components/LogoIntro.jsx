import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoIntro = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('drawing');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationPhase === 'drawing') {
      const timer = setTimeout(() => {
        setAnimationPhase('filling');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  useEffect(() => {
    if (animationPhase === 'filling') {
      const timer = setTimeout(() => {
        setAnimationPhase('text');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  useEffect(() => {
    if (animationPhase === 'text') {
      const timer = setTimeout(() => {
        setAnimationPhase('complete');
        setIsClickable(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  // Check logo loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Logo preloaded successfully');
    };
    img.onerror = () => {
      console.error('Logo image not found at /logo/logo.svg.svg');
    };
    img.src = '/logo/logo.svg.svg';
  }, []);

  const handleLogoClick = () => {
    if (isClickable) {
      setAnimationPhase('exiting');
      setTimeout(() => {
        onComplete?.();
      }, 600);
    }
  };

  return (
    <AnimatePresence>
      {animationPhase !== 'exiting' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 h-screen flex justify-center items-center bg-[#f9f9f9] cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-12"
            >
              {/* Logo */}
              <div className="flex justify-center items-center w-full h-full">
                <motion.img
                  src="/logo/logo.svg.svg"
                  alt="Архитектурный логотип"
                  className="w-[120px] h-auto relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: animationPhase === 'initial' ? 0 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    console.error('Logo image not found at /logo/logo.svg.svg');
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Logo loaded successfully');
                  }}
                />
              </div>
              
              {/* Inner glow effect - light from center */}
              <motion.div
                className="absolute inset-0 w-32 h-32 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: animationPhase === 'initial' ? 0 : 0.6,
                  scale: animationPhase === 'initial' ? 0.5 : 1.2,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.08) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />


            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: animationPhase === 'text' || animationPhase === 'complete' ? 1 : 0,
                y: animationPhase === 'text' || animationPhase === 'complete' ? 0 : 20
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-lg font-light tracking-[0.2em] uppercase text-[#333] mb-4">
                АРХИТЕКТУРА, ВДОХНОВЛЕННАЯ ТЕХНОЛОГИЯМИ
              </h1>
              
              {isClickable && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-sm text-[#666] font-light"
                >
                  Нажмите для продолжения
                </motion.p>
              )}
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoIntro;
