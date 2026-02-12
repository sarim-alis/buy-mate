"use client"

import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './index'
import { initializeTheme } from './slices/themeSlice'
import { initializeFavorites } from './slices/favoritesSlice'
import { initializeCart } from './slices/cartSlice'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      store.dispatch(initializeTheme())
      store.dispatch(initializeFavorites())
      store.dispatch(initializeCart())
      initialized.current = true
    }
  }, [])

  return <Provider store={store}>{children}</Provider>
}
