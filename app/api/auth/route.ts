import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { action, ...data } = await request.json()

    // In a real app, this would authenticate with a database or auth service
    // For demo purposes, we'll simulate authentication

    switch (action) {
      case "signin":
        // Simulate sign in
        if (data.email === "demo@example.com" && data.password === "password") {
          return NextResponse.json({
            success: true,
            user: {
              id: "user_123",
              firstName: "Demo",
              lastName: "User",
              email: "demo@example.com",
              phone: "+233 20 123 4567",
            },
          })
        } else {
          return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
        }

      case "signup":
        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.password) {
          return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
        }

        // Simulate user creation
        return NextResponse.json({
          success: true,
          user: {
            id: `user_${Math.random().toString(36).substring(2, 9)}`,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
          },
        })

      default:
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 500 })
  }
}

