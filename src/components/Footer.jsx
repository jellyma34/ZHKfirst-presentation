import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Фасадные решения', href: '/facades' },
      { label: 'Благоустройство', href: '/landscaping' },
      { label: 'Планировки', href: '/layouts' },
      { label: 'Консультации', href: '/consultation' },
    ],
    company: [
      { label: 'О компании', href: '/about' },
      { label: 'Портфолио', href: '/portfolio' },
      { label: 'Команда', href: '/team' },
      { label: 'Контакты', href: '/contacts' },
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gradient-to-br from-premium-bg to-premium-bg-dark mt-32">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Компания */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-3xl font-manrope font-bold premium-gradient-text mb-6 tracking-tight">
              Архитектурные Решения
            </h3>
            <p className="text-premium-text-light font-inter leading-relaxed mb-8 text-lg">
              Создаем уникальные архитектурные проекты, сочетающие современные технологии 
              и эстетическое совершенство. Превращаем ваши мечты в реальность.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 premium-surface flex items-center justify-center hover:premium-surface-lg transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-premium-text-light hover:text-premium-accent transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Услуги */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-manrope font-semibold text-premium-text mb-6 tracking-tight">
              Услуги
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-premium-text-light hover:text-premium-accent font-inter transition-colors duration-300 text-lg"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Контакты */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-manrope font-semibold text-premium-text mb-6 tracking-tight">
              Контакты
            </h4>
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <Mail className="w-5 h-5 text-premium-accent" />
                <span className="text-premium-text-light font-inter text-lg">info@architect.com</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <Phone className="w-5 h-5 text-premium-accent" />
                <span className="text-premium-text-light font-inter text-lg">+7 (999) 123-45-67</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <MapPin className="w-5 h-5 text-premium-accent" />
                <span className="text-premium-text-light font-inter text-lg">Москва, ул. Архитекторов, 1</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Нижняя часть */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-premium-text-muted font-inter text-lg">
            © {currentYear} Архитектурные Решения. Все права защищены.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-premium-text-muted hover:text-premium-accent font-inter text-lg transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-premium-text-muted hover:text-premium-accent font-inter text-lg transition-colors">
              Условия использования
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
