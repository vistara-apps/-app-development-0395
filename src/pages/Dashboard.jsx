import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Calendar, TrendingUp, Clock, Zap } from 'lucide-react'
import DraftWeekPanel from '../components/DraftWeekPanel'
import AnalyticsPanel from '../components/AnalyticsPanel'
import { mockDatabase } from '../lib/supabase'

export default function Dashboard() {
  const { user, draftWeeks, dispatch } = useApp()
  const [recentWeeks, setRecentWeeks] = useState([])

  useEffect(() => {
    const loadDraftWeeks = async () => {
      if (user) {
        try {
          const weeks = await mockDatabase.getDraftWeeks(user.id)
          dispatch({ type: 'SET_DRAFT_WEEKS', payload: weeks })
          setRecentWeeks(weeks.slice(0, 2))
        } catch (error) {
          console.error('Error loading draft weeks:', error)
        }
      }
    }

    loadDraftWeeks()
  }, [user, dispatch])

  const handleCreateWeek = () => {
    // Navigate to draft week creation
    window.location.href = '/draft-week'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-text-primary">Dashboard</h1>
          <p className="text-text-muted mt-2">
            Manage your social media content pipeline
          </p>
        </div>
        
        <button
          onClick={handleCreateWeek}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Week</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <QuickStat
          icon={Calendar}
          title="Draft Weeks"
          value={draftWeeks.length}
          subtitle="Total created"
        />
        <QuickStat
          icon={Clock}
          title="Scheduled Posts"
          value={draftWeeks.reduce((acc, week) => acc + (week.posts?.length || 0), 0)}
          subtitle="This month"
        />
        <QuickStat
          icon={TrendingUp}
          title="Engagement Rate"
          value="14.8%"
          subtitle="Last 7 days"
        />
        <QuickStat
          icon={Zap}
          title="AI Generations"
          value="47"
          subtitle="This month"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Draft Weeks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text-primary">Recent Weeks</h2>
            <button className="text-primary hover:text-primary/80">
              View all →
            </button>
          </div>
          
          {recentWeeks.length > 0 ? (
            <div className="space-y-6">
              {recentWeeks.map(week => (
                <DraftWeekPanel
                  key={week.id}
                  draftWeek={week}
                  variant="compact"
                  onEdit={(week) => console.log('Edit week:', week)}
                  onDelete={(week) => console.log('Delete week:', week)}
                  onSchedule={(week) => console.log('Schedule week:', week)}
                />
              ))}
            </div>
          ) : (
            <EmptyState onCreateWeek={handleCreateWeek} />
          )}
        </div>

        {/* Analytics Panel */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary">Analytics</h2>
          <AnalyticsPanel variant="compact" />
        </div>
      </div>
    </div>
  )
}

function QuickStat({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/20 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          <p className="text-text-muted text-sm">{title}</p>
          <p className="text-text-muted text-xs">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onCreateWeek }) {
  return (
    <div className="card text-center py-12">
      <div className="max-w-sm mx-auto">
        <Calendar className="h-16 w-16 text-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No draft weeks yet
        </h3>
        <p className="text-text-muted mb-6">
          Create your first week of AI-generated social media content to get started.
        </p>
        <button
          onClick={onCreateWeek}
          className="btn btn-primary flex items-center space-x-2 mx-auto"
        >
          <Plus className="h-5 w-5" />
          <span>Create Your First Week</span>
        </button>
      </div>
    </div>
  )
}