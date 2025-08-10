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
      // Typing effect
      if (displayText.length < currentRoleText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        }, 50);
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        // Finished deleting, move to next role
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentRole, roles]);

  return (
    <div className="flex flex-col justify-center h-full">
      {/* Hello text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`text-lg mb-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
        style={{
          fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        Hello, my name is
      </motion.p>

      {/* Joseph Kim with hover scale effect */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        className={`text-8xl font-bold mb-6 cursor-pointer transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
        style={{
          fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        Joseph Kim
      </motion.h1>

      {/* Typing effect for roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="h-10"
      >
        <span 
          className={`text-2xl font-medium ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}
          style={{
            fontFamily: '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          {displayText}
          <span className={`inline-block w-0.5 h-8 ml-1 animate-pulse ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
          }`} />
        </span>
      </motion.div>
    </div>
  );
};

export default About;
