import React, { useEffect, useRef, useState } from 'react';
import '../styles/pedestrian-routes.css';

const PedestrianLayer = ({ planId = 'default' }) => {
  const svgRef = useRef(null);
  const animationFrameRef = useRef(null);
  const walkersRef = useRef([]);
  const [customRoutes, setCustomRoutes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Функция для построения пути к файлу маршрутов в папке плана
  const getRoutesPathForPlan = (planId) => {
    // Маппинг ID этажа → путь к папке плана
    const planFolderMap = {
      'underground-ground': '/plans/floor-2-new',
      'general-floor-1': '/plans/floor 1',
      'section1-floor-2': '/plans/section-1-floor-2',
      'section1-floor-3-10': '/plans/section-1-floor-3',
      'section1-floor-11-14': '/plans/section-1-floor-11',
      'section2-floor-2': '/plans/section-2-floor-3',
      'section2-floor-3-10': '/plans/section-2-floor-3',
      'section2-floor-11-14': '/plans/section-2-floor-3',
      'genplan': '/plans/genplan' // ✅ Исправлено: добавлен /plans/
    };

    const folder = planFolderMap[planId];
    if (folder) {
      // Формат: /plans/section-X-floor-Y/routes-sectionX-floor-Y.json
      return `${folder}/routes-${planId}.json`;
    }
    
    // Fallback на старый путь
    return `/routes/${planId}.json`;
  };

  // Попытка загрузить файлы с нумерацией для genplan
  const tryLoadGenplanVariants = async () => {
    // Для genplan пробуем файлы с нумерацией (в порядке приоритета)
    const variants = [
      '/plans/genplan/routes-genplan (2).json', // ✅ Основной файл (приоритет 1)
      '/plans/genplan/routes-genplan.json',
      '/plans/genplan/routes-genplan (3).json',
      '/genplan/routes-genplan.json', // Fallback на старый путь
      '/genplan/routes-genplan (2).json',
      '/routes/genplan.json' // Последний fallback
    ];

    // Cache busting для предотвращения кэширования
    const cacheBuster = `?_=${Date.now()}`;

    for (const path of variants) {
      try {
        const response = await fetch(path + cacheBuster);
        if (response.ok) {
          const routes = await response.json();
          // Проверяем, что это массив
          if (Array.isArray(routes) && routes.length > 0) {
            console.log(`✅ Загружены маршруты для genplan из: ${path} (${routes.length} шт.)`);
            return routes;
          }
        }
      } catch (error) {
        // Продолжаем пробовать следующий вариант
      }
    }
    
    return null;
  };

  // Загрузка кастомных маршрутов
  useEffect(() => {
    const loadRoutes = async () => {
      setIsLoading(true);
      setNotFound(false);
      
      // ВАЖНО: Очистка старых маршрутов перед загрузкой новых
      setCustomRoutes(null);
      
      try {
        // Проверяем localStorage (приоритет для отредактированных маршрутов)
        const localData = localStorage.getItem(`routes-${planId}`);
        if (localData) {
          const routes = JSON.parse(localData);
          // Проверяем, что это массив
          if (Array.isArray(routes) && routes.length > 0) {
            setCustomRoutes(routes);
            setIsLoading(false);
            setNotFound(false);
            console.log(`✅ Загружены маршруты из localStorage для ${planId}: ${routes.length} шт.`);
            return;
          }
        }

        // Для genplan пробуем варианты с нумерацией
        if (planId === 'genplan') {
          const routes = await tryLoadGenplanVariants();
          if (routes && Array.isArray(routes) && routes.length > 0) {
            setCustomRoutes(routes);
            setIsLoading(false);
            setNotFound(false);
            console.log(`✅ Загружены маршруты для genplan: ${routes.length} шт.`);
            return;
          }
        }

        // Пытаемся загрузить из папки плана
        const planPath = getRoutesPathForPlan(planId);
        console.log(`🔍 Попытка загрузки маршрутов: ${planPath}`);
        
        // Добавляем cache busting для предотвращения кэширования
        const cacheBuster = `?_=${Date.now()}`;
        let response = await fetch(planPath + cacheBuster);
        
        // Если не найдено в папке плана, пробуем старый путь
        if (!response.ok) {
          console.log(`⚠️ Не найдено в ${planPath}, пробуем /routes/`);
          response = await fetch(`/routes/${planId}.json${cacheBuster}`);
        }
        
        if (response.ok) {
          const routes = await response.json();
          // Убеждаемся, что это массив и он не пустой
          if (Array.isArray(routes) && routes.length > 0) {
            setCustomRoutes(routes);
            setNotFound(false);
            console.log(`✅ Загружены маршруты из файла для ${planId}: ${routes.length} шт.`);
            console.log(`📊 Все маршруты:`, routes.map(r => r.id).join(', '));
          } else {
            setNotFound(true);
            console.log(`⚠️ Файл маршрутов пуст или неверный формат для ${planId}`);
          }
        } else {
          setNotFound(true);
          console.log(`⚠️ Файл маршрутов не найден для ${planId}`);
        }
      } catch (error) {
        setNotFound(true);
        console.log(`⚠️ Ошибка загрузки маршрутов для ${planId}:`, error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutes();
    
    // Cleanup при размонтировании или смене planId
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      walkersRef.current = [];
      // Очищаем маршруты при размонтировании
      setCustomRoutes(null);
    };
  }, [planId]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const peopleLayer = svg.querySelector('#people');
    if (!peopleLayer) return;

    // Очистка перед новой анимацией
    peopleLayer.innerHTML = '';
    walkersRef.current = [];
    
    // Ждём микротик для рендера маршрутов
    const timeoutId = setTimeout(() => {
      const routes = Array.from(svg.querySelectorAll('path.route'));
      
      if (routes.length === 0) {
        console.log('⚠️ Маршруты отсутствуют для анимации');
        return;
      }
      
      console.log(`🎯 Найдено ${routes.length} маршрутов для анимации пешеходов`);

      // Конфигурация
      const CONFIG = {
        count: 12,
        speedK: 1.0,
        personRadius: 5,
        jitter: 3,
        minSpeed: 40,
        maxSpeed: 80,
        spawnDelayMax: 2000,
      };

      // Утилиты
      function rand(a, b) {
        return a + Math.random() * (b - a);
      }

      function choice(arr) {
        return arr[(Math.random() * arr.length) | 0];
      }

      // Создание пешехода
      function createPerson({ pathEl, color, reverse = false }) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('person');
        g.dataset.path = `#${pathEl.id}`;

        // Тело пешехода
        const body = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        body.setAttribute('r', CONFIG.personRadius);
        body.setAttribute('class', 'body');
        if (color) body.style.fill = color;

        g.appendChild(body);
        peopleLayer.appendChild(g);

        return makeWalker(g, pathEl, { reverse });
      }

      // Логика движения по пути
      function makeWalker(node, pathEl, { reverse = false } = {}) {
        const total = pathEl.getTotalLength();
        const speed = rand(CONFIG.minSpeed, CONFIG.maxSpeed);
        const jitter = (Math.random() - 0.5) * CONFIG.jitter;
        let t = reverse ? total : 0;
        let dir = reverse ? -1 : 1;

        function step(dt) {
          const v = speed * CONFIG.speedK;
          const ds = v * dt;
          t += ds * dir;

          // Разворот или зацикливание
          if (t > total || t < 0) {
            if (Math.random() < 0.6) {
              dir *= -1; // Разворачиваемся
            } else {
              t = dir > 0 ? 0 : total; // Начинаем сначала
            }
          }

          // Получаем позицию на пути
          const p = pathEl.getPointAtLength(Math.max(0, Math.min(total, t)));
          node.setAttribute('transform', `translate(${p.x} ${p.y}) translate(${jitter} 0)`);
        }

        return { step, node, pathEl };
      }

      // Инициализация пешеходов
      function resetPeople(count = CONFIG.count) {
        walkersRef.current.splice(0, walkersRef.current.length);
        peopleLayer.innerHTML = '';

        for (let i = 0; i < count; i++) {
          const pathEl = choice(routes);
          const reverse = Math.random() < 0.5;
          const color = `hsl(${Math.round(rand(0, 360))} 80% 55%)`;
          const w = createPerson({ pathEl, color, reverse });
          
          // Задержка появления
          const delay = Math.random() * CONFIG.spawnDelayMax;
          setTimeout(() => walkersRef.current.push(w), delay);
        }
      }

      // Главный цикл анимации
      let lastTime = performance.now();

      function loop(now) {
        const dt = Math.min(0.05, (now - lastTime) / 1000);
        walkersRef.current.forEach((w) => w.step(dt));
        lastTime = now;
        animationFrameRef.current = requestAnimationFrame(loop);
      }

      // Запуск
      resetPeople(CONFIG.count);
      requestAnimationFrame(loop);
    }, 10); // Небольшая задержка для рендера DOM

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (peopleLayer) {
        peopleLayer.innerHTML = '';
      }
      walkersRef.current = [];
    };
  }, [customRoutes]);

  // Конвертация точек в SVG path
  const pointsToPath = (points) => {
    if (!points || points.length < 2) return '';
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  return (
    <div 
      className="pedestrian-overlay"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 130,
        pointerEvents: 'none'
      }}
    >
      {/* Уведомление при загрузке */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(95, 117, 141, 0.95)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 200,
            pointerEvents: 'auto',
            backdropFilter: 'blur(8px)'
          }}
        >
          🔄 Загрузка маршрутов...
        </div>
      )}

      {/* Уведомление при отсутствии маршрутов */}
      {!isLoading && notFound && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 193, 7, 0.95)',
            color: '#2C3E50',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 200,
            pointerEvents: 'auto',
            backdropFilter: 'blur(8px)',
            textAlign: 'center',
            maxWidth: '320px'
          }}
        >
          ⚠️ Маршруты для этого плана отсутствуют
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 1200 675"
        preserveAspectRatio="xMidYMid meet"
        id="pedestrianStage"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {/* Маршруты с белой подложкой */}
        <g id="routes">
          {customRoutes && customRoutes.length > 0 ? (
            // Кастомные маршруты из редактора
            customRoutes.map((route) => (
              <g key={route.id}>
                {/* Белая подложка для контраста */}
                <path
                  className="route-outline"
                  d={pointsToPath(route.points)}
                />
                {/* Основная жёлтая линия */}
                <path
                  id={route.id}
                  className="route"
                  d={pointsToPath(route.points)}
                />
              </g>
            ))
          ) : (
            // Дефолтные маршруты с белой подложкой
            <>
              <g id="route-a-group">
                <path className="route-outline" d="M 120 170 C 250 170 360 170 510 170 C 660 170 900 170 1060 170" />
                <path id="route-a" className="route" d="M 120 170 C 250 170 360 170 510 170 C 660 170 900 170 1060 170" />
              </g>
              <g id="route-b-group">
                <path className="route-outline" d="M 90 600 C 240 520 380 450 520 430 C 720 400 880 430 1080 360" />
                <path id="route-b" className="route" d="M 90 600 C 240 520 380 450 520 430 C 720 400 880 430 1080 360" />
              </g>
              <g id="route-c-group">
                <path className="route-outline" d="M 170 350 C 300 350 320 510 520 520 C 700 530 880 520 990 520" />
                <path id="route-c" className="route" d="M 170 350 C 300 350 320 510 520 520 C 700 530 880 520 990 520" />
              </g>
              <g id="route-d-group">
                <path className="route-outline" d="M 100 450 C 250 420 400 400 550 380 C 700 360 850 340 1000 320" />
                <path id="route-d" className="route" d="M 100 450 C 250 420 400 400 550 380 C 700 360 850 340 1000 320" />
              </g>
              <g id="route-e-group">
                <path className="route-outline" d="M 200 250 C 350 280 500 300 650 290 C 800 280 950 260 1100 240" />
                <path id="route-e" className="route" d="M 200 250 C 350 280 500 300 650 290 C 800 280 950 260 1100 240" />
              </g>
            </>
          )}
        </g>

        {/* Контейнер для пешеходов */}
        <g id="people"></g>
      </svg>
    </div>
  );
};

export default PedestrianLayer;
