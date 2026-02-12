import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}

const initialState: ThemeState = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload)
        document.documentElement.classList.toggle('dark', action.payload === 'dark')
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      state.theme = newTheme
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme) {
          state.theme = savedTheme
          document.documentElement.classList.toggle('dark', savedTheme === 'dark')
        } else {
          state.theme = 'light'
          document.documentElement.classList.remove('dark')
        }
      }
    },
  },
})

export const { setTheme, toggleTheme, initializeTheme } = themeSlice.actions
export default themeSlice.reducer
