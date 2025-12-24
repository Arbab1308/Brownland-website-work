import { NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, items, orderType, outlet, deliveryAddress, customerName, customerPhone } = body

    // Add delivery fee if delivery
    const finalAmount = orderType === "delivery" ? amount + 30 : amount

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: finalAmount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        orderType,
        outlet: outlet || "",
        deliveryAddress: deliveryAddress || "",
        customerName,
        customerPhone,
        itemCount: items.length.toString(),
      },
    })

    return NextResponse.json({
      success: true,
      order,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
