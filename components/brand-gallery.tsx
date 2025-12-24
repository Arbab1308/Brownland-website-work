"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const galleryItems = [
  {
    src: "/images/signage.png",
    alt: "Brownland Coffee Signage",
    title: "Our Signage",
    description: "Bold brand presence with premium finish",
  },
  {
    src: "/images/packaging-cup.png",
    alt: "Brownland Coffee Packaging",
    title: "Packaging",
    description: "Premium cups and takeaway bags",
  },
  {
    src: "/images/business-card.png",
    alt: "Brownland Business Card",
    title: "Business Cards",
    description: "Premium identity pieces",
  },
  {
    src: "/images/display-stand.png",
    alt: "Brownland Display Shelf",
    title: "Display Units",
    description: "Functional storytelling",
  },
]

export default function BrandGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-[#FFFAF3]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#683419]/70">Brand Identity</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#683419] mt-4">The Brownland Experience</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-[#683419]/5"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#683419] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FFFAF3] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="font-sans text-sm opacity-80">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
