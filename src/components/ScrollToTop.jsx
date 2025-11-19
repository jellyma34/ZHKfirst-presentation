import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Проверяем, находимся ли мы в разделе планировочных решений
    if (pathname.includes("/layouts")) {
      // Плавная прокрутка к началу страницы
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
      });
      
      console.log("📜 Автоматическая прокрутка к началу страницы 'Планировочные решения'");
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
