'use client'

import React from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function DashboardCharts() {
  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    colors: ['#2563eb', '#06b6d4'],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.1)',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
    },
  }

  const series = []

  const barChartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    colors: ['#22c55e', '#f59e0b', '#ef4444'],
    xaxis: {
      categories: ['Material', 'Labour', 'Equipment'],
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
        },
      },
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.1)',
    },
    tooltip: {
      theme: 'dark',
    },
  }

  const barSeries = []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 card"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Project Performance</h2>
          <p className="text-secondary-400 text-sm">Monthly project completion and progress</p>
        </div>
        <Chart options={chartOptions} series={series} type="area" height={300} />
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Project Status</h2>
          <p className="text-secondary-400 text-sm">Distribution of projects</p>
        </div>
        <Chart
          options={{
            chart: {
              type: 'donut',
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            colors: ['#22c55e', '#f59e0b', '#ef4444', '#06b6d4'],
            labels: ['Completed', 'Running', 'Delayed', 'Upcoming'],
            legend: {
              labels: {
                colors: '#94a3b8',
              },
              position: 'bottom',
            },
            tooltip: {
              theme: 'dark',
            },
          }}
          series={[]}
          type="donut"
          height={250}
        />
      </motion.div>

      {/* Expenses Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2 card"
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Expense Breakdown</h2>
          <p className="text-secondary-400 text-sm">Cost distribution by category</p>
        </div>
        <Chart options={barChartOptions} series={barSeries} type="bar" height={300} />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card"
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>

          <div className="space-y-3">
            <p className="text-secondary-400 text-sm">No data available</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
