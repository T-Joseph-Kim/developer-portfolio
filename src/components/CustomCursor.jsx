import { useEffect } from 'react';

function CustomCursor() {
  useEffect(() => {
    const outerCircle = document.querySelector('.cursor');
    const innerDot = document.querySelector('.cursor-dot');

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    function animateCursor() {
      if (!outerCircle || !innerDot) return;

      outerX += (mouseX - outerX) * 0.1;
      outerY += (mouseY - outerY) * 0.1;

      innerX += (mouseX - innerX) * 0.8;
      innerY += (mouseY - innerY) * 0.8;


      outerCircle.style.left = `${outerX - 10}px`;
      outerCircle.style.top = `${outerY - 10}px`;

      innerDot.style.left = `${innerX - 2}px`;
      innerDot.style.top = `${innerY - 2}px`;
        
      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, .project, .misc-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (outerCircle) {
          outerCircle.style.transform = 'scale(1.5)';
          outerCircle.style.borderColor = '#999';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (outerCircle) {
          outerCircle.style.transform = 'scale(1)';
          outerCircle.style.borderColor = '';
        }
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cursor fixed w-5 h-5 rounded-full border-1 border-white z-50 pointer-events-none mix-blend-difference" />
      <div className="cursor-dot fixed w-1 h-1 rounded-full bg-white z-50 pointer-events-none mix-blend-difference" />
    </>
  );
}

export default CustomCursor;
