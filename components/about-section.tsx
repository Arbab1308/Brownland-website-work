"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-[#683419]" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Image
              src="/images/packaging-cup.png"
              alt="Brownland Coffee Packaging"
              width={600}
              height={600}
              className="w-full rounded-lg"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#FFFAF3]"
          >
            <span className="font-sans text-sm tracking-[0.3em] uppercase opacity-70">EST. 2000</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-8">Our Story</h2>
            <div className="space-y-6 font-sans text-lg leading-relaxed opacity-90">
              <p>
                Brownland Coffee is more than a café — it is a shared experience. Built on the idea of being for us, for
                everyone, Brownland creates everyday moments of comfort and connection through coffee and quick bites.
              </p>
              <p>
                Since 2000, Brownland has been blending premium café culture with everyday accessibility. From aromatic
                coffees and cold brews to sandwiches, maggi, and quick bites, Brownland makes the coffee experience
                warm, simple, and enjoyable for everyone.
              </p>
              <p className="font-serif italic text-xl">
                "Every sip, every bite, every visit carries the Brownland promise."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
