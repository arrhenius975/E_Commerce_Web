
// src/app/account/orders/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Receipt, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  'data-ai-hint': string;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  items: OrderItem[];
}

// Mock Data - In a real app, this would come from an API
const mockOrders: Order[] = [
  {
    id: 'ORD746298',
    date: '2024-03-08',
    status: 'Delivered',
    totalAmount: 85.97,
    items: [
      { id: 'g-m1', name: 'Chicken Breast', quantity: 2, price: 7.99, image: 'https://placehold.co/80x80.png', 'data-ai-hint': 'chicken' },
      { id: 'g-v3', name: 'Deshi Gajor (Carrots)', quantity: 1, price: 1.99, image: 'https://placehold.co/80x80.png', 'data-ai-hint': 'carrots' },
      { id: 'c-s1', name: 'Hydrating Face Cream', quantity: 1, price: 24.99, image: 'https://placehold.co/80x80.png', 'data-ai-hint': 'cream' },
    ],
  },
  {
    id: 'ORD364710',
    date: '2024-02-25',
    status: 'Shipped',
    totalAmount: 33.48,
    items: [
      { id: 'ff-b1', name: 'Classic Cheeseburger', quantity: 2, price: 8.99, image: 'https://placehold.co/80x80.png', 'data-ai-hint': 'burger' },
      { id: 'ff-d1', name: 'Cola Classic', quantity: 2, price: 2.50, image: 'https://placehold.co/80x80.png', 'data-ai-hint': 'cola' },
    ],
  },
   {
    id: 'ORD102937',
    date: '2024-01-15',
    status: 'Cancelled',
    totalAmount: 18.00,
    items: [
      { id: 'c-m1', name: 'Velvet Matte Lipstick', quantity: 1, price: 18.00, image: 'https://placehold.co/80x80.png', 'data-ai-hint': 'lipstick' },
    ],
  },
];

const getStatusBadgeVariant = (status: Order['status']) => {
  switch (status) {
    case 'Delivered': return 'default'; // Using primary color for "good" status
    case 'Shipped': return 'secondary';
    case 'Processing': return 'outline'; // Needs a more distinct "processing" visual
    case 'Cancelled': return 'destructive';
    default: return 'outline';
  }
};


export default function OrderHistoryPage() {
  const router = useRouter();
  // In a real app, fetch orders for the logged-in user
  const orders = mockOrders;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-headline text-3xl font-bold text-primary">Order History</h1>
        </div>
         <Button variant="outline" asChild>
            <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" /> Need Help?
            </Link>
        </Button>
      </header>

      {orders.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">No Orders Yet</CardTitle>
            <CardDescription>You haven't placed any orders. Start shopping to see your history here!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link href="/sections">Explore Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 dark:bg-muted/20 p-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                        <p className="text-sm text-muted-foreground">Placed on: {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)} className="text-sm px-3 py-1">{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md border overflow-hidden bg-white">
                         <Image src={item.image} alt={item.name} layout="fill" objectFit="contain" data-ai-hint={item['data-ai-hint']}/>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity} &bull; Price: ${item.price.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4 md:my-6" />
                <div className="flex justify-end items-center">
                  <p className="text-lg font-semibold">Total: ${order.totalAmount.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 dark:bg-muted/20 p-4 border-t flex flex-col sm:flex-row justify-end items-center gap-2">
                <Button variant="outline" size="sm">
                    <Receipt className="mr-2 h-4 w-4" /> View Invoice
                </Button>
                <Button variant="outline" size="sm">
                    <Package className="mr-2 h-4 w-4" /> Track Package
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground text-center mt-12">
        This is a demonstration of an order history page. Backend integration is needed for real data.
      </p>
    </div>
  );
}
