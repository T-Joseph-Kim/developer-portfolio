import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface ProfileCardProps {
  photoUrl?: string;
}

export default function ProfileCard({
  photoUrl = "/headshot.png",
}: ProfileCardProps): React.JSX.Element {
  const { isDarkMode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  // ===== Tilt helpers with RAF throttle
  const updateTiltFromEvent = (clientX: number, clientY: number): void => {
    cancelAnimationFrame(rafId.current!);
    rafId.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const max = 10; // deg
      const ry = (px - 0.5) * (max * 2);
      const rx = (0.5 - py) * (max * 2);
      setTilt({ rx, ry });
      setPointer({ x: px, y: py });
    });
  };

  const resetTilt = (): void => setTilt({ rx: 0, ry: 0 });

  // Touch support
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onTouchMove = (e: TouchEvent): void => {
      const t = e.touches[0];
      updateTiltFromEvent(t.clientX, t.clientY);
    };
    const onTouchEnd = (): void => resetTilt();

    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const cssVars = useMemo(
    () => ({
      "--mx": `${(pointer.x * 100).toFixed(2)}%`,
      "--my": `${(pointer.y * 100).toFixed(2)}%`,
    }),
    [pointer]
  );

  return (
    <div
      className="relative isolate perspective-1000"
      style={{
        // Width scales with screen, keeps min & max for readability
        width: "clamp(12rem, 80vw, 27rem)",
      }}
    >
      {/* Floating background accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`absolute -inset-8 -z-10 rounded-[2rem] blur-2xl ${
          isDarkMode
            ? "bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-sky-400/20"
            : "bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/20 to-sky-300/30"
        }`}
      />

      <motion.div
        ref={cardRef}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          ...cssVars,
          willChange: "transform",
        }}
        onMouseMove={(e) => updateTiltFromEvent(e.clientX, e.clientY)}
        onMouseLeave={resetTilt}
        className={`group relative rounded-3xl p-1 ring-1 backdrop-blur-xl transition-transform duration-150 ${
          isDarkMode
            ? "bg-white/5 ring-white/10"
            : "bg-black/5 ring-black/10"
        }`}
      >
        {/* Reactive edge glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
          style={{
            padding: 2,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            background: isDarkMode
              ? `radial-gradient(180px circle at var(--mx) var(--my), rgba(99,102,241,0.55), transparent 60%),
                 conic-gradient(from 0deg at 50% 50%, rgba(56,189,248,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.15), rgba(56,189,248,0.15))`
              : `radial-gradient(180px circle at var(--mx) var(--my), rgba(99,102,241,0.4), transparent 60%),
                 conic-gradient(from 0deg at 50% 50%, rgba(56,189,248,0.2), rgba(168,85,247,0.2), rgba(236,72,153,0.2), rgba(56,189,248,0.2))`,
            borderRadius: 24,
          }}
        />

        {/* Card content */}
        <div
          className={`relative rounded-[1.4rem] p-4 ${
            isDarkMode
              ? "bg-gradient-to-b from-slate-900/80 to-slate-900/60"
              : "bg-gradient-to-b from-gray-200/85 to-gray-300/75"
          }`}
        >
          {/* Shooting stars overlay */}
          <Stars isDarkMode={isDarkMode} />

          {/* Photo container */}
          <div
            className={`relative w-full overflow-hidden rounded-2xl ring-1 ${
              isDarkMode ? "ring-white/10" : "ring-black/10"
            }`}
            style={{
              // Maintains consistent aspect ratio as card scales
              aspectRatio: "4 / 5",
            }}
          >
            <img
              src={photoUrl}
              alt="Profile headshot"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              style={{ transform: "translateZ(40px)", willChange: "transform" }}
            />
            <div
              className={`pointer-events-none absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-tr from-indigo-500/30 via-transparent to-fuchsia-400/20"
                  : "bg-gradient-to-tr from-indigo-400/20 via-transparent to-fuchsia-300/15"
              }`}
            />
          </div>
        </div>
      </motion.div>

      {/* Local styles for animations */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        /* Streak animation */
        @keyframes shoot {
          0% { transform: translate3d(-20%, -20%, 0) rotate(20deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(120%, 120%, 0) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function Stars({ isDarkMode }: { isDarkMode: boolean }): React.JSX.Element {
  const streaks = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 3,
        blur: 0.5 + Math.random() * 1.2,
        scale: 0.8 + Math.random() * 1.2,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.4rem]">
      {streaks.map((s) => (
        <div
          key={s.id}
          className={`absolute h-px w-40 ${
            isDarkMode
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-gray-400 to-transparent"
          }`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            filter: `blur(${s.blur}px)`,
            transform: `scale(${s.scale}) rotate(20deg)`,
            animation: `shoot ${s.duration}s linear ${s.delay}s infinite`,
            opacity: isDarkMode ? 0.8 : 0.6,
          }}
        />
      ))}
    </div>
  );
}
