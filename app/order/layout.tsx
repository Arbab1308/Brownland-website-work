import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Online | Brownland Coffee",
  description: "Order your favorite coffee and snacks from Brownland Coffee. Pickup or delivery available in Raipur.",
}

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children
}
