import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import '../styles/facades.css';

export default function FacadePage() {
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  const videos = [
    { src: "/video/1.mp4", speed: 0.5 },
    { src: "/video/2.mp4", speed: 0.5 },
    { src: "/video/3.mp4", speed: 0.5 }
  ];

  // Intersection Observer для остановки видео при выходе из видимой области
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Останавливаем все видео при выходе из видимой области
          videoRefs.forEach(ref => {
            if (ref.current) {
              ref.current.pause();
            }
          });
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Инициализация видео при монтировании
  useEffect(() => {
    videoRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.playbackRate = 0.5; // Скорость воспроизведения 0.5x
        ref.current.volume = 0; // Убираем звук для оптимизации
        ref.current.preload = "auto"; // Предзагружаем все видео
        console.log(`⚙️ Инициализировано видео ${i + 1}: скорость 0.5x`);
      }
    });
  }, []);

  // Обработчик завершения видео
  const handleVideoEnd = () => {
    console.log(`✅ Видео ${currentIndex + 1} завершено`);
    if (!isPaused) {
      const nextIndex = (currentIndex + 1) % videos.length;
      setCurrentIndex(nextIndex);
    }
  };

  // Управление текущим видео (только при смене видео, не при паузе)
  useEffect(() => {
    const video = videoRefs[currentIndex].current;
    if (video && isVisible) {
      console.log(`▶️ Переключение на видео ${currentIndex + 1}`);
      
      // Устанавливаем скорость воспроизведения 0.5x
      video.playbackRate = 0.5;
      
      // Сбрасываем время только при смене видео, не при паузе
      video.currentTime = 0;
      
      if (!isPaused) {
        video.play().catch(err => console.warn("Ошибка запуска видео:", err));
      }
    }
  }, [currentIndex, isVisible]); // Убираем isPaused из зависимостей

  // Управление паузой/воспроизведением (отдельно от смены видео)
  useEffect(() => {
    const video = videoRefs[currentIndex].current;
    if (video && isVisible) {
      // Гарантируем скорость 0.5x при паузе/воспроизведении
      video.playbackRate = 0.5;
      
      if (isPaused) {
        video.pause();
      } else {
        video.play().catch(err => console.warn("Ошибка запуска видео:", err));
      }
    }
  }, [isPaused]); // Убираем currentIndex и isVisible из зависимостей

  // Ручная смена видео
  const nextVideo = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
    setIsPaused(false); // Сбрасываем состояние паузы при смене видео
  };
  
  const prevVideo = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentIndex(prevIndex);
    setIsPaused(false); // Сбрасываем состояние паузы при смене видео
  };

  // Обработчик паузы/воспроизведения
  const handlePauseToggle = () => {
    const activeVideo = videoRefs[currentIndex].current;
    if (!activeVideo) return;

    // Гарантируем скорость воспроизведения 0.5x
    activeVideo.playbackRate = 0.5;

    if (activeVideo.paused) {
      activeVideo.play().catch(err => console.warn("Ошибка запуска видео:", err));
      setIsPaused(false);
    } else {
      activeVideo.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className="font-[Inter] text-[#1b1b1b] bg-gradient-to-br from-[#f8f9fb] to-[#e2e3e7] overflow-x-hidden">
      {/* ====== VIDEO SLIDESHOW HEADER ====== */}
      <header ref={containerRef} className="relative h-screen overflow-hidden rounded-b-[120px] shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
        {/* ==== BACKGROUND VIDEO SLIDESHOW ==== */}
        <div className="facades-container">
          {videoRefs.map((ref, index) => (
            <video
              key={index}
              ref={ref}
              src={videos[index].src}
              muted
              loop={false}
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
              className={`facade-video ${index === currentIndex ? "active" : "hidden"}`}
              onLoadedData={() => {
                if (ref.current) {
                  ref.current.playbackRate = 0.5; // Устанавливаем скорость 0.5x при загрузке
                }
                console.log(`✅ Видео ${index + 1} загружено`);
              }}
              onError={(e) => {
                console.error(`❌ Ошибка загрузки видео ${index + 1}`);
              }}
            />
          ))}
        </div>


        {/* ==== CONTROLS ==== */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/15 px-6 py-3 rounded-full z-20 shadow-lg">
          <button
            onClick={prevVideo}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
              <button
                onClick={handlePauseToggle}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
              >
                {isPaused ? (
                  <Play className="w-5 h-5 text-white" />
                ) : (
                  <Pause className="w-5 h-5 text-white" />
                )}
              </button>
          <button
            onClick={nextVideo}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* ====== PASSPORT SECTION ====== */}
      <section className="materials">
        <h2>Материалы отделки фасадов</h2>
        <div className="grid">
          {[
            {
              name: "RAL 7024 Графитовый серый",
              image: "/pasport/RAL 7024 Графитовый серый.jpg",
              usageExample: "/pasport/1.png",
              applications: [
                "Ворота",
                "Двери",
                "Отливы, откосы окон, витражей, кровельные фартуки",
                "Стыки секций",
                "Корзины для кондиционеров"
              ]
            },
            {
              name: "ВХ 0205 бронза",
              image: "/pasport/ВХ 0205 бронза.jpg",
              usageExample: "/pasport/2.png",
              applications: [
                "Стены — Композитные панели Bildex (покрытие FASAD Стандарт (PE)) или аналог",
                "Откосы окон, витражей"
              ]
            },
            {
              name: "Кладка Флеш",
              image: "/pasport/Кладка Флеш.jpg",
              usageExample: "/pasport/3.png",
              applications: [
                "Стены — Кирпич облицовочный силикатный «Саянский газобетон» или аналог",
                "Откосы окон, витражей"
              ]
            }
          ].map((material, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="material-card"
            >
              <div className="material-content">
                <img
                  src={material.image}
                  alt={material.name}
                  className="material-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-[200px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-sm rounded-[25px] mb-6"
                  style={{ display: 'none' }}
                >
                  Изображение не найдено
                </div>
                <h3>{material.name}</h3>
                <ul>
                  {material.applications.map((app, appIdx) => (
                    <li key={appIdx}>{app}</li>
                  ))}
                </ul>
              </div>
              <div className="usage-example">
                <img 
                  src={material.usageExample} 
                  alt={`Пример использования ${material.name}`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-[150px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-sm rounded-[25px]"
                  style={{ display: 'none' }}
                >
                  Пример не найден
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
