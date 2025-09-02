import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useTheme } from "../contexts/ThemeContext";

const About: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentRole, setCurrentRole] = useState(0);

  const nameRef = useRef<HTMLHeadingElement>(null);

  // Roles are objects with a title and emoji
  const roles = [
    { title: "Full-Stack Developer", emoji: "💻" },
    { title: "Cloud Engineer", emoji: "☁️" },
    { title: "Software Engineer", emoji: "🛠️" },
  ];

  // Cycle roles every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Confetti burst from center of the name
  const launchConfetti = () => {
    if (!nameRef.current) return;

    const rect = nameRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 25,
      origin: { x, y },
      colors: ["#6366F1", "#EC4899", "#3B82F6", "#22D3EE"],
      scalar: 0.6,
    });
  };

  return (
    <div className="flex flex-col justify-center h-full text-center md:text-left">
      {/* Status indicator */}
      <div className="flex items-center justify-center md:justify-start mb-4">
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span
          className={`text-md font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
          style={{
            fontFamily:
              '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          Let’s connect
        </span>
      </div>

      {/* Hello text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`text-2xl mb-3 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
        style={{
          fontFamily:
            '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        Hello, my name is
      </motion.p>

      {/* Name with confetti on hover */}
      <motion.h1
        ref={nameRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={launchConfetti}
        className={`font-bold mb-6 transition-colors duration-300 name-hover
          ${isDarkMode ? "text-white" : "text-gray-900"}
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
        `}
        style={{
          fontFamily:
            '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          cursor: "pointer",
        }}
      >
        T. Joseph Kim
      </motion.h1>

      {/* Static education line */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`text-base sm:text-lg md:text-xl font-medium mb-6 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
        style={{
          fontFamily:
            '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        University of Florida · B.S. in Computer Science
      </motion.p>

      {/* Roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="h-12 flex items-center justify-center md:justify-start"
      >
        <motion.div
          key={roles[currentRole].title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center justify-center px-6 py-3 rounded-full 
            text-md sm:text-lg md:text-xl lg:text-xl font-semibold
            ${isDarkMode ? "bg-blue-400/10 text-blue-400" : "bg-blue-100 text-blue-600"}
          `}
          style={{
            fontFamily:
              '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {/* Animate each character */}
          {roles[currentRole].title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}

          {/* Emoji appears after the text */}
          <motion.span
            key="emoji"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: roles[currentRole].title.length * 0.05 }}
            className="ml-2"
          >
            {roles[currentRole].emoji}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
