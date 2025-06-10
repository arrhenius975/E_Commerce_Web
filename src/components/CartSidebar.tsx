
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useAppContext } from '@/contexts/AppContext';
import { X, Minus, Plus } from 'lucide-react';

export function CartSidebar() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateCartQuantity, clearCart } = useAppContext();
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState<string>('today-pm');

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliverySlots = [
    { id: 'today-pm', label: 'Today, 12 PM - 2 PM' },
    { id: 'tomorrow-am', label: 'Tomorrow, 10 AM - 12 PM' },
    { id: 'tomorrow-pm', label: 'Tomorrow, 2 PM - 4 PM' },
  ];

  const handleCheckout = () => {
    const selectedSlotDetails = deliverySlots.find(slot => slot.id === selectedDeliverySlot);
    alert(`Proceeding to Checkout!\nSelected Delivery: ${selectedSlotDetails?.label || 'Not selected'}\nTotal: $${totalAmount.toFixed(2)}`);
    clearCart();
    toggleCart();
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="pr-6">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <SheetClose asChild>
              <Button variant="link" className="mt-4">Continue Shopping</Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-6">
              <div className="space-y-4 py-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                      <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="h-7 w-12 p-1 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="my-4 pr-6">
              <h4 className="mb-2 text-sm font-medium">Delivery Options</h4>
              <RadioGroup value={selectedDeliverySlot} onValueChange={setSelectedDeliverySlot} className="space-y-1">
                {deliverySlots.map(slot => (
                  <div key={slot.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={slot.id} id={slot.id} />
                    <Label htmlFor={slot.id} className="text-sm font-normal">{slot.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator className="my-4" />
            <SheetFooter className="pr-6">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
                 <Button variant="outline" size="sm" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
