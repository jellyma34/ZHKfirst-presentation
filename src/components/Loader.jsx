import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie-player';
import logoAnimation from '../assets/logo.json';

const Loader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      setTimeout(() => {
        setIsLoading(false);
        onComplete();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-premium-bg to-premium-bg-dark"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: animationComplete ? [1, 0.8, 1.2, 0] : [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.5, delay: animationComplete ? 0 : 1 }
              }}
              className="mb-8"
            >
              <Lottie
                loop={false}
                play={!animationComplete}
                animationData={logoAnimation}
                style={{ width: 120, height: 120 }}
              />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl font-manrope font-bold premium-gradient-text tracking-tight"
            >
              Архитектурные Решения
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: animationComplete ? "100%" : "60%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="mt-8 h-2 premium-gradient-bg rounded-full"
            />
            
            {animationComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-lg text-premium-text-light font-inter"
              >
                Загрузка завершена
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
