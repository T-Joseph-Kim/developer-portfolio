import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // modern minimal arrow icon

export default function ScrollArrow(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  let inactivityTimer: NodeJS.Timeout;

  useEffect(() => {
    const resetTimer = () => {
      setVisible(false); // hide immediately on activity
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => setVisible(true), 5000); // 3s idle
    };

    // listen for user movement/scroll
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // start the first timer
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <ChevronDown
            className="h-10 w-10 text-gray-400 dark:text-gray-200 animate-pulse"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
