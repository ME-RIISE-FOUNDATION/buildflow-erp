// API Service Layer

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode: number
}

export interface ApiErrorResponse {
  error: string
  message: string
  statusCode: number
  details?: Record<string, any>
}

// API Base Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
const API_TIMEOUT = 30000 // 30 seconds

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      return token ? JSON.parse(token).accessToken : null
    }
    return null
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const token = this.getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  async request<T>(
    method: string,
    endpoint: string,
    options?: {
      body?: any
      params?: Record<string, any>
      headers?: Record<string, string>
    }
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      let url = `${this.baseURL}${endpoint}`

      if (options?.params) {
        const queryParams = new URLSearchParams(options.params)
        url += `?${queryParams.toString()}`
      }

      const response = await fetch(url, {
        method,
        headers: {
          ...this.getHeaders(),
          ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      })

      const data = await response.json()

      clearTimeout(timeoutId)

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
          message: data.message,
          statusCode: response.status,
        }
      }

      return {
        success: true,
        data: data.data || data,
        statusCode: response.status,
      }
    } catch (error: any) {
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timeout',
          statusCode: 408,
        }
      }

      return {
        success: false,
        error: error.message || 'Network error',
        statusCode: 500,
      }
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, { params })
  }

  async post<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { body, headers })
  }

  async put<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { body, headers })
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, { body, headers })
  }

  async delete<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, { params })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// ============================================================================
// PROJECTS API
// ============================================================================

export const projectsApi = {
  list: (params?: any) => apiClient.get('/projects', params),
  get: (id: string) => apiClient.get(`/projects/${id}`),
  create: (data: any) => apiClient.post('/projects', data),
  update: (id: string, data: any) => apiClient.put(`/projects/${id}`, data),
  delete: (id: string) => apiClient.delete(`/projects/${id}`),
  archive: (id: string) => apiClient.patch(`/projects/${id}/archive`, {}),
}

// ============================================================================
// CLIENTS API
// ============================================================================

export const clientsApi = {
  list: (params?: any) => apiClient.get('/clients', params),
  get: (id: string) => apiClient.get(`/clients/${id}`),
  create: (data: any) => apiClient.post('/clients', data),
  update: (id: string, data: any) => apiClient.put(`/clients/${id}`, data),
  delete: (id: string) => apiClient.delete(`/clients/${id}`),
  getProjects: (id: string) => apiClient.get(`/clients/${id}/projects`),
}

// ============================================================================
// MATERIALS API
// ============================================================================

export const materialsApi = {
  list: (params?: any) => apiClient.get('/materials', params),
  get: (id: string) => apiClient.get(`/materials/${id}`),
  create: (data: any) => apiClient.post('/materials', data),
  update: (id: string, data: any) => apiClient.put(`/materials/${id}`, data),
  delete: (id: string) => apiClient.delete(`/materials/${id}`),
}

// ============================================================================
// INVOICES API
// ============================================================================

export const invoicesApi = {
  list: (params?: any) => apiClient.get('/invoices', params),
  get: (id: string) => apiClient.get(`/invoices/${id}`),
  create: (data: any) => apiClient.post('/invoices', data),
  update: (id: string, data: any) => apiClient.put(`/invoices/${id}`, data),
  delete: (id: string) => apiClient.delete(`/invoices/${id}`),
  markAsPaid: (id: string) => apiClient.patch(`/invoices/${id}/mark-paid`, {}),
}

// ============================================================================
// EXPENSES API
// ============================================================================

export const expensesApi = {
  list: (params?: any) => apiClient.get('/expenses', params),
  get: (id: string) => apiClient.get(`/expenses/${id}`),
  create: (data: any) => apiClient.post('/expenses', data),
  update: (id: string, data: any) => apiClient.put(`/expenses/${id}`, data),
  delete: (id: string) => apiClient.delete(`/expenses/${id}`),
}

// ============================================================================
// LABOUR API
// ============================================================================

export const labourApi = {
  list: (params?: any) => apiClient.get('/labour', params),
  get: (id: string) => apiClient.get(`/labour/${id}`),
  create: (data: any) => apiClient.post('/labour', data),
  update: (id: string, data: any) => apiClient.put(`/labour/${id}`, data),
  delete: (id: string) => apiClient.delete(`/labour/${id}`),
}

// ============================================================================
// SUPPLIERS API
// ============================================================================

export const suppliersApi = {
  list: (params?: any) => apiClient.get('/suppliers', params),
  get: (id: string) => apiClient.get(`/suppliers/${id}`),
  create: (data: any) => apiClient.post('/suppliers', data),
  update: (id: string, data: any) => apiClient.put(`/suppliers/${id}`, data),
  delete: (id: string) => apiClient.delete(`/suppliers/${id}`),
}

// ============================================================================
// FILES API
// ============================================================================

export const filesApi = {
  list: (params?: any) => apiClient.get('/files', params),
  get: (id: string) => apiClient.get(`/files/${id}`),
  create: (data: any) => apiClient.post('/files', data),
  delete: (id: string) => apiClient.delete(`/files/${id}`),
  upload: (formData: FormData) =>
    fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: formData,
    }).then(r => r.json()),
}

// ============================================================================
// REPORTS API
// ============================================================================

export const reportsApi = {
  getProjectReport: (projectId: string) => apiClient.get(`/reports/projects/${projectId}`),
  getFinancialReport: (params?: any) => apiClient.get('/reports/financial', params),
  getMaterialReport: (params?: any) => apiClient.get('/reports/materials', params),
  getLabourReport: (params?: any) => apiClient.get('/reports/labour', params),
}

// ============================================================================
// AUTH API
// ============================================================================

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  logout: () => apiClient.post('/auth/logout', {}),
  refreshToken: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
  getCurrentUser: () => apiClient.get('/auth/me'),
}

// ============================================================================
// USERS API
// ============================================================================

export const usersApi = {
  list: (params?: any) => apiClient.get('/users', params),
  get: (id: string) => apiClient.get(`/users/${id}`),
  create: (data: any) => apiClient.post('/users', data),
  update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
  changeRole: (id: string, role: string) =>
    apiClient.patch(`/users/${id}/role`, { role }),
}
