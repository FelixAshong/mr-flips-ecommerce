"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "customer" | "seller" | "admin"
}

interface SignUpData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage for user data
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          // If we have stored user data, use it immediately
          setUser(JSON.parse(storedUser))

          // Then verify with the server in the background
          try {
            const response = await fetch("/api/auth/session")

            if (response.ok) {
              const data = await response.json()
              if (data.user) {
                setUser(data.user)
                localStorage.setItem("user", JSON.stringify(data.user))
              } else {
                // If server returns no user, clear local storage
                localStorage.removeItem("user")
                setUser(null)
              }
            } else {
              // If server verification fails, keep using local storage data
              console.warn("Session verification failed, using local data")
            }
          } catch (error) {
            // If there's an error (like API not implemented yet), keep using local storage data
            console.warn("Error verifying session, using local data:", error)
          }
        } else {
          // Try to get session from server if no local storage
          try {
            const response = await fetch("/api/auth/session")

            if (response.ok) {
              const data = await response.json()
              if (data.user) {
                setUser(data.user)
                localStorage.setItem("user", JSON.stringify(data.user))
              }
            }
          } catch (error) {
            // If API is not implemented yet, just continue with null user
            console.warn("Error fetching session:", error)
          }
        }
      } catch (error) {
        console.error("Failed to restore auth state:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to sign in")
      }

      const data = await response.json()

      if (data.user) {
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
      } else {
        throw new Error("No user data returned")
      }

      return
    } catch (error) {
      console.error("Sign in error:", error)
      toast({
        title: "Sign in failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (data: SignUpData) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to sign up")
      }

      const responseData = await response.json()

      if (responseData.user) {
        setUser(responseData.user)
        localStorage.setItem("user", JSON.stringify(responseData.user))
      } else {
        throw new Error("No user data returned")
      }
    } catch (error) {
      console.error("Sign up error:", error)
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      // Try to call the signout API, but don't wait for it
      fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        console.warn("Error during sign out API call:", error)
      })
    } finally {
      // Always clear local state regardless of API success
      setUser(null)
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

