"use client"

import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { CartSheet } from './CartSheet'
import { useAppSelector } from '@/store/hooks'

export function Header() {
  const favoritesCount = useAppSelector((state) => state.favorites.favorites.length)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BuyMate</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/favorites" 
              className="relative flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Heart className="h-6 w-6 text-red-500 fill-red-500 hover:text-red-600 hover:fill-red-600 transition-colors" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -left-3 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-background shadow-sm">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <CartSheet />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
