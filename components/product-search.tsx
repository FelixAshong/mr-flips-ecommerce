"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ProductSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsSearching(true)
    router.push(`/products?q=${encodeURIComponent(query.trim())}`)
  }

  useEffect(() => {
    // Reset searching state after navigation
    return () => setIsSearching(false)
  }, [])

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        className="w-full pl-10 pr-10 focus-visible:ring-primary"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isSearching}
      />
      {query && (
        <button
          type="button"
          className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground"
          onClick={() => setQuery("")}
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {isSearching ? (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />
      ) : (
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          disabled={!query.trim()}
        >
          <Search className="h-4 w-4" />
        </Button>
      )}
    </form>
  )
}

