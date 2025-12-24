"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, ShoppingBag, MapPin, Truck, Clock, X, Coffee } from "lucide-react"
import { menuCategories, menuItems, outlets } from "@/lib/menu-data"
import { useCart, CartProvider } from "@/lib/cart-context"

function OrderPageContent() {
  const [activeCategory, setActiveCategory] = useState("hot")
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup")
  const [selectedOutlet, setSelectedOutlet] = useState(outlets[0].id)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [razorpayKey, setRazorpayKey] = useState<string | null>(null)

  const { items, addItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart()

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  const handlePayment = async () => {
    if (!customerName || !customerPhone) {
      alert("Please enter your name and phone number")
      return
    }
    if (orderType === "delivery" && !deliveryAddress) {
      alert("Please enter your delivery address")
      return
    }
    if (items.length === 0) {
      alert("Your cart is empty")
      return
    }
    if (!razorpayKey) {
      alert("Payment system is not ready. Please try again.")
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          items: items,
          orderType,
          outlet: orderType === "pickup" ? selectedOutlet : null,
          deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
          customerName,
          customerPhone,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to create order")
      }

      const options = {
        key: razorpayKey,
        amount: data.order.amount,
        currency: "INR",
        name: "Brownland Coffee",
        description: `Order - ${items.length} items`,
        order_id: data.order.id,
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            clearCart()
            setIsCartOpen(false)
            alert("Order placed successfully! You will receive a confirmation shortly.")
          } else {
            alert("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: customerName,
          contact: customerPhone,
        },
        theme: {
          color: "#683419",
        },
      }

      const razorpay = new (
        window as unknown as { Razorpay: new (options: typeof options) => { open: () => void } }
      ).Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    // Fetch Razorpay public key from server
    fetch("/api/razorpay-config")
      .then((res) => res.json())
      .then((data) => {
        if (data.keyId) {
          setRazorpayKey(data.keyId)
        }
      })
      .catch(console.error)

    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FFFAF3]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FFFAF3] border-b border-[#683419]/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-[#683419] hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-sans text-sm uppercase tracking-wider">Back</span>
            </Link>

            <Link href="/">
              <Image src="/images/logo-light.png" alt="Brownland Coffee" width={60} height={60} className="w-12" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#683419] hover:bg-[#683419]/5 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#683419] text-[#FFFAF3] text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-[#683419]">Order Online</h1>
          <p className="font-sans text-[#683419]/70 mt-2">Your Daily Dose of Brownland Magic, delivered</p>
        </div>

        {/* Order Type Selection */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex rounded-full border-2 border-[#683419] overflow-hidden">
            <button
              onClick={() => setOrderType("pickup")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 font-sans text-sm uppercase tracking-wider transition-colors ${
                orderType === "pickup" ? "bg-[#683419] text-[#FFFAF3]" : "bg-transparent text-[#683419]"
              }`}
            >
              <MapPin className="w-4 h-4" />
              Pickup
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 font-sans text-sm uppercase tracking-wider transition-colors ${
                orderType === "delivery" ? "bg-[#683419] text-[#FFFAF3]" : "bg-transparent text-[#683419]"
              }`}
            >
              <Truck className="w-4 h-4" />
              Delivery
            </button>
          </div>
        </div>

        {/* Outlet Selection for Pickup */}
        {orderType === "pickup" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <h3 className="font-sans text-sm uppercase tracking-wider text-[#683419]/70 mb-4">
              Select Pickup Location
            </h3>
            <div className="grid gap-3">
              {outlets.map((outlet) => (
                <button
                  key={outlet.id}
                  onClick={() => setSelectedOutlet(outlet.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedOutlet === outlet.id
                      ? "border-[#683419] bg-[#683419]/5"
                      : "border-[#683419]/20 hover:border-[#683419]/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      className={`w-5 h-5 mt-0.5 ${selectedOutlet === outlet.id ? "text-[#683419]" : "text-[#683419]/50"}`}
                    />
                    <div>
                      <h4 className="font-sans font-medium text-[#683419]">{outlet.name}</h4>
                      <p className="font-sans text-sm text-[#683419]/60 mt-1">{outlet.address}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Tabs */}
        <div className="overflow-x-auto pb-2 mb-8 -mx-4 px-4">
          <div className="flex gap-2 min-w-max">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 font-sans text-sm tracking-wider uppercase rounded-full transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-[#683419] text-[#FFFAF3]"
                    : "bg-transparent text-[#683419] border border-[#683419]/30 hover:border-[#683419]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {filteredItems.map((item) => {
            const cartItem = items.find((i) => i.id === item.id)
            const quantity = cartItem?.quantity || 0

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#683419]/5 rounded-xl p-5 hover:bg-[#683419]/10 transition-colors"
              >
                {item.image && (
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                )}

                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="font-sans font-medium text-[#683419]">{item.name}</h3>
                    {item.description && <p className="font-sans text-sm text-[#683419]/60 mt-1">{item.description}</p>}
                  </div>
                  {item.tag && (
                    <span className="shrink-0 px-2 py-1 bg-[#683419] text-[#FFFAF3] font-sans text-xs uppercase rounded">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-serif text-xl text-[#683419]">₹{item.price}</span>

                  {quantity === 0 ? (
                    <button
                      onClick={() => addItem(item)}
                      className="px-4 py-2 bg-[#683419] text-[#FFFAF3] font-sans text-sm uppercase tracking-wider rounded-full hover:bg-[#7a3f1f] transition-colors"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-[#683419] rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="p-1 text-[#FFFAF3] hover:opacity-80"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-sans text-[#FFFAF3] min-w-[20px] text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="p-1 text-[#FFFAF3] hover:opacity-80"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && !isCartOpen && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-4 bg-[#683419] text-[#FFFAF3] rounded-full shadow-lg hover:bg-[#7a3f1f] transition-colors z-50"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-sans text-sm uppercase tracking-wider">
            {totalItems} items · ₹{totalPrice}
          </span>
        </motion.button>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FFFAF3] z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-[#683419]">Your Order</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-[#683419] hover:bg-[#683419]/5 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <Coffee className="w-16 h-16 text-[#683419]/30 mx-auto mb-4" />
                    <p className="font-sans text-[#683419]/60">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-[#683419]/5 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-sans font-medium text-[#683419]">{item.name}</h4>
                            <p className="font-sans text-sm text-[#683419]/60">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#683419] hover:bg-[#683419]/10 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-sans text-[#683419] min-w-[24px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#683419] hover:bg-[#683419]/10 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-serif text-lg text-[#683419]">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Type Summary */}
                    <div className="p-4 bg-[#683419]/5 rounded-lg mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        {orderType === "pickup" ? (
                          <MapPin className="w-4 h-4 text-[#683419]" />
                        ) : (
                          <Truck className="w-4 h-4 text-[#683419]" />
                        )}
                        <span className="font-sans text-sm uppercase tracking-wider text-[#683419]">
                          {orderType === "pickup" ? "Pickup" : "Delivery"}
                        </span>
                      </div>
                      {orderType === "pickup" && (
                        <p className="font-sans text-sm text-[#683419]/70">
                          {outlets.find((o) => o.id === selectedOutlet)?.name}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-[#683419]/60">
                        <Clock className="w-4 h-4" />
                        <span className="font-sans text-sm">
                          {orderType === "pickup" ? "Ready in 15-20 mins" : "Delivery in 30-45 mins"}
                        </span>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block font-sans text-sm text-[#683419] mb-2">Your Name *</label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 border-2 border-[#683419]/20 rounded-lg bg-transparent font-sans text-[#683419] placeholder:text-[#683419]/40 focus:border-[#683419] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-sm text-[#683419] mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 border-2 border-[#683419]/20 rounded-lg bg-transparent font-sans text-[#683419] placeholder:text-[#683419]/40 focus:border-[#683419] focus:outline-none transition-colors"
                        />
                      </div>
                      {orderType === "delivery" && (
                        <div>
                          <label className="block font-sans text-sm text-[#683419] mb-2">Delivery Address *</label>
                          <textarea
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Enter your full delivery address"
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-[#683419]/20 rounded-lg bg-transparent font-sans text-[#683419] placeholder:text-[#683419]/40 focus:border-[#683419] focus:outline-none transition-colors resize-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="border-t-2 border-[#683419]/10 pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-sans text-[#683419]/70">Subtotal</span>
                        <span className="font-sans text-[#683419]">₹{totalPrice}</span>
                      </div>
                      {orderType === "delivery" && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-sans text-[#683419]/70">Delivery Fee</span>
                          <span className="font-sans text-[#683419]">₹30</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-sans font-medium text-[#683419]">Total</span>
                        <span className="font-serif text-2xl text-[#683419]">
                          ₹{totalPrice + (orderType === "delivery" ? 30 : 0)}
                        </span>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing || !razorpayKey}
                      className="w-full py-4 bg-[#683419] text-[#FFFAF3] font-sans text-sm uppercase tracking-widest hover:bg-[#7a3f1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Processing..." : `Pay ₹${totalPrice + (orderType === "delivery" ? 30 : 0)}`}
                    </button>

                    <p className="font-sans text-xs text-center text-[#683419]/50 mt-4">
                      Secure payment powered by Razorpay
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function OrderPage() {
  return (
    <CartProvider>
      <OrderPageContent />
    </CartProvider>
  )
}
