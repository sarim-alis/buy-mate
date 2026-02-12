import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoritesState } from '@/types/product'

const initialState: FavoritesState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const index = state.favorites.indexOf(productId)
      
      if (index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(productId)
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      }
    },
    initializeFavorites: (state) => {
      if (typeof window !== 'undefined') {
        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
          state.favorites = JSON.parse(savedFavorites)
        }
      }
    },
  },
})

export const { toggleFavorite, initializeFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
