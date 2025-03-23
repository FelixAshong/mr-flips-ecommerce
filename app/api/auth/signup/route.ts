import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// In a real app, you would use a database to store user data
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
]

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Check if email already exists
    if (MOCK_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ success: false, message: "Email already in use" }, { status: 409 })
    }

    // Generate a new user ID
    const id = `user_${Math.random().toString(36).substring(2, 9)}`

    // Create new user
    const newUser = {
      id,
      firstName,
      lastName,
      email,
      password, // In a real app, this would be hashed
      phone,
      role: "customer" as const,
    }

    // In a real app, you would save the user to a database
    MOCK_USERS.push(newUser)

    // Create user object without password
    const userWithoutPassword = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
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
    console.error("Sign up error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during sign up" }, { status: 500 })
  }
}

