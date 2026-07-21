# BuildFlow ERP - Setup & Installation Guide

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Setup
```bash
cp .env.example .env.local
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser

**Login with any credentials** (demo mode is enabled)

---

## 📦 Installation Commands

### Using NPM
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Using Yarn
```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Using PNPM
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 🔧 Configuration

### Environment Variables
Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=BuildFlow ERP
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
```

### Tailwind CSS
Configuration is pre-configured in `tailwind.config.ts`. Customize colors and theme in this file.

### Next.js Configuration
See `next.config.js` for Next.js specific settings.

---

## 📁 Project Structure Overview

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Login page
│   ├── layout.tsx      # Root layout with metadata
│   └── [module]/       # Feature modules
│       └── page.tsx
├── components/          # Reusable React components
│   ├── dashboard/      # Dashboard specific components
│   └── 3d/            # 3D animation components
├── layouts/            # Page layouts
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── styles/            # Global CSS and Tailwind
```

---

## 🎨 Design System

### Using Custom Components

#### Button
```tsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-accent">Accent Button</button>
<button className="btn-ghost">Ghost Button</button>
```

#### Card
```tsx
<div className="card">
  {/* Card content */}
</div>
```

#### Glass Morphism
```tsx
<div className="glass rounded-lg p-6">
  {/* Content with glass effect */}
</div>
```

#### Animation
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Animated content
</motion.div>
```

---

## 📊 Available Pages

| Module | Route | Status |
|--------|-------|--------|
| Login | `/` | ✅ Complete |
| Dashboard | `/dashboard` | ✅ Complete |
| Projects | `/projects` | ✅ Complete |
| Clients | `/clients` | ✅ Complete |
| Materials | `/materials` | ✅ Complete |
| Finance | `/finance` | ✅ Complete |
| Estimation | `/estimation` | ✅ Complete |
| Purchase | `/purchase` | 🔄 Stub |
| Reports | `/reports` | ✅ Complete |
| Calendar | `/calendar` | 🔄 Stub |
| Settings | `/settings` | ✅ Complete |

---

## 🛠️ Key Libraries & Versions

- **Next.js**: 14.0.0+
- **React**: 18.2.0+
- **TypeScript**: 5.0.0+
- **Tailwind CSS**: 3.3.0+
- **Framer Motion**: 10.16.0+
- **Three.js**: r156+
- **ApexCharts**: 3.45.0+

---

## 🔐 Authentication Flow

1. User visits login page (/)
2. Enters email and password
3. Authentication (currently accepts any credentials)
4. Redirects to dashboard
5. Zustand store maintains user session

---

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1440px
- Large Desktop: > 1440px

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t buildflow-erp .
docker run -p 3000:3000 buildflow-erp
```

### Standalone
```bash
npm run build
npm start
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port
npm run dev -- -p 3001
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Build Errors
```bash
# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📖 Documentation

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Three.js Documentation](https://threejs.org/docs)

---

## ✨ Next Steps

1. ✅ Frontend setup complete
2. 🔄 Backend API integration
3. 🔄 Database schema setup
4. 🔄 Authentication with JWT
5. 🔄 Real data integration

---

## 💡 Tips

- Use Tailwind CSS classes for styling
- Use Framer Motion for animations
- Use Zustand for state management
- Keep components small and reusable
- Follow the existing component patterns

---

## 📞 Support

For issues or questions:
- Check existing documentation
- Review component examples
- Run type checking with `npm run type-check`

---

**BuildFlow ERP - Premium Construction Management System**
