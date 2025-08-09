import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function CustomCursor(): React.JSX.Element {
  const { isDarkMode } = useTheme();
  useEffect(() => {
    const outerCircle = document.querySelector('.cursor') as HTMLElement;
    const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;

    if (!outerCircle || !cursorDot) return;

    outerCircle.dataset.scale = 'scale(1)';
    outerCircle.style.transition = 'transform 0.1s ease-out';

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    document.addEventListener('mousemove', handleMouseMove);

    let prevOuterTransform = '';
    let prevInnerTransform = '';

    const animate = () => {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;

        dotX += (mouseX - dotX);
        dotY += (mouseY - dotY);

        const outerTransform = `translate(${cursorX - 10}px, ${cursorY - 10}px) ${outerCircle.dataset.scale || 'scale(1)'}`;
        const innerTransform = `translate(${dotX - 2}px, ${dotY - 2}px)`;

        if (outerTransform !== prevOuterTransform) {
            outerCircle.style.transform = outerTransform;
            prevOuterTransform = outerTransform;
        }

        if (innerTransform !== prevInnerTransform) {
            cursorDot.style.transform = innerTransform;
            prevInnerTransform = innerTransform;
        }

        requestAnimationFrame(animate);
    };

    animate();

    // Use event delegation for better reliability
    const handleMouseEnter = (e: Event): void => {
      const target = e.target as HTMLElement;
      // Check if the target matches our hover selectors
      if (target.matches('a, button, .project, .misc-item') || 
          target.closest('a, button, .project, .misc-item')) {
        outerCircle.dataset.scale = 'scale(1.5)';
      }
    };

    const handleMouseLeave = (e: Event): void => {
      const target = e.target as HTMLElement;
      // Check if we're leaving a hoverable element
      if (target.matches('a, button, .project, .misc-item') || 
          target.closest('a, button, .project, .misc-item')) {
        outerCircle.dataset.scale = 'scale(1)';
        outerCircle.style.borderColor = '';
      }
    };

    // Use event delegation on document
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div 
        className={`cursor fixed w-5 h-5 rounded-full border z-[100] pointer-events-none transition-colors duration-300 ${
          isDarkMode ? 'border-white' : 'border-gray-900'
        }`} 
        style={{ left: 0, top: 0 }} 
      />
      <div 
        className={`cursor-dot fixed w-1 h-1 rounded-full z-[100] pointer-events-none transition-colors duration-300 ${
          isDarkMode ? 'bg-white' : 'bg-gray-900'
        }`} 
        style={{ left: 0, top: 0 }} 
      />
    </>
  );
}

export default CustomCursor;
