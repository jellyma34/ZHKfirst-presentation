import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building, TreePine, Layout } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/facades', label: 'Фасадные решения', icon: Building },
    { path: '/layouts', label: 'Планировочные решения', icon: Layout },
    { path: '/landscaping', label: 'Благоустройство', icon: TreePine },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="navbar">
          <div className="navbar-left">
            <img 
              src="/logo/logo.svg.svg" 
              alt="Логотип" 
              className="navbar-logo"
              onLoad={() => console.log('✅ Логотип navbar загружен')}
              onError={(e) => {
                console.error('❌ Ошибка загрузки логотипа navbar: /logo/logo.svg.svg');
                e.target.style.display = 'none';
              }}
            />
            <span className="navbar-title">ЖК «Первый». 3 очередь строительства</span>
          </div>
          <nav className="nav-links hidden lg:flex">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive(item.path) ? 'active' : ''}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Мобильное меню кнопка */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-lg transition-all duration-300"
            style={{
              background: 'rgba(247, 248, 250, 0.8)',
              border: '1px solid rgba(214, 216, 219, 0.3)',
              boxShadow: 'inset 2px 2px 5px rgba(214, 216, 219, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.8)',
            }}
          >
            {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </motion.button>
        </div>
      </header>

      {/* Мобильное меню */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden fixed top-20 left-4 right-4 z-50"
      >
        <div 
          className="p-6 space-y-3"
          style={{
            background: 'rgba(247, 248, 250, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(214, 216, 219, 0.3)',
            boxShadow: '10px 10px 20px rgba(214, 216, 219, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.8)',
          }}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-gray-900 bg-white shadow-inner'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{
                    boxShadow: isActive(item.path) 
                      ? 'inset 2px 2px 5px rgba(214, 216, 219, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.8)'
                      : '3px 3px 8px rgba(214, 216, 219, 0.3), -3px -3px 8px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-inter font-medium text-sm">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;