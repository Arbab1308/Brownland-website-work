import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(sign).digest("hex")

    if (razorpay_signature === expectedSign) {
      // Payment verified successfully
      // Here you would typically:
      // 1. Update order status in database
      // 2. Send confirmation email/SMS
      // 3. Notify the café

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ success: false, error: "Failed to verify payment" }, { status: 500 })
  }
}
