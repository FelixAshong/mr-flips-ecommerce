import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// In a real app, you would use a database to store and retrieve user data
// This is a mock database for demonstration purposes
const MOCK_USERS = [
  {
    id: "user_1",
    firstName: "Demo",
    lastName: "User",
    email: "demo@example.com",
    password: "password123", // In a real app, this would be hashed
    phone: "+233 20 123 4567",
    role: "customer",
  },
  {
    id: "user_2",
    firstName: "Seller",
    lastName: "Account",
    email: "seller@example.com",
    password: "password123", // In a real app, this would be hashed
    phone: "+233 20 987 6543",
    role: "seller",
  },
  {
    id: "user_3",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "password123", // In a real app, this would be hashed
    phone: "+233 20 555 5555",
    role: "admin",
  },
]

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase())

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Create user object without password
    const userWithoutPassword = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }

    // Set session cookie
    cookies().set({
      name: "session",
      value: JSON.stringify(userWithoutPassword),
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during sign in" }, { status: 500 })
  }
}

