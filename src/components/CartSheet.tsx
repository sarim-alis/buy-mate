"use client"

import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import Image from 'next/image'
import toast from 'react-hot-toast'

export function CartSheet() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <ShoppingCart className="h-24 w-24 text-muted-foreground/30" />
                <p className="text-muted-foreground">No items in cart</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                          onClick={() => {
                            dispatch(removeFromCart(item.id))
                            toast.success(`${item.title} removed from cart`)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <SheetFooter className="border-t pt-4 mt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white" onClick={() => {
                    dispatch(clearCart())
                    toast.success('Cart cleared')
                  }}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
