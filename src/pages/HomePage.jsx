import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles/Home.css';

const HomePage = () => {
  // Данные для слайдера
  const slides = [
    {
      id: "informaciya-ob-obekte",
      title: "Информация об объекте капитального строительства",
      description: `<ul style="list-style: none; padding: 0; margin: 0; line-height: 1.3;">
<li style="margin-bottom: 4px;"><strong>Наименование объекта:</strong> Жилые дома в г. Братск, 3 очередь строительства</li>
<li style="margin-bottom: 4px;"><strong>Тип объекта:</strong> Жилой комплекс</li>
<li style="margin-bottom: 4px;"><strong>Местоположение:</strong> Иркутская обл., г. Братск</li>
<li style="margin-bottom: 4px;"><strong>Площадь застройки:</strong> 4 322 м²</li>
<li style="margin-bottom: 4px;"><strong>Плотность участка:</strong> 18 700 м² / 1 га</li>
</ul>`,
      image: "/images/Фасадные решения-1.png"
    },
    {
      id: "plan-mestopolozheniya",
      title: "Обзорный план местоположения",
      description: `Расположение в административном отношении:  
Кадастровый номер: 38:34:012001:748  
Вид разрешённого использования: Зона многоэтажной жилой застройки с объектами обслуживания жилой застройки во встроенно-пристроенных помещениях  
Категория земель: Земли поселений (земли населённых пунктов)  
Территориальная зона: Зона многоэтажной застройки (Ж-3)`,
      image: "/images/Фасадные решения-2.png"
    },
    {
      id: "inzhenerno-geologicheskie-usloviya",
      title: "Инженерно-геологические условия",
      description: `Грунты: суглинок твёрдый бурый с дресвой и щебнем алевролита до 10–30%.  
Глубина промерзания грунта: 3.10 м  
Сейсмичность: по картам ОСР-2015 составляет 6 баллов  
Прогноз: Сейсмическая опасность в течение 50 лет составит 6 баллов`,
      image: "/images/Фасадные решения-3.png"
    },
    {
      id: "klimaticheskie-usloviya",
      title: "Климатические условия",
      description: `Климатический район: 1B  
Средняя температура: –8.4°C  
Нормативный вес снегового покрова для III снегового района — 1,5 кПа;  
Нормативная ветровая нагрузка для II ветрового района — 0,3 кПа;`,
      image: "/images/Фасадные решения-4.png"
    },
    {
      id: "tehno-ekonom",
      title: "Технико-экономические показатели",
      description: `
<div style="overflow-x: auto;">
  <table style="width:100%; border-collapse: collapse; color: white; font-size: 0.8rem;">
    <thead>
      <tr style="background: rgba(255,255,255,0.1);">
        <th style="border:1px solid rgba(255,255,255,0.3); padding:8px; text-align: left; font-weight: 600;">Наименование показателей</th>
        <th style="border:1px solid rgba(255,255,255,0.3); padding:8px; text-align: left; font-weight: 600;">Секция 1</th>
        <th style="border:1px solid rgba(255,255,255,0.3); padding:8px; text-align: left; font-weight: 600;">Секция 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Этажность</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">14</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">15</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Количество этажей</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">15</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">15</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Общее количество квартир, в т.ч.:</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">156</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">156</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px; padding-left: 24px;">— однокомнатных</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">143</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">143</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px; padding-left: 24px;">— двухкомнатных</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">13</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">13</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Кладовые, м²</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">94.50</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">19.50</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Офисы, м²</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">803.20</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">1 550.40</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Квартиры (2–14 эт.), м²</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">6 929.3</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">6 942.98</td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Количество машино-мест</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;" colspan="2">86</td>
      </tr>
      <tr style="background: rgba(255,255,255,0.15); font-weight: 600;">
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Продаваемая площадь — концепт-продукт:</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;" colspan="2"></td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px; padding-left: 24px;">— Жилая — <span>13 872,3</span> м²</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;" colspan="2"></td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px; padding-left: 24px;">— Коммерция — <span>2 354</span> м²</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;" colspan="2"></td>
      </tr>
      <tr style="background: rgba(255,255,255,0.15); font-weight: 600;">
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;">Продаваемая площадь — посадка эскиз (до повышения этажности и балконов):</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;" colspan="2"></td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px; padding-left: 24px;">— Жилая — <span>10 919</span> м²</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;" colspan="2"></td>
      </tr>
      <tr>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px; padding-left: 24px;">— Коммерция — <span>2 108</span> м²</td>
        <td style="border:1px solid rgba(255,255,255,0.3); padding:6px;" colspan="2"></td>
      </tr>
    </tbody>
  </table>
</div>`,
      image: "/images/Фасадные решения-5.png"
    }
  ];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const fallbackImage = "/images/placeholder.svg";

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      const rect = target.getBoundingClientRect();
      const targetCenter = rect.top + window.scrollY + rect.height / 2;
      const offset = targetCenter - window.innerHeight / 2;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Параллакс для слайдера
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sliderY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const sliderScale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const sliderOpacity = useTransform(smoothProgress, [0, 0.5, 0.8], [1, 0.8, 0]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 5000); // 5 секунд на каждый слайд
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const slideshow = document.getElementById("slideshow");
        if (slideshow) {
          slideshow.scrollIntoView({ behavior: "smooth", block: "start" });

          setTimeout(() => {
            window.scrollTo({
              top: slideshow.offsetTop - 50,
              behavior: "smooth",
            });
          }, 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="home-page" ref={containerRef} style={{ minHeight: '300vh' }}>
      {/* Main Content с параллаксом */}
      <motion.div 
        className="home-content"
        style={{ 
          position: 'sticky',
          top: 0,
          y: sliderY,
          scale: sliderScale,
          opacity: sliderOpacity
        }}
      >
        <h1 className="page-title">3 очередь строительства</h1>
        <p className="page-description">
          Многоквартирный жилой дом со встроенно-пристроенными нежилыми помещениями
          и встроенно-пристроенной подземной стоянкой автомобилей
        </p>

        {/* Слайдер */}
        <div className="slider" id="slideshow">
          <button className="arrow left" onClick={prevSlide}>❮</button>

          <div className="slide-track">
            {slides.map((slide, i) => {
              const offset = (i - index + slides.length) % slides.length;
              let positionClass = "";
              if (offset === 0) positionClass = "center";
              else if (offset === 1 || (index === slides.length - 1 && i === 0))
                positionClass = "right";
              else if (offset === slides.length - 1 || (i === slides.length - 1 && index === 0))
                positionClass = "left";
              else positionClass = "hidden";

              const isFocusable = positionClass === "center";

              return (
                <div
                  key={i}
                  className={`slide ${positionClass}`}
                  onClick={() => handleScrollTo(slide.id)}
                  role="button"
                  tabIndex={isFocusable ? 0 : -1}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleScrollTo(slide.id);
                    }
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    onError={(event) => {
                      if (event.currentTarget.src !== fallbackImage) {
                        event.currentTarget.src = fallbackImage;
                      }
                    }}
                    loading="lazy"
                  />
                  <div className="slide-info">
                    <h2>{slide.title}</h2>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="arrow right" onClick={nextSlide}>❯</button>
        </div>

        {/* Кнопка управления */}
        <button className="play-toggle" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "⏸ Остановить" : "▶ Воспроизвести"}
        </button>
      </motion.div>

      {/* Секция с вертикальными колонками */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}>
        {slides.map((slide, idx) => (
          <motion.div
            key={idx}
            className="column-section-card"
            id={slide.id}
            initial={{ 
              opacity: 0, 
              y: 120,
              scale: 0.85
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ 
              duration: 1.2,
              delay: idx * 0.1,
              ease: [0.34, 1.56, 0.64, 1], // Эффект "пружины" для масштаба
              scale: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 0.8
              }
            }}
            style={{
              display: 'flex',
              flexDirection: window.innerWidth < 1024 ? 'column' : (idx % 2 === 0 ? 'row' : 'row-reverse'),
              gap: '3rem',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto 6rem',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div 
              className="column-section-image"
              style={{ 
                flex: window.innerWidth < 1024 ? '0 0 100%' : (idx === 4 ? '0 0 55%' : '0 0 45%'), // Адаптивность для мобильных
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: idx === 4 ? '0 12px 30px rgba(0, 0, 0, 0.2)' : '0 8px 20px rgba(0, 0, 0, 0.15)',
                maxWidth: window.innerWidth < 1024 ? '100%' : (idx === 4 ? 'none' : 'none'),
                minHeight: window.innerWidth < 1024 ? 'auto' : (idx === 4 ? '360px' : 'auto')
              }}
              initial={{ 
                scale: 0.9,
                opacity: 0.8
              }}
              whileInView={{ 
                scale: 1,
                opacity: 1
              }}
              viewport={{ once: false }}
              transition={{ 
                duration: 1,
                delay: idx * 0.1 + 0.15,
                ease: [0.34, 1.56, 0.64, 1],
                scale: {
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  mass: 0.9
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { 
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                style={{
                  width: '100%',
                  height: idx === 4 ? '360px' : 'auto', // Фиксированная высота для ТЭП
                  display: 'block',
                  objectFit: idx === 4 ? 'cover' : 'contain', // Обрезка для ТЭП
                  borderRadius: '16px'
                }}
              />
            </motion.div>
            <div className="column-section-text" style={{ flex: 1 }}>
              <motion.h2 
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  marginTop: '2.5rem',
                  marginBottom: '1rem',
                  fontFamily: 'Manrope, sans-serif'
                }}
                initial={{ 
                  x: 50, 
                  opacity: 0,
                  scale: 0.95
                }}
                whileInView={{ 
                  x: 0, 
                  opacity: 1,
                  scale: 1
                }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1 + 0.25,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {slide.title}
              </motion.h2>
              <motion.div 
                style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.7',
                  color: '#555',
                  whiteSpace: 'pre-line'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: slide.description.replace(
                    /<table/g, 
                    '<table class="column-section-table"'
                  ) 
                }}
                initial={{ 
                  x: 50, 
                  opacity: 0,
                  scale: 0.96
                }}
                whileInView={{ 
                  x: 0, 
                  opacity: 1,
                  scale: 1
                }}
                viewport={{ once: false }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1 + 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
