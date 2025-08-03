import { useEffect } from 'react';

function CustomCursor() {
  useEffect(() => {
    const outerCircle = document.querySelector('.cursor');
    const innerDot = document.querySelector('.cursor-dot');
    const hoverTargets = document.querySelectorAll('a, .project, .misc-item');

    if (!outerCircle || !innerDot) return;

    // Position and interpolation variables
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;

    // Cache cursor dimensions
    const outerOffset = 10;
    const innerOffset = 2;

    // Animation loop
    let rafId;
    const animateCursor = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;

      innerX += (mouseX - innerX);
      innerY += (mouseY - innerY);

      outerCircle.style.transform = `translate3d(${outerX - outerOffset}px, ${outerY - outerOffset}px, 0)`;
      innerDot.style.transform = `translate3d(${innerX - innerOffset}px, ${innerY - innerOffset}px, 0)`;

      rafId = requestAnimationFrame(animateCursor);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    // Hover effect
    const handleMouseEnter = () => {
      outerCircle.style.transform += ' scale(1.5)';
      outerCircle.style.borderColor = '#999';
    };

    const handleMouseLeave = () => {
      outerCircle.style.transform = outerCircle.style.transform.replace(' scale(1.5)', '');
      outerCircle.style.borderColor = '';
    };

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor fixed w-5 h-5 rounded-full border border-white z-100 pointer-events-none mix-blend-difference" />
      <div className="cursor-dot fixed w-1 h-1 rounded-full bg-white z-100 pointer-events-none mix-blend-difference" />
    </>
  );
}

export default CustomCursor;
