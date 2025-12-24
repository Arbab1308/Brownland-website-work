"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import BrandGallery from "@/components/brand-gallery"
import MenuSection from "@/components/menu-section"
import LocationsSection from "@/components/locations-section"
import CurvedVisitCta from "@/components/curved-visit-cta"
import Footer from "@/components/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-[#FFFAF3]">
      <HeroSection />
      <AboutSection />
      <BrandGallery />
      <MenuSection />
      <LocationsSection />
      <CurvedVisitCta />
      <Footer />
    </main>
  )
}
