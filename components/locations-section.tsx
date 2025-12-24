"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, ExternalLink } from "lucide-react"

const locations = [
  {
    name: "Tatibandh",
    address:
      "Hirapur Rd, opposite Singhania Sarovar Portico, Sarvodaya Nagar, Brownland, Tatibandh, Raipur, Chhattisgarh 492099",
    link: "https://share.google/FUGotfLwGlUxRYFxx",
  },
  {
    name: "Pandri",
    address: "No 5, opp. gate, near police station, Sector 1, Pandri, Devendra Nagar, Raipur, Chhattisgarh 492004",
    link: "https://share.google/I0bwvT76ogRLyXELX",
  },
  {
    name: "Shankar Nagar",
    address: "L-5, Avanti Vihar, Shankar Nagar, Raipur, Chhattisgarh 492001",
    link: "https://share.google/n3pH4BOrkKfQrIFFa",
  },
  {
    name: "Shailendra Nagar",
    address: "Behind Zudio, Old Rajendra Nagar, Shailendra Nagar, Raipur, Chhattisgarh 492001",
    link: "https://share.google/xraqLmKsSSZRRzx92",
  },
]

export default function LocationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="locations" className="py-24 bg-[#FFFAF3]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#683419]/70">Find Us</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#683419] mt-4">Our Locations in Raipur</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {locations.map((location, index) => (
            <motion.a
              key={location.name}
              href={location.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group block p-6 bg-[#683419]/5 rounded-lg hover:bg-[#683419] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#683419] text-[#FFFAF3] rounded-full group-hover:bg-[#FFFAF3] group-hover:text-[#683419] transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-[#683419] group-hover:text-[#FFFAF3] transition-colors duration-300">
                      {location.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-[#683419]/50 group-hover:text-[#FFFAF3]/50 transition-colors duration-300" />
                  </div>
                  <p className="font-sans text-sm text-[#683419]/70 group-hover:text-[#FFFAF3]/70 mt-2 leading-relaxed transition-colors duration-300">
                    {location.address}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
