# 🚀 Quick Start Guide - Enterprise Construction Management Dashboard

## Installation & Setup

### Step 1: Files Already Created ✅
```
✓ Type Definitions    → src/types/construction.ts
✓ Utilities           → src/utils/construction.ts
✓ KPI Cards           → src/components/dashboard/EnterpriseKPICards.tsx
✓ Project Card        → src/components/account-tracker/ProjectCard.tsx
✓ Data Table          → src/components/account-tracker/DataTable.tsx
✓ Activity Timeline   → src/components/account-tracker/ActivityTimeline.tsx
✓ Enhanced Dashboard  → src/app/account-tracker/enhanced.tsx
```

### Step 2: Access the Dashboard
```bash
# Original Account Tracker (Preserved)
http://localhost:3001/account-tracker

# Enhanced Dashboard (New)
http://localhost:3001/account-tracker/enhanced
```

### Step 3: Start Using Features

#### 📊 View KPI Metrics
- See 10 comprehensive KPI cards
- Monitor business health
- Track trends and growth

#### 🏗️ Manage Projects
- Add new projects
- Track progress
- Monitor budget vs actual
- View project cards

#### 📦 Track Materials
- Search inventory
- Sort by columns
- Paginate through results
- Track costs and suppliers

#### 📄 Create Invoices
- Quick invoice creation
- Track invoice status
- Monitor payments

#### 📈 Monitor Activities
- Real-time activity feed
- Date-grouped timeline
- Amount tracking

---

## Common Tasks

### Add a Project
```
1. Click "Add Project" button
2. Enter project name, client, budget
3. Click "Create Project"
4. See success notification
5. Project appears in Projects tab
```

### Create an Invoice
```
1. Go to Invoices tab
2. Click "Create Invoice"
3. Enter invoice number and amount
4. Click "Create Invoice"
5. Invoice appears in list
```

### Search & Filter
```
1. Go to any tab with data
2. Use search box to find items
3. Click column headers to sort
4. Use pagination to browse
```

### View Activities
```
1. Go to Overview tab
2. Check "Recent Activities" section
3. See real-time feed
4. Monitor transactions
```

---

## Customization Guide

### Change Theme Colors
Edit `tailwind.config.ts` or update color values in components.

### Update Sample Data
Edit the `kpiData`, `projects`, `materials`, and `activities` objects in `enhanced.tsx`.

### Add New Columns to Table
Update `columns` array in DataTable usage:
```tsx
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'amount', label: 'Amount', render: (v) => formatCurrency(v) },
  ]}
  data={data}
/>
```

### Create New Modal
Copy existing modal pattern and customize form fields.

### Add Custom Animations
Use Framer Motion with these examples:
```tsx
// Hover animation
whileHover={{ scale: 1.05 }}

// Tap animation
whileTap={{ scale: 0.95 }}

// Entry animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

---

## API Integration (Next Steps)

### Connect to Backend
```tsx
// Replace sample data with API calls
const { data: kpis } = await fetch('/api/kpis').then(r => r.json())
const { data: projects } = await fetch('/api/projects').then(r => r.json())
```

### API Endpoints Needed
```
GET  /api/kpis              - Get KPI metrics
GET  /api/projects          - List all projects
POST /api/projects          - Create project
GET  /api/materials         - List materials
POST /api/invoices          - Create invoice
GET  /api/activities        - Get activity feed
```

### Authentication Setup
```tsx
// Add auth headers to requests
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## Component Usage Examples

### Using EnterpriseKPICards
```tsx
import EnterpriseKPICards from '@/components/dashboard/EnterpriseKPICards'

<EnterpriseKPICards kpis={kpiData} />
```

### Using ProjectCard
```tsx
import ProjectCard from '@/components/account-tracker/ProjectCard'

<ProjectCard
  project={project}
  onEdit={(p) => console.log('Edit', p)}
  onArchive={(id) => console.log('Archive', id)}
/>
```

### Using DataTable
```tsx
import DataTable from '@/components/account-tracker/DataTable'

<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'amount', label: 'Amount' }
  ]}
  data={data}
  pageSize={10}
  searchable={true}
/>
```

### Using ActivityTimeline
```tsx
import ActivityTimeline from '@/components/account-tracker/ActivityTimeline'

<ActivityTimeline activities={activities} limit={10} />
```

---

## Utility Functions Reference

### Currency Formatting
```tsx
import { formatCurrency, formatCurrencyShort } from '@/utils/construction'

formatCurrency(1250000)      // ₹12,50,000
formatCurrencyShort(1250000) // ₹12.5L
```

### Status Helpers
```tsx
import { getStatusColor, getStatusBadgeColor } from '@/utils/construction'

getStatusColor('Completed')     // Returns CSS class
getStatusBadgeColor('In Progress') // Returns color object
```

### Calculations
```tsx
import { 
  calculateProjectHealth,
  calculateBusinessHealth,
  calculateBudgetUtilization 
} from '@/utils/construction'

calculateProjectHealth(progress, budgetUsage)
calculateBusinessHealth(kpis)
calculateBudgetUtilization(expense, budget)
```

### Date Helpers
```tsx
import { formatDate, calculateDaysRemaining } from '@/utils/construction'

formatDate('2026-07-31')           // 31 Jul 2026
calculateDaysRemaining('2026-12-31') // Days left
```

---

## Testing Checklist

- [ ] All KPI cards display correctly
- [ ] Projects tab shows project cards
- [ ] Materials tab shows data table with pagination
- [ ] Invoices tab functional
- [ ] Add Project modal works
- [ ] Create Invoice modal works
- [ ] Activities timeline displays
- [ ] Search functionality works
- [ ] Sort by column works
- [ ] Pagination works
- [ ] Success notifications appear
- [ ] Responsive on mobile/tablet
- [ ] No console errors

---

## Troubleshooting

### Issue: Modals not opening
**Solution**: Check `activeModal` state and click handlers

### Issue: Data not displaying
**Solution**: Verify sample data in component or check API response

### Issue: Styles not applying
**Solution**: Ensure Tailwind CSS is properly configured

### Issue: Animations not smooth
**Solution**: Check browser performance, reduce animation complexity

---

## Performance Tips

1. Use lazy loading for components
2. Optimize chart rendering with `ssr: false`
3. Memoize expensive calculations
4. Paginate large datasets
5. Use proper TypeScript types to catch errors early

---

## Next Phase: File Management

Ready to implement:
- File upload system
- Document organization
- PDF preview
- File search
- Download management

---

## Support Resources

- **Documentation**: `ACCOUNT_TRACKER_UPGRADE.md`
- **Types**: `src/types/construction.ts`
- **Utilities**: `src/utils/construction.ts`
- **Components**: `src/components/account-tracker/`
- **Dashboard**: `src/app/account-tracker/`

---

**Status**: ✅ Ready for Production
**Last Updated**: July 31, 2026
**Version**: 2.0 Enterprise Edition
