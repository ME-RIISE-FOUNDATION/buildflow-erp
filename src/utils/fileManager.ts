// File Management Utilities

export type FileType = 'pdf' | 'excel' | 'word' | 'image' | 'video' | 'archive' | 'other'

export interface FileMetadata {
  id: string
  name: string
  fileName: string
  type: FileType
  size: number
  mimeType: string
  uploadedBy: string
  uploadedAt: string
  lastModified: string
  category: string
  projectId?: string
  description?: string
  tags?: string[]
  isPublic: boolean
  url?: string
  path?: string
}

export interface FileUploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'failed'
  error?: string
}

/**
 * Detect file type from mime type
 */
export const detectFileType = (mimeType: string): FileType => {
  if (mimeType.includes('pdf')) return 'pdf'
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'excel'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'word'
  if (mimeType.includes('image')) return 'image'
  if (mimeType.includes('video')) return 'video'
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('archive'))
    return 'archive'
  return 'other'
}

/**
 * Get file icon
 */
export const getFileIcon = (type: FileType): string => {
  const icons: Record<FileType, string> = {
    pdf: '📄',
    excel: '📊',
    word: '📝',
    image: '🖼️',
    video: '🎥',
    archive: '📦',
    other: '📎',
  }
  return icons[type]
}

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Validate file size
 */
export const isValidFileSize = (size: number, maxSizeInMB: number = 100): boolean => {
  return size <= maxSizeInMB * 1024 * 1024
}

/**
 * Allowed file types
 */
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/quicktime',
  'application/zip',
  'application/x-zip-compressed',
]

/**
 * Check if file type is allowed
 */
export const isAllowedFileType = (mimeType: string): boolean => {
  return ALLOWED_FILE_TYPES.includes(mimeType)
}

/**
 * Generate unique file ID
 */
export const generateFileId = (): string => {
  return `FILE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create file metadata
 */
export const createFileMetadata = (
  file: File,
  uploadedBy: string,
  category: string,
  options?: {
    projectId?: string
    description?: string
    tags?: string[]
    isPublic?: boolean
  }
): FileMetadata => {
  const now = new Date().toISOString()
  return {
    id: generateFileId(),
    name: file.name.replace(/\.[^/.]+$/, ''),
    fileName: file.name,
    type: detectFileType(file.type),
    size: file.size,
    mimeType: file.type,
    uploadedBy,
    uploadedAt: now,
    lastModified: now,
    category,
    projectId: options?.projectId,
    description: options?.description,
    tags: options?.tags || [],
    isPublic: options?.isPublic || false,
  }
}

/**
 * Filter files by type
 */
export const filterFilesByType = (files: FileMetadata[], type: FileType): FileMetadata[] => {
  return files.filter(file => file.type === type)
}

/**
 * Filter files by category
 */
export const filterFilesByCategory = (files: FileMetadata[], category: string): FileMetadata[] => {
  return files.filter(file => file.category === category)
}

/**
 * Filter files by project
 */
export const filterFilesByProject = (files: FileMetadata[], projectId: string): FileMetadata[] => {
  return files.filter(file => file.projectId === projectId)
}

/**
 * Search files
 */
export const searchFiles = (files: FileMetadata[], query: string): FileMetadata[] => {
  const lowerQuery = query.toLowerCase()
  return files.filter(
    file =>
      file.name.toLowerCase().includes(lowerQuery) ||
      file.fileName.toLowerCase().includes(lowerQuery) ||
      file.description?.toLowerCase().includes(lowerQuery) ||
      file.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Sort files
 */
export const sortFiles = (
  files: FileMetadata[],
  sortBy: 'name' | 'date' | 'size' | 'type' = 'date',
  order: 'asc' | 'desc' = 'desc'
): FileMetadata[] => {
  const sorted = [...files].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'date':
        comparison =
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        break
      case 'size':
        comparison = b.size - a.size
        break
      case 'type':
        comparison = a.type.localeCompare(b.type)
        break
    }

    return order === 'asc' ? comparison : -comparison
  })

  return sorted
}

/**
 * Get file statistics
 */
export const getFileStatistics = (files: FileMetadata[]) => {
  return {
    totalFiles: files.length,
    totalSize: files.reduce((sum, file) => sum + file.size, 0),
    filesByType: Object.fromEntries(
      Array.from(new Set(files.map(f => f.type))).map(type => [
        type,
        files.filter(f => f.type === type).length,
      ])
    ),
    filesByCategory: Object.fromEntries(
      Array.from(new Set(files.map(f => f.category))).map(category => [
        category,
        files.filter(f => f.category === category).length,
      ])
    ),
  }
}

/**
 * Validate file
 */
export const validateFile = (
  file: File,
  options?: {
    maxSizeInMB?: number
    allowedTypes?: string[]
  }
): { valid: boolean; error?: string } => {
  if (!isValidFileSize(file.size, options?.maxSizeInMB || 100)) {
    return {
      valid: false,
      error: `File size exceeds ${options?.maxSizeInMB || 100}MB limit`,
    }
  }

  if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not allowed' }
  }

  return { valid: true }
}
