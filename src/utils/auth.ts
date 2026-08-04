// Authentication & Authorization Utilities

export type UserRole = 'super_admin' | 'admin' | 'project_manager' | 'accountant' | 'site_engineer' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  department?: string
  avatar?: string
  isActive: boolean
  createdAt: string
  lastLogin?: string
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

export interface AuthContext {
  user: User | null
  token: AuthToken | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Role Permissions Matrix
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: [
    'manage_users',
    'manage_roles',
    'manage_projects',
    'manage_clients',
    'manage_materials',
    'manage_suppliers',
    'manage_labour',
    'view_reports',
    'manage_settings',
    'view_audit_logs',
    'export_data',
    'delete_projects',
    'manage_payments',
  ],
  admin: [
    'manage_projects',
    'manage_clients',
    'manage_materials',
    'manage_suppliers',
    'manage_labour',
    'view_reports',
    'manage_settings',
    'view_audit_logs',
    'export_data',
    'manage_payments',
  ],
  project_manager: [
    'manage_projects',
    'view_clients',
    'manage_materials',
    'view_suppliers',
    'manage_labour',
    'view_reports',
    'export_data',
  ],
  accountant: [
    'view_projects',
    'view_clients',
    'manage_payments',
    'view_suppliers',
    'view_reports',
    'export_data',
  ],
  site_engineer: [
    'view_projects',
    'manage_materials',
    'manage_labour',
    'upload_files',
    'view_reports',
  ],
  viewer: ['view_projects', 'view_reports'],
}

/**
 * Check if user has permission
 */
export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false
}

/**
 * Check if user has all permissions
 */
export const hasAllPermissions = (userRole: UserRole, permissions: string[]): boolean => {
  return permissions.every(permission => hasPermission(userRole, permission))
}

/**
 * Check if user has any permission
 */
export const hasAnyPermission = (userRole: UserRole, permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(userRole, permission))
}

/**
 * Get role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    super_admin: 'Super Administrator',
    admin: 'Administrator',
    project_manager: 'Project Manager',
    accountant: 'Accountant',
    site_engineer: 'Site Engineer',
    viewer: 'Viewer',
  }
  return roleNames[role]
}

/**
 * Get role color
 */
export const getRoleColor = (role: UserRole): string => {
  const roleColors: Record<UserRole, string> = {
    super_admin: 'from-red-600 to-red-400',
    admin: 'from-purple-600 to-purple-400',
    project_manager: 'from-blue-600 to-blue-400',
    accountant: 'from-green-600 to-green-400',
    site_engineer: 'from-orange-600 to-orange-400',
    viewer: 'from-gray-600 to-gray-400',
  }
  return roleColors[role]
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Hash password (client-side - should use proper hashing on server)
 */
export const hashPassword = (password: string): string => {
  // This is a placeholder - use bcrypt or similar on the server
  return btoa(password)
}

/**
 * Generate token expiry time
 */
export const getTokenExpiry = (hours: number = 24): Date => {
  const expiry = new Date()
  expiry.setHours(expiry.getHours() + hours)
  return expiry
}

/**
 * Check if token is expired
 */
export const isTokenExpired = (expiresIn: number): boolean => {
  return new Date().getTime() > expiresIn
}

/**
 * Store auth token in localStorage
 */
export const storeAuthToken = (token: AuthToken): void => {
  localStorage.setItem('authToken', JSON.stringify(token))
}

/**
 * Retrieve auth token from localStorage
 */
export const getStoredAuthToken = (): AuthToken | null => {
  const token = localStorage.getItem('authToken')
  return token ? JSON.parse(token) : null
}

/**
 * Clear auth token from localStorage
 */
export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken')
}

/**
 * Store user in localStorage
 */
export const storeUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

/**
 * Retrieve user from localStorage
 */
export const getStoredUser = (): User | null => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

/**
 * Clear user from localStorage
 */
export const clearStoredUser = (): void => {
  localStorage.removeItem('user')
}

/**
 * Logout user (clear all auth data)
 */
export const logout = (): void => {
  clearAuthToken()
  clearStoredUser()
}
