/**
 * Утилита для проверки и логирования загрузки изображений
 */

/**
 * Проверяет доступность изображения
 * @param {string} url - URL изображения
 * @returns {Promise<boolean>} - true если изображение загрузилось успешно
 */
export const checkImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`✅ Loaded: ${url}`);
      resolve(true);
    };
    
    img.onerror = () => {
      console.warn(`❌ Failed to load: ${url}`);
      resolve(false);
    };
    
    img.src = url;
  });
};

/**
 * Проверяет массив изображений
 * @param {string[]} imagesList - массив URL изображений
 * @returns {Promise<Object>} - объект с результатами проверки
 */
export const checkImages = async (imagesList) => {
  const results = {
    success: [],
    failed: [],
    total: imagesList.length
  };

  for (const src of imagesList) {
    const isLoaded = await checkImage(src);
    if (isLoaded) {
      results.success.push(src);
    } else {
      results.failed.push(src);
    }
  }

  console.log(`\n📊 Image Loading Report:`);
  console.log(`✅ Loaded: ${results.success.length}/${results.total}`);
  console.log(`❌ Failed: ${results.failed.length}/${results.total}`);
  
  if (results.failed.length > 0) {
    console.warn('\n⚠️ Failed images:', results.failed);
  }

  return results;
};

/**
 * Компонент обертка для изображения с обработкой ошибок
 */
export const SafeImage = ({ src, alt, onError, className, ...props }) => {
  const handleError = (e) => {
    console.warn(`❌ Image failed to load: ${src}`);
    if (onError) {
      onError(e);
    }
    // Устанавливаем placeholder
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
  };

  const handleLoad = () => {
    console.log(`✅ Image loaded: ${src}`);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

/**
 * Список всех изображений проекта для проверки
 */
export const PROJECT_IMAGES = {
  logos: [
    '/logo/logo.svg.svg'
  ],
  facades: Array.from({ length: 10 }, (_, i) => `/images/Фасадные решения-${i + 1}.png`),
  plans: {
    general: [
      '/plans/general/main.jpg',
      '/plans/general/one.png',
      '/plans/general/plan.png',
      '/plans/general/two.png'
    ],
    floor1: [
      '/plans/floor-1/main.jpg',
      '/plans/floor-1/one.png',
      '/plans/floor-1/plan.png',
      '/plans/floor-1/two.png'
    ],
    floor2New: [
      '/plans/floor-2-new/основное.jpg',
      '/plans/floor-2-new/1.png',
      '/plans/floor-2-new/2.png',
      '/plans/floor-2-new/3.png'
    ]
  },
  videos: [
    '/video/1.mp4',
    '/video/2.mp4',
    '/video/3.mp4'
  ]
};

/**
 * Запускает полную проверку всех изображений проекта
 */
export const checkAllProjectImages = async () => {
  const allImages = [
    ...PROJECT_IMAGES.logos,
    ...PROJECT_IMAGES.facades,
    ...PROJECT_IMAGES.plans.general,
    ...PROJECT_IMAGES.plans.floor1,
    ...PROJECT_IMAGES.plans.floor2New
  ];

  return await checkImages(allImages);
};

