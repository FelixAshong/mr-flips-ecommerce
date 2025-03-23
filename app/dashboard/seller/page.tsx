"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/hooks/use-auth"
import { Loader2, Plus, Upload, Package, ShoppingBag, BarChart3 } from "lucide-react"

export default function SellerDashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    colors: "",
    sizes: "",
    images: [] as File[],
  })

  useEffect(() => {
    // Check if user is authenticated and has seller role
    if (!isLoading && !isAuthenticated) {
      router.push("/signin?callbackUrl=/dashboard/seller")
      return
    }

    if (user && user.role !== "seller" && user.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You need a seller account to access this page",
        variant: "destructive",
      })
      router.push("/dashboard")
      return
    }

    // Fetch seller's products
    const fetchProducts = async () => {
      try {
        // In a real app, this would fetch from your API
        setProducts([
          {
            id: 1,
            name: "Sample Product 1",
            price: 120,
            category: "t-shirts",
            status: "active",
            inventory: 25,
            sales: 12,
          },
          {
            id: 2,
            name: "Sample Product 2",
            price: 85,
            category: "accessories",
            status: "active",
            inventory: 18,
            sales: 7,
          },
        ])
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    // Fetch seller's orders
    const fetchOrders = async () => {
      try {
        // In a real app, this would fetch from your API
        setOrders([
          {
            id: "ORD-12345",
            date: "2023-12-15",
            customer: "John Doe",
            total: "$245.99",
            status: "Delivered",
            items: 3,
          },
          {
            id: "ORD-12346",
            date: "2023-12-20",
            customer: "Jane Smith",
            total: "$129.50",
            status: "Processing",
            items: 2,
          },
        ])
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchProducts()
    fetchOrders()
  }, [isAuthenticated, isLoading, router, toast, user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewProduct((prev) => ({ ...prev, images: Array.from(e.target.files || []) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would upload to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Product Added",
        description: "Your product has been successfully added to the store",
      })

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        colors: "",
        sizes: "",
        images: [],
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="add-product">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245.89</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">-2 from last week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your store's recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium">New Order Received</p>
                  <p className="text-sm text-muted-foreground">Order #ORD-12346 from Jane Smith</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">Product Stock Low</p>
                  <p className="text-sm text-muted-foreground">Sample Product 1 has only 5 items left</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="font-medium">Payment Received</p>
                  <p className="text-sm text-muted-foreground">$245.99 for Order #ORD-12345</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </div>
              <Button onClick={() => document.querySelector('[data-value="add-product"]')?.click()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-4 font-medium">
                  <div className="col-span-2">Product</div>
                  <div>Category</div>
                  <div>Price</div>
                  <div>Inventory</div>
                  <div>Actions</div>
                </div>
                {products.map((product: any) => (
                  <div key={product.id} className="grid grid-cols-6 p-4 border-t items-center">
                    <div className="col-span-2 font-medium">{product.name}</div>
                    <div>{product.category}</div>
                    <div>${product.price}</div>
                    <div>{product.inventory} in stock</div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    No products found. Add your first product to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage your customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-4 font-medium">
                  <div>Order ID</div>
                  <div>Date</div>
                  <div>Customer</div>
                  <div>Total</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                {orders.map((order: any) => (
                  <div key={order.id} className="grid grid-cols-6 p-4 border-t items-center">
                    <div className="font-medium">{order.id}</div>
                    <div>{order.date}</div>
                    <div>{order.customer}</div>
                    <div>{order.total}</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <div className="p-4 text-center text-muted-foreground">No orders found.</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-product" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Add a new product to your store</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={newProduct.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="shirts">Shirts</SelectItem>
                        <SelectItem value="pants">Pants</SelectItem>
                        <SelectItem value="shorts">Shorts</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="slides">Slides</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="packaging">Gift Packaging</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colors">Colors (comma separated)</Label>
                    <Input
                      id="colors"
                      name="colors"
                      placeholder="red, blue, green"
                      value={newProduct.colors}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sizes">Sizes (comma separated)</Label>
                    <Input
                      id="sizes"
                      name="sizes"
                      placeholder="s, m, l, xl"
                      value={newProduct.sizes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Product Images</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your images here, or click to browse
                    </p>
                    <Input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("images")?.click()}>
                      Select Images
                    </Button>
                    {newProduct.images.length > 0 && (
                      <p className="mt-2 text-sm">
                        {newProduct.images.length} {newProduct.images.length === 1 ? "file" : "files"} selected
                      </p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

