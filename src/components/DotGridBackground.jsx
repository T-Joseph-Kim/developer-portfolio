import { useEffect, useRef } from 'react';

function DotGridBackground() {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const spacing = 17;
    const radius = 1.5;
    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrameId;
    let lastTimestamp = 0;

    const initCanvas = () => {
      const width = window.innerWidth;
      const height = document.body.scrollHeight;

      dimensionsRef.current = { width, height };
      canvas.width = width;
      canvas.height = height;

      const dots = [];
      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          dots.push({ x, y, current: 0.2, target: 0.2 });
        }
      }
      dotsRef.current = dots;
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const draw = (timestamp) => {
      // Throttle frame rate to ~60fps
      if (timestamp - lastTimestamp < 16) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTimestamp = timestamp;

      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      const visibleTop = window.scrollY - 300;
      const visibleBottom = window.scrollY + window.innerHeight + 300;

      for (const dot of dotsRef.current) {
        if (dot.y < visibleTop || dot.y > visibleBottom) continue;

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = dx * dx + dy * dy;

        if (dist < 250 * 250) {
          dot.target = Math.max(0.2, 1 - Math.sqrt(dist) / 250);
        } else {
          dot.target = 0.2;
        }

        dot.current = lerp(dot.current, dot.target, 0.08);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${dot.current * 0.6})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      initCanvas();
    };

    // Init once
    initCanvas();
    animationFrameId = requestAnimationFrame(draw);

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

export default DotGridBackground;
