"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Coffee, IceCream, Leaf, Cookie, Cake } from "lucide-react"

const menuCategories = [
  { id: "hot", name: "Hot Coffee", icon: Coffee },
  { id: "shakes", name: "Thick Shakes", icon: IceCream },
  { id: "iced", name: "Iced Brews", icon: Coffee },
  { id: "snacks", name: "Snacks", icon: Cookie },
  { id: "dessert", name: "Dessert", icon: Cake },
  { id: "tea", name: "Tea", icon: Leaf },
]

const menuItems: Record<string, Array<{ name: string; price: string; tag?: string; desc?: string }>> = {
  hot: [
    { name: "Black Coffee", price: "₹50" },
    { name: "Hot Latte", price: "₹50" },
    { name: "Hot Cappuccino", price: "₹60" },
    { name: "Signature Hot Coffee", price: "₹60", desc: "Sugar added" },
    { name: "Hot Chocolate", price: "₹70" },
    { name: "Hot Mocha", price: "₹70" },
    { name: "Hot Nutella", price: "₹80" },
    { name: "Hot Nutella Coffee", price: "₹100" },
  ],
  shakes: [
    { name: "Brownland Cold Coffee", price: "₹110", tag: "Best Seller" },
    { name: "Butterscotch Shake", price: "₹110" },
    { name: "Oreo Shake", price: "₹130" },
    { name: "Brownie Shake", price: "₹150", tag: "Best Seller" },
    { name: "Kit-Kat Shake", price: "₹150" },
    { name: "Lotus Biscoff Coffee Shake", price: "₹190", tag: "Best Seller" },
    { name: "Nutella Biscoff Coffee Shake", price: "₹210", tag: "Best Seller" },
    { name: "Try Your Own", price: "₹210" },
  ],
  iced: [
    { name: "Iced Lemon Tea", price: "₹80" },
    { name: "Iced Americano", price: "₹80", desc: "Only Coffee - No Sugar - No Milk" },
    { name: "Iced Peach Tea", price: "₹90", tag: "Best Seller" },
    { name: "Iced Mocha", price: "₹90", tag: "Best Seller", desc: "Coffee + Chocolate" },
    { name: "Brownlano", price: "₹100", tag: "Best Seller", desc: "Coffee + Sugar + Icecream" },
    { name: "Orange Americano", price: "₹120", desc: "No sugar" },
    { name: "Iced Nutella Biscoff Coffee", price: "₹140", tag: "Best Seller" },
  ],
  snacks: [
    { name: "Butter Toast", price: "₹60" },
    { name: "Cheese Corn Toast", price: "₹120" },
    { name: "Korean Cream Cheese Bun", price: "₹120" },
  ],
  dessert: [
    { name: "Nutella Bomboloni", price: "₹120", tag: "Best Seller" },
    { name: "Oreo Nutella Cheese Cake", price: "₹200" },
    { name: "Lotus Biscoff Cheese Cake", price: "₹230" },
  ],
  tea: [
    { name: "Honey Lemon Tea", price: "₹60", tag: "New" },
    { name: "Masala Tea", price: "₹60" },
    { name: "Hibiscus Tea", price: "₹90" },
    { name: "Turkish Tea", price: "₹90" },
  ],
}

const featuredImages = [
  {
    src: "/images/orange-americano.png",
    alt: "Orange Americano",
  },
  {
    src: "/images/iced-tea-sandwich.png",
    alt: "Iced Lemon Tea & Bombay Masala Sandwich",
  },
  {
    src: "/images/cream-cheese-bun.png",
    alt: "Korean Cream Cheese Bun",
  },
  {
    src: "/images/cheese-corn-sandwich.png",
    alt: "Cheese Corn Sandwich",
  },
]

export default function MenuSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("hot")
  const router = useRouter()

  const handleOrderClick = () => {
    router.push("/order")
  }

  return (
    <section id="menu" className="py-24 bg-[#683419]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#FFFAF3]/70">What We Serve</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#FFFAF3] mt-4">Our Menu</h2>
        </motion.div>

        {/* Featured Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {featuredImages.map((img) => (
            <div key={img.alt} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#683419]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-sans text-sm text-[#FFFAF3]">{img.alt}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {menuCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 font-sans text-sm tracking-wider uppercase transition-all duration-300 rounded-full ${
                  activeCategory === category.id
                    ? "bg-[#FFFAF3] text-[#683419]"
                    : "bg-transparent text-[#FFFAF3] border border-[#FFFAF3]/30 hover:border-[#FFFAF3]"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </motion.div>

        {/* Menu Items Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {menuItems[activeCategory]?.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#FFFAF3]/10 backdrop-blur-sm rounded-lg p-5 hover:bg-[#FFFAF3]/15 transition-colors duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-sans text-lg text-[#FFFAF3] font-medium">{item.name}</h3>
                  {item.desc && <p className="font-sans text-sm text-[#FFFAF3]/60 mt-1">{item.desc}</p>}
                  {item.tag && (
                    <span className="inline-block mt-2 px-3 py-1 bg-[#FFFAF3] text-[#683419] font-sans text-xs tracking-wider uppercase rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>
                <span className="font-serif text-xl text-[#FFFAF3]">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Order Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={handleOrderClick}
            className="inline-block px-10 py-4 bg-[#FFFAF3] text-[#683419] font-sans text-sm tracking-widest uppercase hover:bg-[#f0e9dc] transition-colors duration-300 cursor-pointer"
          >
            Order Online
          </button>
        </motion.div>
      </div>
    </section>
  )
}
