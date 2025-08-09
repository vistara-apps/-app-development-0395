import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppShell from './components/layout/AppShell'

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const DraftWeek = React.lazy(() => import('./pages/DraftWeek'))
const BrandVoice = React.lazy(() => import('./pages/BrandVoice'))
const Analytics = React.lazy(() => import('./pages/Analytics'))
const Settings = React.lazy(() => import('./pages/Settings'))

// Loading component for better UX during code splitting
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]" role="status" aria-label="Loading page">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        <span className="text-text-secondary">Loading...</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppShell>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/draft-week" element={<DraftWeek />} />
            <Route path="/brand-voice" element={<BrandVoice />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </AppShell>
    </AppProvider>
  )
}

export default App
