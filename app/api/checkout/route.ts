import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid cart items" }, { status: 400 })
    }

    if (!body.shippingDetails || !body.paymentMethod) {
      return NextResponse.json({ success: false, message: "Missing shipping or payment details" }, { status: 400 })
    }

    // Get user from session
    const sessionCookie = cookies().get("session")
    let userId = null

    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(sessionCookie.value)
        userId = sessionData.id
      } catch (error) {
        console.error("Error parsing session:", error)
      }
    }

    // Process payment based on method
    let paymentResult

    switch (body.paymentMethod) {
      case "mtn":
      case "vodafone":
        paymentResult = await processMobileMoneyPayment(body)
        break
      case "card":
        paymentResult = await processCardPayment(body)
        break
      default:
        return NextResponse.json({ success: false, message: "Unsupported payment method" }, { status: 400 })
    }

    if (!paymentResult.success) {
      return NextResponse.json({ success: false, message: paymentResult.message }, { status: 400 })
    }

    // Generate a random order ID with GH prefix (Ghana)
    const orderId = "GH-" + Math.floor(100000 + Math.random() * 900000)

    // In a real app, you would:
    // 1. Save the order to the database
    // 2. Update inventory
    // 3. Send confirmation email
    // 4. Create receipt

    return NextResponse.json({
      success: true,
      orderId: orderId,
      transactionId: paymentResult.transactionId,
      message: "Order placed successfully",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 days from now
      trackingInfo: {
        carrier: "Ghana Express Delivery",
        trackingNumber: "GED" + Math.floor(1000000000 + Math.random() * 9000000000),
      },
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ success: false, message: "Failed to process checkout" }, { status: 500 })
  }
}

// Mock mobile money payment processing
async function processMobileMoneyPayment(paymentData: any) {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Validate phone number
  if (!paymentData.phoneNumber || paymentData.phoneNumber.length < 10) {
    return {
      success: false,
      message: "Invalid phone number",
    }
  }

  // In a real app, you would integrate with MTN or Vodafone API
  // For demo, we'll simulate a successful payment
  return {
    success: true,
    transactionId: "MM" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    message: "Payment processed successfully",
  }
}

// Mock card payment processing
async function processCardPayment(paymentData: any) {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would integrate with a payment gateway
  // For demo, we'll simulate a successful payment
  return {
    success: true,
    transactionId: "CC" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    message: "Payment processed successfully",
  }
}

