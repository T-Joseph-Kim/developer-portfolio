import { useEffect, useRef } from 'react';

function DotGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const spacing = 17;
    const radius = 1.5;

    let mouseX = -1000;
    let mouseY = -1000;

    const dots = [];
    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        dots.push({ x, y, current: 0.2, target: 0.2 });
      }
    }

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        dot.target = Math.max(0.2, 1 - dist / 250);

        dot.current = lerp(dot.current, dot.target, 0.04);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${dot.current * 0.6})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      dots.length = 0;
      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          dots.push({ x, y, current: 0.2, target: 0.2 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

export default DotGridBackground;
