"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const router = useRouter()

  const handleOrderClick = () => {
    console.log("[v0] Order Online clicked, navigating to /order")
    router.push("/order")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFAF3]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/coffee-plant-pattern.jpg')] bg-repeat opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Image
              src="/images/logo-light.png"
              alt="Brownland Coffee Logo"
              width={400}
              height={400}
              className="w-64 md:w-80 lg:w-96"
              priority
            />
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#683419] mb-6 max-w-4xl leading-tight"
          >
            Your Daily Dose of
            <br />
            <span className="italic">Brownland Magic</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-sans text-lg md:text-xl text-[#683419]/70 mb-10 max-w-2xl"
          >
            More than a café — it is a shared experience. Built on the idea of being for us, for everyone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleOrderClick}
              className="px-8 py-4 bg-[#683419] text-[#FFFAF3] font-sans text-sm tracking-widest uppercase hover:bg-[#7a3f1f] transition-colors duration-300"
            >
              Order Online
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.brownlandcoffee.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-[#683419] text-[#683419] font-sans text-sm tracking-widest uppercase hover:bg-[#683419] hover:text-[#FFFAF3] transition-colors duration-300"
            >
              Get the App
            </a>
          </motion.div>

          {/* Secondary Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex gap-6 mt-6"
          >
            <Link
              href="#locations"
              className="font-sans text-sm text-[#683419]/70 hover:text-[#683419] transition-colors underline underline-offset-4"
            >
              Visit Us
            </Link>
            <Link
              href="#about"
              className="font-sans text-sm text-[#683419]/70 hover:text-[#683419] transition-colors underline underline-offset-4"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-[#683419] rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-3 bg-[#683419] rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  )
}
