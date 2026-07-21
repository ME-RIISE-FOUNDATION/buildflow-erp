# BuildFlow ERP - Premium Construction Management System

A complete enterprise-grade Construction ERP (Enterprise Resource Planning) system with premium UI/UX, 3D animations, and comprehensive project management capabilities.

## 🏗️ Features

### Core Modules
- **Dashboard** - Real-time project overview with KPIs and analytics
- **Projects** - Complete project lifecycle management
- **Clients** - Client relationship management
- **Construction Estimation** - Automatic cost and BOQ calculation
- **Material Management** - Inventory and stock tracking
- **Purchase Management** - Purchase orders and supplier management
- **Finance & Accounting** - Income, expenses, and profit tracking
- **Reports** - Comprehensive daily, weekly, and monthly reports
- **Calendar** - Events, meetings, and deadline tracking
- **Settings** - System configuration and preferences

### Design Features
✨ Glassmorphism UI with frosted glass effects
✨ Smooth page transitions with Framer Motion
✨ 3D animations with React Three Fiber
✨ Interactive charts with ApexCharts
✨ Premium typography and spacing
✨ Dark/Light mode support
✨ Fully responsive design
✨ Micro-interactions and hover effects
✨ Beautiful gradient backgrounds
✨ Soft shadows and glow effects

### Technology Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion, GSAP
- **Charts**: ApexCharts
- **State Management**: Zustand
- **Forms**: React Hook Form, Zod
- **Database**: MySQL (via Laravel API)
- **Backend**: Laravel 11 (PHP 8.3)
- **Deployment**: Docker

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd buildflow-erp
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Login Credentials
- **Email**: Any email address
- **Password**: Any password
- (Demo mode accepts any credentials)

## 📁 Project Structure

```
buildflow-erp/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Login page
│   │   ├── dashboard/         # Dashboard module
│   │   ├── projects/          # Projects module
│   │   ├── clients/           # Clients module
│   │   ├── materials/         # Materials module
│   │   ├── finance/           # Finance module
│   │   ├── estimation/        # Estimation module
│   │   ├── purchase/          # Purchase module
│   │   ├── reports/           # Reports module
│   │   ├── calendar/          # Calendar module
│   │   ├── settings/          # Settings module
│   │   └── layout.tsx         # Root layout
│   ├── components/             # React components
│   │   ├── dashboard/         # Dashboard components
│   │   └── 3d/               # 3D animation components
│   ├── layouts/               # Page layouts
│   │   └── DashboardLayout.tsx
│   ├── store/                 # Zustand stores
│   │   └── useAuthStore.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   └── cn.ts
│   └── styles/                # Global styles
│       └── globals.css
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Secondary**: #0f172a (Dark Blue)
- **Accent**: #06b6d4 (Cyan)
- **Success**: #22c55e (Green)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)

### Design Patterns
- Glassmorphism for cards and containers
- Gradient text for emphasis
- Glow effects for interactive elements
- Soft shadows for depth
- Smooth transitions for all interactions
- Micro-animations for user feedback

## 🔐 Authentication

Currently supports single Super Admin login. The application uses:
- Zustand for state management
- JWT tokens for authentication (to be implemented with backend)
- LocalStorage for session persistence

## 📊 Dashboard Features

- Real-time KPI tracking
- Project performance analytics
- Financial summaries
- Expense breakdown charts
- Recent activities timeline
- Quick statistics overview

## 🛠️ Development

### Build for Production
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📱 Responsive Design

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1440px and up

## 🚀 Performance Optimizations

- Image optimization with Next.js Image
- Code splitting and lazy loading
- CSS-in-JS optimization
- Efficient re-rendering with React
- Optimized animations with Framer Motion

## 📝 API Integration

The frontend is configured to communicate with a Laravel REST API. Update the API endpoints in your service layer:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
```

## 🤝 Contributing

Contributions are welcome! Please follow the established code style and patterns.

## 📄 License

This project is proprietary and confidential.

## 👤 Author

BuildFlow Team

## 📞 Support

For support, contact: support@buildflow.com

---

**BuildFlow ERP** - Premium Construction Management System
