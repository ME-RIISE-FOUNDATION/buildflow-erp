// Export & Report Utilities

export interface ExportOptions {
  filename: string
  type: 'pdf' | 'excel' | 'csv'
  data: any[]
  columns: string[]
}

/**
 * Generate CSV content from data
 */
export const generateCSV = (data: any[], columns: string[]): string => {
  const headers = columns.join(',')
  const rows = data.map(item =>
    columns.map(col => {
      const value = item[col]
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`
      }
      return value
    }).join(',')
  )
  return [headers, ...rows].join('\n')
}

/**
 * Export data to CSV file
 */
export const exportToCSV = (filename: string, data: any[], columns: string[]): void => {
  const csv = generateCSV(data, columns)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.csv`
  link.click()
  window.URL.revokeObjectURL(url)
}

/**
 * Export data to Excel (simple format)
 */
export const exportToExcel = (filename: string, data: any[], columns: string[]): void => {
  let html = '<table><thead><tr>'

  // Headers
  columns.forEach(col => {
    html += `<th>${col}</th>`
  })
  html += '</tr></thead><tbody>'

  // Data rows
  data.forEach(item => {
    html += '<tr>'
    columns.forEach(col => {
      html += `<td>${item[col] || ''}</td>`
    })
    html += '</tr>'
  })
  html += '</tbody></table>'

  const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.xls`
  link.click()
  window.URL.revokeObjectURL(url)
}

/**
 * Print data in table format
 */
export const printData = (filename: string, data: any[], columns: string[]): void => {
  let html = `<html><head><title>${filename}</title></head><body>`
  html += '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">'

  // Headers
  html += '<thead><tr>'
  columns.forEach(col => {
    html += `<th style="background-color: #f0f0f0; padding: 10px; text-align: left;">${col}</th>`
  })
  html += '</tr></thead>'

  // Data rows
  html += '<tbody>'
  data.forEach((item, idx) => {
    html += '<tr>'
    columns.forEach(col => {
      html += `<td style="padding: 10px; border: 1px solid #ddd;">${item[col] || ''}</td>`
    })
    html += '</tr>'
  })
  html += '</tbody></table></body></html>'

  const printWindow = window.open('', '', 'width=900,height=600')
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }
}

/**
 * Generate PDF report (requires external library in production)
 */
export const generatePDFReport = (
  title: string,
  sections: { heading: string; content: string }[]
): void => {
  let html = `<html><head><title>${title}</title></head><body>`
  html += `<h1 style="text-align: center; color: #333;">${title}</h1>`
  html += `<p style="text-align: center; color: #666; font-size: 12px;">Generated on ${new Date().toLocaleDateString()}</p>`

  sections.forEach(section => {
    html += `<h2 style="color: #333; border-bottom: 2px solid #3B82F6; padding-bottom: 5px;">${section.heading}</h2>`
    html += `<p style="color: #666; line-height: 1.6;">${section.content}</p>`
  })

  html += '</body></html>'

  const printWindow = window.open('', '', 'width=900,height=600')
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }
}

/**
 * Generate project report
 */
export const generateProjectReport = (project: any): string => {
  const report = `
PROJECT REPORT
==============
Project Name: ${project.name}
Client: ${project.client}
Status: ${project.status}
Progress: ${project.progress}%

FINANCIAL SUMMARY
================
Budget: ₹${project.budget.toLocaleString('en-IN')}
Expense: ₹${project.expense.toLocaleString('en-IN')}
Revenue: ₹${project.revenue.toLocaleString('en-IN')}
Profit: ₹${(project.revenue - project.expense).toLocaleString('en-IN')}
Budget Utilization: ${((project.expense / project.budget) * 100).toFixed(2)}%

TIMELINE
========
Start Date: ${new Date(project.startDate).toLocaleDateString('en-IN')}
End Date: ${new Date(project.endDate).toLocaleDateString('en-IN')}
Duration: ${Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} days

Generated on: ${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN')}
`
  return report
}

/**
 * Generate financial report
 */
export const generateFinancialReport = (data: any): string => {
  const report = `
FINANCIAL REPORT
================
Report Period: ${new Date().toLocaleDateString('en-IN')}

INCOME
======
Total Revenue: ₹${data.totalRevenue?.toLocaleString('en-IN') || '0'}
Monthly Revenue: ₹${data.monthlyRevenue?.toLocaleString('en-IN') || '0'}

EXPENSES
========
Total Expenses: ₹${data.totalExpense?.toLocaleString('en-IN') || '0'}
Monthly Expenses: ₹${data.monthlyExpense?.toLocaleString('en-IN') || '0'}

SUMMARY
=======
Total Paid: ₹${data.totalPaid?.toLocaleString('en-IN') || '0'}
Outstanding: ₹${data.outstandingBalance?.toLocaleString('en-IN') || '0'}
Profit/Loss: ₹${data.profitLoss?.toLocaleString('en-IN') || '0'}
Profit Margin: ${data.profitMargin?.toFixed(2) || '0'}%

Generated on: ${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN')}
`
  return report
}

/**
 * Download file
 */
export const downloadFile = (filename: string, content: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(url)
}

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Share report
 */
export const shareReport = (title: string, content: string): void => {
  if (navigator.share) {
    navigator.share({
      title: title,
      text: content,
    }).catch(err => console.log('Error sharing:', err))
  } else {
    // Fallback: copy to clipboard
    copyToClipboard(content)
  }
}
