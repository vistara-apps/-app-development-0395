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
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Dashboard
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Manage your social media content pipeline
          </p>
        </div>
        
        <button
          onClick={handleCreateWeek}
          className="btn btn-primary flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Week</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Draft Weeks */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
              Recent Weeks
            </h2>
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
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
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Analytics
          </h2>
          <AnalyticsPanel variant="compact" />
        </div>
      </div>
    </div>
  )
}

function QuickStat({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="card card-hover">
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="p-2 sm:p-3 bg-primary/20 rounded-lg flex-shrink-0">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">
            {value}
          </p>
          <p className="text-text-secondary text-sm font-medium mt-1">
            {title}
          </p>
          <p className="text-text-muted text-xs mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onCreateWeek }) {
  return (
    <div className="card text-center py-8 sm:py-12" role="region" aria-label="Empty state">
      <div className="max-w-sm mx-auto">
        <div className="mb-4" aria-hidden="true">
          <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-text-muted mx-auto" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
          No draft weeks yet
        </h3>
        <p className="text-text-secondary mb-6 leading-relaxed">
          Create your first week of AI-generated social media content to get started.
        </p>
        <button
          onClick={onCreateWeek}
          className="btn btn-primary flex items-center space-x-2 mx-auto"
          aria-describedby="create-week-description"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          <span>Create Your First Week</span>
        </button>
        <p id="create-week-description" className="sr-only">
          Navigate to the draft week creation page to generate your first week of social media content
        </p>
      </div>
    </div>
  )
}
