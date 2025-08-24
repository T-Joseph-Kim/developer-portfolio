import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface ProfileCardProps {
  photoUrl?: string;
}

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);
const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
const adjust = (v: number, a: number, b: number, c: number, d: number) =>
  round(c + ((d - c) * (v - a)) / (b - a));
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
} as const;

export default function ProfileCard({
  photoUrl = "/headshot.png",
}: ProfileCardProps): React.JSX.Element {
  const { isDarkMode } = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  const updateCardTransform = useCallback(
    (offsetX: number, offsetY: number, el: HTMLElement) => {
      const width = el.clientWidth;
      const height = el.clientHeight;

      const px = clamp(offsetX / width, 0, 1);
      const py = clamp(offsetY / height, 0, 1);

      const cx = px - 0.5;
      const cy = py - 0.5;

      const max = 10; // max degrees
      const ry = round(cx * (max * 2));
      const rx = round(-cy * (max * 2));

      setTilt({ rx, ry });
      setPointer({ x: px, y: py });
    },
    []
  );

  const createSmoothAnimation = useCallback(
    (duration: number, startX: number, startY: number, el: HTMLElement) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      const startTime = performance.now();
      const targetX = el.clientWidth / 2;
      const targetY = el.clientHeight / 2;

      const loop = (t: number) => {
        const progress = clamp((t - startTime) / duration, 0, 1);
        const eased = easeInOutCubic(progress);
        const curX = adjust(eased, 0, 1, startX, targetX);
        const curY = adjust(eased, 0, 1, startY, targetY);
        updateCardTransform(curX, curY, el);
        if (progress < 1) {
          rafId.current = requestAnimationFrame(loop);
        }
      };

      rafId.current = requestAnimationFrame(loop);
    },
    [updateCardTransform]
  );

  const cancelSmoothAnimation = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    cancelSmoothAnimation();
    const rect = el.getBoundingClientRect();
    updateCardTransform(e.clientX - rect.left, e.clientY - rect.top, el);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const startX = clamp(e.clientX - rect.left, 0, rect.width);
    const startY = clamp(e.clientY - rect.top, 0, rect.height);
    createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, startX, startY, el);
  };

  // Touch support
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const rect = el.getBoundingClientRect();
      cancelSmoothAnimation();
      updateCardTransform(t.clientX - rect.left, t.clientY - rect.top, el);
    };
    const onTouchEnd = () => {
      const rect = el.getBoundingClientRect();
      const startX = rect.width * pointer.x;
      const startY = rect.height * pointer.y;
      createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, startX, startY, el);
    };

    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [pointer, updateCardTransform, createSmoothAnimation, cancelSmoothAnimation]);

  // Initial glide-in
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !wrapRef.current) return;
    const startX = wrapRef.current.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const startY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    updateCardTransform(startX, startY, el);
    createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, startX, startY, el);
    return () => cancelSmoothAnimation();
  }, [updateCardTransform, createSmoothAnimation, cancelSmoothAnimation]);

  const cssVars = useMemo(
    () => ({
      "--mx": `${(pointer.x * 100).toFixed(2)}%`,
      "--my": `${(pointer.y * 100).toFixed(2)}%`,
    }),
    [pointer]
  );

  return (
    <div
      ref={wrapRef}
      className="relative isolate perspective-1000"
      style={{ width: "clamp(12rem, 80vw, 27rem)" }}
    >
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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative rounded-3xl p-1 ring-1 backdrop-blur-xl ${
          isDarkMode ? "bg-white/5 ring-white/10" : "bg-black/5 ring-black/10"
        }`}
      >
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

        <div
          className={`relative rounded-[1.4rem] p-4 ${
            isDarkMode
              ? "bg-gradient-to-b from-slate-900/80 to-slate-900/60"
              : "bg-gradient-to-b from-gray-200/85 to-gray-300/75"
          }`}
        >
          <Stars isDarkMode={isDarkMode} />
          <div
            className={`relative w-full overflow-hidden rounded-2xl ring-1 ${
              isDarkMode ? "ring-white/10" : "ring-black/10"
            }`}
            style={{ aspectRatio: "4 / 5" }}
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

      <style>{`
        .perspective-1000 { perspective: 1000px; }
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
      Array.from({ length: 20 }).map((_, i) => ({
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
