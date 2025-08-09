import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Calendar, 
  Home, 
  Mic, 
  BarChart3, 
  Settings,
  Zap,
  User
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Draft Week', href: '/draft-week', icon: Calendar },
  { name: 'Brand Voice', href: '/brand-voice', icon: Mic },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function AppShell({ children, variant = 'default' }) {
  const location = useLocation()
  
  const shellClasses = variant === 'glass' 
    ? 'bg-bg/80 backdrop-blur-xl border border-border/50'
    : 'bg-bg'

  return (
    <div className={`min-h-screen ${shellClasses}`}>
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-text-primary">WeekFlow</h1>
              </div>
              <span className="text-sm text-text-muted bg-surface-light px-2 py-1 rounded-md">
                Pro Plan
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="btn btn-primary">
                Generate Week
              </button>
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-text-secondary" />
                <span className="text-sm text-text-secondary">Demo User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-surface border-r border-border min-h-screen">
          <div className="p-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}