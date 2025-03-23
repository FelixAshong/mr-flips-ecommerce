"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, User, Menu, X, Phone, MapPin, LogOut, Package } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/hooks/use-cart"
import { useAuth } from "@/lib/hooks/use-auth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items } = useCart()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = () => {
    signOut()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background transition-all duration-300 shadow-sm">
      {/* Top Bar with Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>+233 20 123 4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Accra, Ghana</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/shipping" className="hover:underline transition-all duration-300 hover:text-white">
              Shipping
            </Link>
            <Link href="/faq" className="hover:underline transition-all duration-300 hover:text-white">
              FAQs
            </Link>
            <Link href="/contact" className="hover:underline transition-all duration-300 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-secondary text-secondary-foreground text-center py-2 px-4 text-sm relative">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Sign up and get 20% off to your first order.
          <Link href="/signup" className="font-medium underline ml-1 hover:text-primary transition-colors duration-300">
            Sign Up Now
          </Link>
        </motion.div>
        <button
          className="absolute right-2 top-2 text-secondary-foreground hover:text-primary transition-colors duration-300"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className={`container mx-auto px-4 flex h-16 items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16"}`}
      >
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className="hover:bg-primary/10 transition-all duration-300"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="px-2 py-6">
                <Link href="/" className="flex items-center mb-6" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="/images/phleo-logo.png"
                    alt="PHLEO DELLY Logo"
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </Link>
                <div className="space-y-4">
                  <Link
                    href="/products"
                    className="block py-2 hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/products?category=men"
                    className="block py-2 hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Men
                  </Link>
                  <Link
                    href="/products?category=women"
                    className="block py-2 hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Women
                  </Link>
                  <Link
                    href="/products?category=sports"
                    className="block py-2 hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sports
                  </Link>
                  <Link
                    href="/products?category=footwear"
                    className="block py-2 hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Footwear
                  </Link>
                  <Link
                    href="/products?category=slides"
                    className="block py-2 hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Slides
                  </Link>
                  <Link
                    href="/products?category=packaging"
                    className="block py-2 hover:text-primary transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package className="h-4 w-4 inline mr-2" />
                    Gift Packaging
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="ml-4 md:ml-0 flex items-center">
            <Image
              src="/images/phleo-logo.png"
              alt="PHLEO DELLY Logo"
              width={120}
              height={60}
              className="object-contain"
            />
          </Link>

          <nav className="hidden md:flex ml-10 space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/products?category=men"
              className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            >
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/products?category=women"
              className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            >
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/products?category=sports"
              className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            >
              Sports
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/products?category=footwear"
              className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            >
              Footwear
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/products?category=slides"
              className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            >
              Slides
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/products?category=packaging"
              className="text-sm font-medium hover:text-primary transition-all duration-300 relative group"
            >
              Gift Packaging
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Account"
                  className="hover:bg-primary/10 transition-all duration-300 hover:scale-105 relative"
                >
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/seller">Seller Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/signin">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account"
                className="hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="hover:bg-primary/10 transition-all duration-300 hover:scale-105 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center"
                >
                  {items.length}
                </motion.span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t py-3 px-4 bg-background"
          >
            <div className="container mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="w-full pl-10 pr-10 focus-visible:ring-primary shadow-sm"
                  placeholder="Search for products..."
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

