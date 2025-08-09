import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Calendar, 
  Home, 
  Mic, 
  BarChart3, 
  Settings,
  Zap,
  User,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const shellClasses = variant === 'glass' 
    ? 'bg-bg/80 backdrop-blur-xl border border-border/50'
    : 'bg-bg'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className={`min-h-screen ${shellClasses}`}>
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden btn btn-ghost p-2"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">WeekFlow</h1>
              </div>
              <span className="hidden sm:inline text-sm text-text-muted bg-surface-light px-2 py-1 rounded-md">
                Pro Plan
              </span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="btn btn-primary btn-sm sm:btn text-sm sm:text-base">
                <span className="hidden sm:inline">Generate Week</span>
                <span className="sm:hidden">Generate</span>
              </button>
              <div className="hidden sm:flex items-center space-x-2">
                <User className="h-6 w-6 text-text-secondary" />
                <span className="text-sm text-text-secondary">Demo User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Sidebar */}
        <nav className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border
          transform transition-transform duration-200 ease-in-out lg:transform-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 sm:p-6 pt-20 lg:pt-6">
            <ul className="space-y-1 sm:space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
