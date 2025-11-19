import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ArchitecturalCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  
  const cursorRef = useRef(null);
  
  // Smooth mouse tracking with inertia
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { 
    damping: 30, 
    stiffness: 200,
    mass: 0.3
  };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 7); // Center the cursor (14px / 2)
      mouseY.set(e.clientY - 7);
      setCursorVisible(true);
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
      
      if (isInteractive && !isHovering) {
        setIsHovering(true);
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
      
      if (isInteractive && isHovering) {
        setTimeout(() => {
          const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
          if (!elementBelow) return;
          
          const stillInteractive = interactiveElements.some(selector => {
            try {
              return elementBelow.matches(selector) || elementBelow.closest(selector);
            } catch {
              return false;
            }
          });
          
          if (!stillInteractive) {
            setIsHovering(false);
          }
        }, 50);
      }
    };

    const handleMouseDown = (e) => {
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
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 120);
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('mousedown', handleMouseDown);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [mouseX, mouseY, isHovering]);

  if (!cursorVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {/* Main cursor circle */}
      <motion.div
        className="relative w-3.5 h-3.5 rounded-full"
        animate={{
          width: isClicking ? 10 : isHovering ? 28 : 14,
          height: isClicking ? 10 : isHovering ? 28 : 14,
          x: isClicking ? 2 : isHovering ? -7 : 0,
          y: isClicking ? 2 : isHovering ? -7 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.4,
          duration: isClicking ? 0.12 : 0.3
        }}
        style={{
          backgroundColor: '#0D0D0D',
          boxShadow: isHovering 
            ? '0 0 0 3px rgba(255, 255, 255, 0.15)' 
            : 'none',
          filter: 'blur(0.5px)',
        }}
      >
        {/* Inner glow effect - black glow from center */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.25) 0%, transparent 70%)',
            filter: 'blur(1px)',
          }}
          animate={{
            opacity: isHovering ? 0.8 : 1,
            scale: isHovering ? 1.2 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />
        
        {/* Soft diffusion effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
            filter: 'blur(2px)',
          }}
          animate={{
            scale: isHovering ? 1.5 : 1.2,
            opacity: isHovering ? 0.6 : 0.4,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
        />
        
        {/* Hover white glow */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
              filter: 'blur(1px)',
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
          />
        )}
        
        {/* Click pulse effect */}
        {isClicking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 2]
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
              filter: 'blur(3px)',
            }}
            transition={{
              duration: 0.12,
              ease: "easeOut"
            }}
          />
        )}
      </motion.div>
      
      {/* Fade trail effect */}
      <motion.div
        className="absolute w-3.5 h-3.5 rounded-full pointer-events-none"
        style={{
          backgroundColor: '#0D0D0D',
          opacity: 0.2,
          filter: 'blur(1px)',
        }}
        animate={{
          x: cursorX,
          y: cursorY,
          opacity: [0.2, 0],
          scale: [1, 1.2]
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default ArchitecturalCursor;
