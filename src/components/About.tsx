import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const About: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const roles = [
    'Full-Stack Developer',
    'Cloud Engineer', 
    'Software Engineer'
  ];

  useEffect(() => {
    const currentRoleText = roles[currentRole];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRoleText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentRole, roles]);

  return (
    <div className="flex flex-col justify-center h-full text-center md:text-left">
      {/* Hello text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`text-2xl mb-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
        style={{
          fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        Hello, my name is
      </motion.p>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        className={`font-bold mb-6 transition-colors duration-300 name-hover
          ${isDarkMode ? 'text-white' : 'text-gray-900'}
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
        `}
        style={{
          fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          cursor: 'none'
        }}
      >
        T. Joseph Kim
      </motion.h1>

      {/* Static education line */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={`text-base sm:text-lg md:text-xl font-medium mb-6
          ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
        `}
        style={{
          fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        University of Florida · B.S. in Computer Science
      </motion.p>

      {/* Typing effect for roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="h-10"
      >
        <span
          className={`font-medium 
            ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
            text-xl sm:text-xl md:text-2xl lg:text-2xl
          `}
          style={{
            fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          {displayText}
          <span
            className={`inline-block ml-1 animate-pulse
              ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}
              w-0.5 h-5 sm:h-6 md:h-7 lg:h-8
            `}
          />
        </span>
      </motion.div>
    </div>
  );
};

export default About;
