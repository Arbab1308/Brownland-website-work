"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function CurvedVisitCta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <section ref={ref} className="py-32 bg-[#683419] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Curved Text SVG */}
          <motion.div
            style={{ scale }}
            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
          >
            <motion.svg style={{ rotate }} viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                <path id="curve" d="M 250 250 m -200 0 a 200 200 0 1 1 400 0 a 200 200 0 1 1 -400 0" fill="none" />
              </defs>
              <text className="fill-[#FFFAF3] font-sans text-[28px] md:text-[32px] tracking-[0.3em] uppercase">
                <textPath href="#curve" startOffset="0%">
                  Come Visit Us • Come Visit Us • Come Visit Us •
                </textPath>
              </text>
            </motion.svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.a
                href="#locations"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-32 h-32 md:w-40 md:h-40 bg-[#FFFAF3] rounded-full flex items-center justify-center group"
              >
                <div className="text-center">
                  <span className="font-serif text-2xl md:text-3xl text-[#683419] block">Visit</span>
                  <span className="font-sans text-xs tracking-widest text-[#683419]/70 uppercase">Today</span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-xl md:text-2xl text-[#FFFAF3] mt-12 text-center italic"
          >
            "Your Daily Dose of Brownland Magic"
          </motion.p>
        </div>
      </div>
    </section>
  )
}
