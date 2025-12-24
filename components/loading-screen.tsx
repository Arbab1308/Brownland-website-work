"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#683419] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background coffee plant pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="coffee-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#FFFAF3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#coffee-pattern)" />
        </svg>
      </div>

      {/* Animated rings */}
      <div className="absolute">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-[#FFFAF3]/20"
            style={{
              width: 200 + ring * 80,
              height: 200 + ring * 80,
              left: -(100 + ring * 40),
              top: -(100 + ring * 40),
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.1, 0.3, 0.1],
              rotate: ring % 2 === 0 ? [0, 360] : [360, 0],
            }}
            transition={{
              duration: 4 + ring,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: ring * 0.3,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Coffee cup steam animation */}
        <div className="absolute -top-16 flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-[#FFFAF3]/40 to-transparent rounded-full"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: [20, 40, 20],
                opacity: [0, 0.6, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Logo with reveal animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative"
        >
          {/* Glow effect behind logo */}
          <motion.div
            className="absolute inset-0 bg-[#FFFAF3]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <Image
            src="/images/logo-dark.png"
            alt="Brownland Coffee"
            width={280}
            height={280}
            className="w-48 md:w-64 relative z-10"
            priority
          />
        </motion.div>

        {/* Tagline with typewriter effect */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-serif text-[#FFFAF3]/80 text-lg md:text-xl italic tracking-wide"
        >
          Your Daily Dose of Magic
        </motion.p>

        {/* Coffee bean loading indicator */}
        <div className="flex items-center gap-4 mt-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            >
              {/* Coffee bean shape */}
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <ellipse cx="8" cy="10" rx="7" ry="9" fill="#FFFAF3" />
                <path d="M8 2C8 2 6 6 6 10C6 14 8 18 8 18" stroke="#683419" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="font-sans text-[#FFFAF3]/60 text-xs tracking-[0.3em] uppercase mt-2"
        >
          Brewing your experience
        </motion.p>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#FFFAF3]/20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#FFFAF3]/20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </motion.div>
  )
}
