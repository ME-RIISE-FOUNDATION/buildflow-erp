# BuildFlow ERP - Architecture Documentation

## 🏗️ System Architecture

### Frontend Architecture (Next.js 14)
```
┌─────────────────────────────────────────────────┐
│              Browser/Client                       │
├─────────────────────────────────────────────────┤
│         Next.js 14 (App Router)                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Pages / Layouts                        │   │
│  │  ├── Dashboard                          │   │
│  │  ├── Projects                           │   │
│  │  ├── Clients                            │   │
│  │  └── ...modules                         │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Components                             │   │
│  │  ├── Dashboard Components               │   │
│  │  ├── 3D Components                      │   │
│  │  └── Shared Components                  │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  State Management (Zustand)             │   │
│  │  ├── Auth Store                         │   │
│  │  ├── UI Store                           │   │
│  │  └── Data Store                         │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Libraries                              │   │
│  │  ├── Framer Motion (Animations)         │   │
│  │  ├── Three.js (3D)                      │   │
│  │  ├── ApexCharts (Data Viz)              │   │
│  │  └── React Hook Form                    │   │
│  └─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────┐   │
│  │  Styling                                │   │
│  │  ├── Tailwind CSS                       │   │
│  │  ├── Global CSS                         │   │
│  │  └── Component Styles                   │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│              HTTP/REST API                       │
├─────────────────────────────────────────────────┤
│           Backend (Laravel PHP)                  │
└─────────────────────────────────────────────────┘
```

## 📁 Directory Structure

### `/src/app` - Next.js App Router
Contains all page routes and layouts:
- `page.tsx` - Login page
- `dashboard/` - Dashboard module
- `projects/` - Projects module
- `clients/` - Clients module
- `materials/` - Materials management
- `finance/` - Finance module
- `estimation/` - Construction estimation
- `purchase/` - Purchase management
- `reports/` - Reports module
- `calendar/` - Calendar module
- `settings/` - Settings module
- `layout.tsx` - Root layout with metadata

### `/src/components` - Reusable Components
```
components/
├── dashboard/           # Dashboard-specific components
│   ├── DashboardCharts.tsx
│   ├── StatCard.tsx
│   └── RecentActivities.tsx
└── 3d/                 # 3D animation components
    └── LoginAnimation.tsx
```

### `/src/layouts` - Page Layouts
- `DashboardLayout.tsx` - Main dashboard layout with sidebar and top nav

### `/src/store` - State Management (Zustand)
- `useAuthStore.ts` - Authentication state and actions

### `/src/types` - TypeScript Types
- `index.ts` - All application type definitions
  - User, Project, Client, Material
  - Floor, Expense, Estimation
  - DashboardStats, Activity

### `/src/utils` - Utility Functions
- `cn.ts` - Class name utility for Tailwind
- Future: API client, formatters, validators

### `/src/styles` - Global Styles
- `globals.css` - Global styles, animations, utility classes

## 🔄 Data Flow

### Authentication Flow
```
User Input → Form Validation → Auth Action → Zustand Store → Redirect to Dashboard
```

### Dashboard Data Flow
```
Dashboard Page → Request Data → API Call → Parse Response → Update Store → Render Components
```

### Component Communication
```
Parent Component → Props Drilling / Context
Component ↔ Zustand Store ↔ API Layer
```

## 🎨 Design System

### Color System
```typescript
colors: {
  primary: '#2563eb',      // Main accent color
  secondary: '#0f172a',    // Background/dark
  accent: '#06b6d4',       // Cyan accent
  success: '#22c55e',      // Green
  warning: '#f59e0b',      // Amber
  danger: '#ef4444',       // Red
}
```

### Component Library
- **Button Variants**: `btn-primary`, `btn-secondary`, `btn-accent`, `btn-ghost`
- **Card**: `.card` - Glass morphism effect
- **Glass**: `.glass` - Frosted glass effect
- **Animations**: Framer Motion + GSAP

## 🔌 API Integration

### Axios Client (To be implemented)
```typescript
// src/lib/apiClient.ts
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default client
```

### API Endpoints
```
Base: http://localhost:8000/api

Authentication:
- POST   /auth/login
- POST   /auth/logout
- GET    /auth/user

Projects:
- GET    /projects
- POST   /projects
- GET    /projects/:id
- PUT    /projects/:id
- DELETE /projects/:id

Clients:
- GET    /clients
- POST   /clients
- GET    /clients/:id
- PUT    /clients/:id

Materials:
- GET    /materials
- POST   /materials
- GET    /materials/:id

Finance:
- GET    /finance/summary
- GET    /finance/expenses
- POST   /finance/expense

... more endpoints
```

## 🧩 State Management (Zustand)

### Store Structure
```typescript
// src/store/useAuthStore.ts
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}
```

## 🔐 Authentication Strategy

### Current Implementation
- Single Super Admin login
- Email/password validation
- Zustand for state persistence
- localStorage for session (to be added)

### Future Implementation
- JWT token-based authentication
- Refresh token rotation
- Secure httpOnly cookies
- Role-based access control (RBAC)

## 🎬 Animation Strategy

### Framer Motion
- Page transitions
- Component entrance/exit animations
- Hover effects
- Loading states

### Three.js / React Three Fiber
- 3D building models
- Interactive 3D scenes
- Animated backgrounds
- Real-time 3D rendering

### GSAP
- Timeline animations
- Complex sequences
- DOM manipulations
- Performance-optimized animations

## 📱 Responsive Design Strategy

### Breakpoints
```typescript
const breakpoints = {
  mobile: '0px',      // < 768px
  tablet: '768px',    // 768px - 1024px
  desktop: '1024px',  // 1024px - 1440px
  wide: '1440px',     // > 1440px
}
```

### Mobile-First Approach
- Base styles for mobile
- `md:` prefix for tablet and up
- `lg:` prefix for desktop and up
- `xl:` prefix for wide screens

## 🚀 Performance Optimization

### Code Splitting
- Route-based code splitting (Next.js automatic)
- Component lazy loading with dynamic imports
- Tree-shaking of unused code

### Image Optimization
- Next.js Image component
- Automatic format selection
- Responsive image sizing

### Animation Performance
- GPU-accelerated transforms
- Efficient keyframe animations
- Debounced scroll events

## 🔄 CI/CD Pipeline (To be set up)

```
GitHub Push → Workflow Trigger
├── Code Quality Checks
│   ├── Linting
│   ├── Type Checking
│   └── Format Check
├── Build
│   ├── Next.js Build
│   └── Production Optimization
├── Testing
│   ├── Unit Tests
│   ├── Integration Tests
│   └── E2E Tests
└── Deploy
    ├── Docker Build
    ├── Registry Push
    └── Production Deployment
```

## 🗄️ Database Schema (Laravel Backend)

### Key Tables
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255),
  role ENUM('super_admin'),
  created_at TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  client_id UUID,
  status ENUM('upcoming', 'running', 'completed', 'delayed'),
  budget DECIMAL(15, 2),
  spent DECIMAL(15, 2),
  progress INT,
  created_at TIMESTAMP
);

-- Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP
);

-- Materials
CREATE TABLE materials (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(100),
  quantity INT,
  unit_price DECIMAL(10, 2),
  status ENUM('in_stock', 'low_stock', 'out_of_stock'),
  created_at TIMESTAMP
);

-- Additional tables: floors, expenses, estimations, etc.
```

## 🛡️ Security Measures

### Frontend Security
- Input validation with Zod
- CSRF protection (via Next.js)
- XSS prevention with React
- Secure headers configuration

### Authentication
- HTTPS/TLS for transport
- JWT token validation
- Secure token storage
- Token expiration and rotation

### Data Protection
- SQL injection prevention (via Eloquent ORM)
- CORS configuration
- Rate limiting
- Input sanitization

## 📊 Monitoring & Analytics

### Application Monitoring
- Error tracking
- Performance monitoring
- User analytics
- API response times

### Logging
- Application logs
- Error logs
- Audit logs
- API request/response logs

## 🔄 Deployment Strategy

### Development
```bash
npm run dev
```

### Staging
```bash
docker-compose up --build
```

### Production
```bash
docker build -t buildflow-erp:latest .
docker run -p 3000:3000 buildflow-erp:latest
```

## 📚 Future Enhancements

- [ ] Real-time notifications (Socket.io)
- [ ] Advanced reporting engine
- [ ] AI-powered cost prediction
- [ ] Mobile app (React Native)
- [ ] Blockchain for contract management
- [ ] Integration with third-party APIs
- [ ] Advanced analytics dashboard
- [ ] Workflow automation
- [ ] Document management system
- [ ] Video conferencing integration

## 🎯 Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/module-name
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Testing**
   ```bash
   npm run type-check
   npm run lint
   ```

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: description"
   git push origin feature/module-name
   ```

5. **Pull Request**
   - Create PR on GitHub
   - Code review
   - Merge to main

6. **Deployment**
   - Automated deployment via CI/CD

---

**BuildFlow ERP - Enterprise Construction Management System**
