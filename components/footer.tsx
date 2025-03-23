"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/images/phleo-logo.png"
                alt="PHLEO DELLY Logo"
                width={150}
                height={75}
                className="object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Ghana's premier fashion destination with clothes that suit your style and which you're proud to wear. From
              traditional to modern, we've got you covered.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://twitter.com/phleodelly"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://facebook.com/phleodelly"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com/phleodelly"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://youtube.com/phleodelly"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Our Stores
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">HELP</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-4">CONTACT US</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>123 Oxford Street, Osu, Accra, Ghana</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>+233 20 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>info@phleodelly.com.gh</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Store Hours</h4>
              <p className="text-sm text-muted-foreground">Monday - Saturday: 9am - 8pm</p>
              <p className="text-sm text-muted-foreground">Sunday: 11am - 6pm</p>
            </div>
          </motion.div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PHLEO DELLY. All Rights Reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img
              src="https://v0.blob.com/Tz9Iy.jpeg"
              alt="MTN Mobile Money"
              className="h-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
            />
            <img
              src="https://v0.blob.com/Tz9Iy.jpeg"
              alt="Vodafone Cash"
              className="h-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
            />
            <img
              src="https://v0.blob.com/Tz9Iy.jpeg"
              alt="Visa"
              className="h-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
            />
            <img
              src="https://v0.blob.com/Tz9Iy.jpeg"
              alt="Mastercard"
              className="h-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
            />
            <img
              src="https://v0.blob.com/Tz9Iy.jpeg"
              alt="PayPal"
              className="h-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

