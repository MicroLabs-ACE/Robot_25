import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WaveTransition: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const waveHeight = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 50, 80, 100]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#111111', '#2a2a2a', '#f8f8f8', '#FAF9F6']
  );

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-10"
      style={{ backgroundColor }}
    >
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
          fill="#F55C16"
          style={{
            pathLength: useTransform(scrollYProgress, [0, 1], [0, 1]),
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

export default WaveTransition;