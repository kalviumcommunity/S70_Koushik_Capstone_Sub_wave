import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SubwaveImage from '../assets/Subwave-image.png';

const WelcomeAnimation = ({ username, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 7000); // Increased to 7 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate random sparkles
  const sparkles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 1 + 1,
    x: Math.random() * 800 - 400,
    y: Math.random() * 800 - 400,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
      <motion.div
        className="relative bg-gradient-to-r from-purple-900 to-indigo-900 p-20 rounded-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          {/* Sparkles */}
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{
                width: sparkle.size,
                height: sparkle.size,
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
              }}
              initial={{ 
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                x: sparkle.x,
                y: sparkle.y,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 2
              }}
            />
          ))}

          {/* Logo animation */}
          <motion.div
            className="w-64 h-64 mx-auto mb-8"
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: 1,
              repeatType: "reverse"
            }}
            style={{
              perspective: 1000,
            }}
          >
            <motion.img
              src={SubwaveImage}
              alt="Subwave"
              className="w-full h-full object-contain"
              animate={{
                filter: [
                  'brightness(1) contrast(1)',
                  'brightness(1.2) contrast(1.1)',
                  'brightness(1) contrast(1)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>

          {/* Welcome text with glow effect */}
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h1 
              className="text-5xl font-bold text-white mb-4"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.2)',
                  '0 0 40px rgba(255,255,255,0.4)',
                  '0 0 20px rgba(255,255,255,0.2)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Welcome to SubWave
            </motion.h1>
            <motion.p 
              className="text-2xl text-purple-200"
              animate={{
                textShadow: [
                  '0 0 10px rgba(167,139,250,0.3)',
                  '0 0 20px rgba(167,139,250,0.5)',
                  '0 0 10px rgba(167,139,250,0.3)'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {username}
            </motion.p>
          </motion.div>

          {/* Circular particles */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: Math.cos(i * 22.5 * (Math.PI / 180)) * 150,
                y: Math.sin(i * 22.5 * (Math.PI / 180)) * 150,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3,
                delay: 3,
                ease: "easeOut",
                repeat: 1
              }}
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.6)'
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeAnimation; 