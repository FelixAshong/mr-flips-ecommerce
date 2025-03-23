import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Get the session cookie
    const sessionCookie = cookies().get("session")

    // If no session cookie exists, return null user
    if (!sessionCookie) {
      return NextResponse.json({ user: null })
    }

    // In a real app, you would verify the session token with your database
    // For demo purposes, we'll just parse the cookie value
    try {
      const sessionData = JSON.parse(sessionCookie.value)

      // Return the user data
      return NextResponse.json({
        user: {
          id: sessionData.id,
          firstName: sessionData.firstName,
          lastName: sessionData.lastName,
          email: sessionData.email,
          phone: sessionData.phone,
          role: sessionData.role || "customer",
        },
      })
    } catch (error) {
      // If the cookie is invalid, clear it and return null user
      cookies().delete("session")
      return NextResponse.json({ user: null })
    }
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json({ user: null })
  }
}

