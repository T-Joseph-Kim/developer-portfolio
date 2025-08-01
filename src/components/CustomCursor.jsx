import { useEffect, useRef } from 'react';

function CustomCursor({ color = 'white' }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-50 mix-blend-difference transition-colors duration-300"
        style={{
          transform: 'translate(-9999px, -9999px)',
          border: `2px solid ${color}`,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 mix-blend-difference transition-colors duration-300"
        style={{
          transform: 'translate(-9999px, -9999px)',
          backgroundColor: color,
        }}
      />
    </>
  );
}

export default CustomCursor;
