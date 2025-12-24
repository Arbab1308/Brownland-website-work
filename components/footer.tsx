"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Instagram, Smartphone } from "lucide-react"

export default function Footer() {
  const router = useRouter()

  const handleOrderClick = () => {
    console.log("[v0] Order Online clicked from footer, navigating to /order")
    router.push("/order")
  }

  return (
    <footer className="py-16 bg-[#FFFAF3] border-t border-[#683419]/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Image src="/images/image.png" alt="Brownland Coffee Logo" width={150} height={175} className="w-24" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button
              onClick={handleOrderClick}
              className="px-6 py-3 bg-[#683419] text-[#FFFAF3] font-sans text-sm tracking-widest uppercase hover:bg-[#7a3f1f] transition-colors duration-300"
            >
              Order Online
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.brownlandcoffee.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#683419] text-[#683419] font-sans text-sm tracking-widest uppercase hover:bg-[#683419] hover:text-[#FFFAF3] transition-colors duration-300"
            >
              <Smartphone className="w-4 h-4" />
              Get the App
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 mt-8"
          >
            <a
              href="https://www.instagram.com/brownlandcoffee/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#683419] text-[#FFFAF3] rounded-full hover:bg-[#7a3f1f] transition-colors duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-2xl"
          >
            <p className="font-sans text-[#683419]/70 leading-relaxed">
              Brownland is just getting started, and this is only the beginning of our journey. With every cup, every
              design, and every detail, we're creating something more than coffee — we're building a lifestyle, a
              community, and a culture.
            </p>
            <p className="font-serif text-xl text-[#683419] mt-6 italic">THE BROWNLAND STORY HAS ONLY JUST BEGUN.</p>
          </motion.div>

          {/* Credits & Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-[#683419]/10 w-full"
          >
            <p className="font-sans text-sm text-[#683419]/50">Design by Team Vigtrix</p>
            <p className="font-sans text-sm text-[#683419]/50 mt-2">
              © {new Date().getFullYear()} Brownland Coffee. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
