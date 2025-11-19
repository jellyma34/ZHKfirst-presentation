import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
// import Footer from './components/Footer'; // Закомментировано по запросу
import Loader from './components/Loader';
import LogoIntro from './components/LogoIntro';
import Transition from './components/Transition';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import Facades from './pages/Facades';
import Landscaping from './pages/Landscaping';
import Layouts from './pages/Layouts';
import PlanningSolutions from './pages/PlanningSolutions';
import './styles/image-quality.css';

// Компонент для условного отображения Navbar
function AppRoutes() {
  const location = useLocation();
  
  return (
    <div className="App min-h-screen light-theme-bg">
      <CustomCursor />
      <ScrollToTop />
      {/* Показываем Navbar на всех страницах */}
      <Navbar />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <Transition>
                  <HomePage />
                </Transition>
              } 
            />
            <Route 
              path="/facades" 
              element={
                <Transition>
                  <Facades />
                </Transition>
              } 
            />
            <Route 
              path="/landscaping" 
              element={
                <Transition>
                  <Landscaping />
                </Transition>
              } 
            />
            <Route 
              path="/layouts" 
              element={
                <Transition>
                  <PlanningSolutions />
                </Transition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* <Footer /> */} {/* Закомментировано по запросу */}
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Имитация загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Показываем LogoIntro как обязательный первый экран
  if (showIntro) {
    return (
      <>
        <CustomCursor />
        <LogoIntro onComplete={handleIntroComplete} />
      </>
    );
  }

  // Показываем обычный Loader только если нужно
  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
