import { Separator } from "@/components/ui/separator"

export function OrderSummary() {
  return (
    <div className="rounded-lg border p-6 space-y-6">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md bg-gray-100"></div>
            <div>
              <p className="font-medium">Gradient Graphic T-shirt</p>
              <p className="text-sm text-muted-foreground">Size: Large, Color: White</p>
            </div>
          </div>
          <p className="font-medium">$145</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md bg-gray-100"></div>
            <div>
              <p className="font-medium">Checkered Shirt</p>
              <p className="text-sm text-muted-foreground">Size: Medium, Color: Red</p>
            </div>
          </div>
          <p className="font-medium">$180</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-md bg-gray-100"></div>
            <div>
              <p className="font-medium">Skinny Fit Jeans</p>
              <p className="text-sm text-muted-foreground">Size: Large, Color: Blue</p>
            </div>
          </div>
          <p className="font-medium">$240</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>$565</span>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Discount (-20%)</span>
          <span>-$113</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span>$15</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>$46.70</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>$513.70</span>
      </div>
    </div>
  )
}

