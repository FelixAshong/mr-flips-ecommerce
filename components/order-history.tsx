import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function OrderHistory() {
  // Sample orders - in a real app, these would come from your database
  const orders = [
    {
      id: "ORD-12345",
      date: "March 15, 2023",
      total: "$245.99",
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-12346",
      date: "April 2, 2023",
      total: "$129.50",
      status: "Shipped",
      items: 2,
    },
    {
      id: "ORD-12347",
      date: "May 10, 2023",
      total: "$513.70",
      status: "Processing",
      items: 4,
    },
  ]

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </div>
                <Badge
                  variant={
                    order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                  }
                >
                  {order.status}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <p className="text-sm">{order.items} items</p>
                  <p className="font-medium">{order.total}</p>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/orders/${order.id}`}>View Order</Link>
                  </Button>
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      Buy Again
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

