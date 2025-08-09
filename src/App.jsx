import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import DraftWeek from './pages/DraftWeek'
import BrandVoice from './pages/BrandVoice'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <AppProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/draft-week" element={<DraftWeek />} />
          <Route path="/brand-voice" element={<BrandVoice />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppShell>
    </AppProvider>
  )
}

export default App