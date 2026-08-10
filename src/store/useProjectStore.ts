import { create } from 'zustand'

export interface Material {
  id: number
  name: string
  quantity: number
  used: number
  unit: string
  cost: number
  supplier: string
  purchaseDate: string
}

export interface Expense {
  id: number
  category: string
  amount: number
  date: string
  description: string
}

export interface Project {
  id: number
  name: string
  client_name: string
  client_email?: string
  client_phone?: string
  owner: string
  ownerPhone: string
  address: string
  length: number
  width: number
  area: number
  status: 'completed' | 'running' | 'upcoming'
  progress: number
  budget: number
  expenses: number
  materialCost: number
  labourCost: number
  materials: Material[]
  expenseDetails: Expense[]
  startDate?: string
  endDate?: string
  description?: string
}

interface ProjectStore {
  projects: Project[]
  selectedProjectId: number | null
  setSelectedProjectId: (id: number | null) => void
  addProject: (project: Project) => void
  updateProject: (id: number, updates: Partial<Project>) => void
  deleteProject: (id: number) => void
  addMaterial: (projectId: number, material: Material) => void
  deleteMaterial: (projectId: number, materialId: number) => void
  addExpense: (projectId: number, expense: Expense) => void
  deleteExpense: (projectId: number, expenseId: number) => void
  getProjectById: (id: number) => Project | undefined
  loadFromStorage: () => void
}

const defaultProjects: Project[] = []

const STORAGE_KEY = 'buildflow_projects'

const saveToStorage = (projects: Project[], selectedId: number | null) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ projects, selectedProjectId: selectedId })
      )
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }
}

const loadFromStorage = (): { projects: Project[]; selectedProjectId: number | null } => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
  }
  return { projects: defaultProjects, selectedProjectId: 1 }
}

export const useProjectStore = create<ProjectStore>((set, get) => {
  const initial = loadFromStorage()

  return {
    projects: initial.projects,
    selectedProjectId: initial.selectedProjectId,

    loadFromStorage: () => {
      const data = loadFromStorage()
      set({ projects: data.projects, selectedProjectId: data.selectedProjectId })
    },

    setSelectedProjectId: (id: number | null) => {
      set(state => {
        saveToStorage(state.projects, id)
        return { selectedProjectId: id }
      })
    },

    addProject: (project: Project) => {
      set(state => {
        const newState = { projects: [...state.projects, project], selectedProjectId: project.id }
        saveToStorage(newState.projects, newState.selectedProjectId)
        return newState
      })
    },

    updateProject: (id: number, updates: Partial<Project>) => {
      set(state => {
        const newProjects = state.projects.map(p => (p.id === id ? { ...p, ...updates } : p))
        saveToStorage(newProjects, state.selectedProjectId)
        return { projects: newProjects }
      })
    },

    deleteProject: (id: number) => {
      set(state => {
        const newProjects = state.projects.filter(p => p.id !== id)
        const newSelectedId = state.selectedProjectId === id ? null : state.selectedProjectId
        saveToStorage(newProjects, newSelectedId)
        return { projects: newProjects, selectedProjectId: newSelectedId }
      })
    },

    addMaterial: (projectId: number, material: Material) => {
      set(state => {
        const newProjects = state.projects.map(p =>
          p.id === projectId
            ? {
                ...p,
                materials: [...p.materials, material],
                materialCost: p.materialCost + material.cost,
              }
            : p
        )
        saveToStorage(newProjects, state.selectedProjectId)
        return { projects: newProjects }
      })
    },

    deleteMaterial: (projectId: number, materialId: number) => {
      set(state => {
        const newProjects = state.projects.map(p => {
          if (p.id === projectId) {
            const material = p.materials.find(m => m.id === materialId)
            return {
              ...p,
              materials: p.materials.filter(m => m.id !== materialId),
              materialCost: material ? p.materialCost - material.cost : p.materialCost,
            }
          }
          return p
        })
        saveToStorage(newProjects, state.selectedProjectId)
        return { projects: newProjects }
      })
    },

    addExpense: (projectId: number, expense: Expense) => {
      set(state => {
        const newProjects = state.projects.map(p =>
          p.id === projectId
            ? {
                ...p,
                expenseDetails: [...(p.expenseDetails || []), expense],
              }
            : p
        )
        saveToStorage(newProjects, state.selectedProjectId)
        return { projects: newProjects }
      })
    },

    deleteExpense: (projectId: number, expenseId: number) => {
      set(state => {
        const newProjects = state.projects.map(p =>
          p.id === projectId
            ? {
                ...p,
                expenseDetails: (p.expenseDetails || []).filter(e => e.id !== expenseId),
              }
            : p
        )
        saveToStorage(newProjects, state.selectedProjectId)
        return { projects: newProjects }
      })
    },

    getProjectById: (id: number) => {
      return get().projects.find(p => p.id === id)
    },
  }
})
