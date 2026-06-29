import React, { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Zap, Fuel, TrendingUp, AlertCircle, Settings, User, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const [fuelData] = useState([
    { name: 'Mon', value: 450 },
    { name: 'Tue', value: 520 },
    { name: 'Wed', value: 380 },
    { name: 'Thu', value: 620 },
    { name: 'Fri', value: 700 },
    { name: 'Sat', value: 550 },
    { name: 'Sun', value: 480 },
  ])

  const [evData] = useState([
    { name: 'Mon', charge: 320 },
    { name: 'Tue', charge: 450 },
    { name: 'Wed', charge: 380 },
    { name: 'Thu', charge: 520 },
    { name: 'Fri', charge: 680 },
    { name: 'Sat', charge: 420 },
    { name: 'Sun', charge: 350 },
  ])

  const [distribution] = useState([
    { name: 'Fuel', value: 65 },
    { name: 'EV', value: 35 },
  ])

  const COLORS = ['#f59e0b', '#10b981']

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">PowerFlex Pay</h1>
            <p className="text-neutral-600">Fuel & EV Management Ghana</p>
          </div>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition">
              <Bell className="w-6 h-6 text-neutral-700" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition">
              <Settings className="w-6 h-6 text-neutral-700" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition">
              <User className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Fuel, label: 'Total Fuel Consumed', value: '3,680 L', color: '#f59e0b' },
            { icon: Zap, label: 'EV Charge Sessions', value: '2,450 kWh', color: '#10b981' },
            { icon: TrendingUp, label: 'Cost Saved', value: '₱12,450', color: '#8b5cf6' },
            { icon: AlertCircle, label: 'Active Alerts', value: '2', color: '#ef4444' },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm mb-2">{item.label}</p>
                  <p className="text-2xl font-bold text-neutral-900">{item.value}</p>
                </div>
                <item.icon className="w-10 h-10" style={{ color: item.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Fuel Consumption Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Weekly Fuel Consumption</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Fuel vs EV Usage</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={distribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }} />
                <span>Fuel (65%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }} />
                <span>EV (35%)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* EV Charging Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Weekly EV Charging Sessions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="charge" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
