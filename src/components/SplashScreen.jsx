import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(false);
    if (onFinish) setTimeout(onFinish, 1000); // плавный переход к сайту
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-white text-[#111] z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onClick={handleClick}
        >
          {/* ЛОГОТИП */}
          <motion.img
            src="/logo/logo.svg.svg"
            alt="Логотип"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-24 h-24 mb-10"
          />

          {/* ТЕКСТ */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm tracking-[0.25em] uppercase text-[#222] font-light text-center"
          >
            АРХИТЕКТУРА, ВДОХНОВЛЕННАЯ ТЕХНОЛОГИЯМИ
          </motion.h1>

          {/* ПОДСКАЗКА */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 flex items-center gap-2 text-[#666]"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#aaa]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            ></motion.span>
            <p className="text-xs opacity-70">Нажмите для продолжения</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
