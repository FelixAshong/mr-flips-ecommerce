"use client"

import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"

export function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get initial values from URL
  const initialCategory = searchParams.get("category") || ""
  const initialMinPrice = Number(searchParams.get("minPrice") || "0")
  const initialMaxPrice = Number(searchParams.get("maxPrice") || "1000")
  const initialColors = searchParams.get("colors")?.split(",") || []
  const initialSizes = searchParams.get("sizes")?.split(",") || []
  const initialStyles = searchParams.get("styles")?.split(",") || []

  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice])
  const [selectedColors, setSelectedColors] = useState<string[]>(initialColors)
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialSizes)
  const [selectedStyles, setSelectedStyles] = useState<string[]>(initialStyles)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Update category
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0])
    } else {
      params.delete("category")
    }

    // Update price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Update colors
    if (selectedColors.length > 0) {
      params.set("colors", selectedColors.join(","))
    } else {
      params.delete("colors")
    }

    // Update sizes
    if (selectedSizes.length > 0) {
      params.set("sizes", selectedSizes.join(","))
    } else {
      params.delete("sizes")
    }

    // Update styles
    if (selectedStyles.length > 0) {
      params.set("styles", selectedStyles.join(","))
    } else {
      params.delete("styles")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedStyles([])

    router.push(pathname)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleResetFilters}>
          <SlidersHorizontal className="mr-2 h-3 w-3" />
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "colors", "size", "style"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="t-shirts"
                  checked={selectedCategories.includes("t-shirts")}
                  onCheckedChange={() => handleCategoryToggle("t-shirts")}
                />
                <Label htmlFor="t-shirts" className="text-sm font-normal">
                  T-shirts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shorts"
                  checked={selectedCategories.includes("shorts")}
                  onCheckedChange={() => handleCategoryToggle("shorts")}
                />
                <Label htmlFor="shorts" className="text-sm font-normal">
                  Shorts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shirts"
                  checked={selectedCategories.includes("shirts")}
                  onCheckedChange={() => handleCategoryToggle("shirts")}
                />
                <Label htmlFor="shirts" className="text-sm font-normal">
                  Shirts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="traditional"
                  checked={selectedCategories.includes("traditional")}
                  onCheckedChange={() => handleCategoryToggle("traditional")}
                />
                <Label htmlFor="traditional" className="text-sm font-normal">
                  Traditional
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accessories"
                  checked={selectedCategories.includes("accessories")}
                  onCheckedChange={() => handleCategoryToggle("accessories")}
                />
                <Label htmlFor="accessories" className="text-sm font-normal">
                  Accessories
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} max={1000} min={0} step={10} onValueChange={setPriceRange} className="mt-6" />
              <div className="flex items-center justify-between">
                <span className="text-sm">₵{priceRange[0].toLocaleString()}</span>
                <span className="text-sm">₵{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm font-medium">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-5 gap-2">
              <div
                className={`h-6 w-6 rounded-full bg-green-500 cursor-pointer ${selectedColors.includes("green") ? "ring-2 ring-offset-2 ring-green-500" : ""}`}
                onClick={() => handleColorToggle("green")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-red-500 cursor-pointer ${selectedColors.includes("red") ? "ring-2 ring-offset-2 ring-red-500" : ""}`}
                onClick={() => handleColorToggle("red")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-yellow-500 cursor-pointer ${selectedColors.includes("yellow") ? "ring-2 ring-offset-2 ring-yellow-500" : ""}`}
                onClick={() => handleColorToggle("yellow")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-orange-500 cursor-pointer ${selectedColors.includes("orange") ? "ring-2 ring-offset-2 ring-orange-500" : ""}`}
                onClick={() => handleColorToggle("orange")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-blue-500 cursor-pointer ${selectedColors.includes("blue") ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                onClick={() => handleColorToggle("blue")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-blue-700 cursor-pointer ${selectedColors.includes("navy") ? "ring-2 ring-offset-2 ring-blue-700" : ""}`}
                onClick={() => handleColorToggle("navy")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-purple-500 cursor-pointer ${selectedColors.includes("purple") ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}
                onClick={() => handleColorToggle("purple")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-pink-500 cursor-pointer ${selectedColors.includes("pink") ? "ring-2 ring-offset-2 ring-pink-500" : ""}`}
                onClick={() => handleColorToggle("pink")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-white cursor-pointer border ${selectedColors.includes("white") ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                onClick={() => handleColorToggle("white")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-black cursor-pointer ${selectedColors.includes("black") ? "ring-2 ring-offset-2 ring-black" : ""}`}
                onClick={() => handleColorToggle("black")}
              ></div>
              <div
                className={`h-6 w-6 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 cursor-pointer ${selectedColors.includes("multicolor") ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}
                onClick={() => handleColorToggle("multicolor")}
              ></div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-medium">Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("xs") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("xs")}
              >
                XX-Small
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("s") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("s")}
              >
                X-Small
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("s") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("s")}
              >
                Small
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("m") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("m")}
              >
                Medium
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("l") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("l")}
              >
                Large
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("xl") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("xl")}
              >
                X-Large
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("xxl") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("xxl")}
              >
                XX-Large
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("3xl") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("3xl")}
              >
                3X-Large
              </div>
              <div
                className={`flex h-8 items-center justify-center rounded-md border text-xs cursor-pointer hover:border-foreground transition-colors ${selectedSizes.includes("one-size") ? "border-2 border-foreground" : ""}`}
                onClick={() => handleSizeToggle("one-size")}
              >
                One Size
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="style">
          <AccordionTrigger className="text-sm font-medium">Dress Style</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="casual"
                  checked={selectedStyles.includes("casual")}
                  onCheckedChange={() => handleStyleToggle("casual")}
                />
                <Label htmlFor="casual" className="text-sm font-normal">
                  Casual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="formal"
                  checked={selectedStyles.includes("formal")}
                  onCheckedChange={() => handleStyleToggle("formal")}
                />
                <Label htmlFor="formal" className="text-sm font-normal">
                  Formal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="traditional"
                  checked={selectedStyles.includes("traditional")}
                  onCheckedChange={() => handleStyleToggle("traditional")}
                />
                <Label htmlFor="traditional" className="text-sm font-normal">
                  Traditional
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={selectedStyles.includes("active")}
                  onCheckedChange={() => handleStyleToggle("active")}
                />
                <Label htmlFor="active" className="text-sm font-normal">
                  Active Wear
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full hover-lift" onClick={handleApplyFilters}>
        Apply Filter
      </Button>
    </div>
  )
}

