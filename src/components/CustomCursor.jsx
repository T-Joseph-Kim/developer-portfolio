import { useEffect } from 'react';

function CustomCursor() {
  useEffect(() => {
    const outerCircle = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (!outerCircle || !cursorDot) return;

    outerCircle.dataset.scale = 'scale(1)';
    outerCircle.style.transition = 'transform 0.2s ease-out';

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      dotX += (mouseX - dotX);
      dotY += (mouseY - dotY);

      // Use transform instead of left/top for better performance and compatibility with scale
      outerCircle.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) ${outerCircle.dataset.scale || 'scale(1)'}`;
      cursorDot.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`;

      requestAnimationFrame(animate);
    };

    animate();

    // Use event delegation for better reliability
    const handleMouseEnter = (e) => {
      // Check if the target matches our hover selectors
      if (e.target.matches('a, button, .project, .misc-item') || 
          e.target.closest('a, button, .project, .misc-item')) {
        outerCircle.dataset.scale = 'scale(1.5)';
      }
    };

    const handleMouseLeave = (e) => {
      // Check if we're leaving a hoverable element
      if (e.target.matches('a, button, .project, .misc-item') || 
          e.target.closest('a, button, .project, .misc-item')) {
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
      <div className="cursor fixed w-5 h-5 rounded-full border border-white z-[100] pointer-events-none mix-blend-difference" style={{ left: 0, top: 0 }} />
      <div className="cursor-dot fixed w-1 h-1 rounded-full bg-white z-[100] pointer-events-none mix-blend-difference" style={{ left: 0, top: 0 }} />
    </>
  );
}

export default CustomCursor;
