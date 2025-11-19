import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    const moveCursor = (e) => {
      cursor.style.left = e.clientX - 9 + "px"; // Center the cursor (18px / 2)
      cursor.style.top = e.clientY - 9 + "px";
    };

    const handleMouseOver = (e) => {
      const interactiveElements = [
        'a', 'button', 'input', 'textarea', 'select',
        '[role="button"]', '[data-cursor-hover]',
        '.cursor-hover', '[data-interactive]'
      ];
      
      const isInteractive = interactiveElements.some(selector => {
        try {
          return e.target.matches(selector) || e.target.closest(selector);
        } catch {
          return false;
        }
      });
      
      if (isInteractive) {
        cursor.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e) => {
      const interactiveElements = [
        'a', 'button', 'input', 'textarea', 'select',
        '[role="button"]', '[data-cursor-hover]',
        '.cursor-hover', '[data-interactive]'
      ];
      
      const isInteractive = interactiveElements.some(selector => {
        try {
          return e.target.matches(selector) || e.target.closest(selector);
        } catch {
          return false;
        }
      });
      
      if (isInteractive) {
        cursor.classList.remove("cursor-hover");
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, []);

  return (
    <div 
      id="custom-cursor"
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        background: '#f5f5f5',
        boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.15), -3px -3px 8px rgba(255, 255, 255, 0.6)',
        position: 'fixed',
        pointerEvents: 'none',
        transition: 'all 0.25s ease',
        mixBlendMode: 'difference',
        zIndex: 9999,
        left: '-100px',
        top: '-100px'
      }}
    />
  );
};

export default CustomCursor;