import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'Super Admin',
        role: 'super_admin',
        company: 'BuildFlow',
        createdAt: new Date(),
      }
      set({ user: mockUser, isAuthenticated: true })
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true })
  },
}))
