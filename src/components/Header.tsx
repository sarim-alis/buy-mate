"use client"

import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useAppSelector } from '@/store/hooks'

export function Header() {
  const favoritesCount = useAppSelector((state) => state.favorites.favorites.length)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ShopHub</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="relative flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
