"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function AddressBook() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Sample addresses - in a real app, these would come from your database
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      name: "Work",
      street: "456 Park Ave",
      city: "New York",
      state: "NY",
      zip: "10022",
      country: "United States",
      isDefault: false,
    },
  ])

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prev) => ({ ...prev, isDefault: e.target.checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Add the new address
    const newId = Math.max(...addresses.map((a) => a.id)) + 1

    // If this is set as default, update other addresses
    let updatedAddresses = [...addresses]
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((address) => ({
        ...address,
        isDefault: false,
      }))
    }

    setAddresses([
      ...updatedAddresses,
      {
        ...newAddress,
        id: newId,
      },
    ])

    // Reset form and close dialog
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isDefault: false,
    })

    setIsDialogOpen(false)

    toast({
      title: "Address added",
      description: "Your new address has been added successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Addresses</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Address Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Home, Work, etc."
                  value={newAddress.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" name="street" value={newAddress.street} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={newAddress.city} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" name="state" value={newAddress.state} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" name="zip" value={newAddress.zip} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={newAddress.country} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isDefault">Set as default address</Label>
              </div>
              <Button type="submit" className="w-full">
                Add Address
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{address.name}</span>
                {address.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              {!address.isDefault && (
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

