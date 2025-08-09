import React from 'react'
import AnalyticsPanel from '../components/AnalyticsPanel'
import { Calendar, Download, Filter } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-text-primary">Analytics</h1>
          <p className="text-text-muted mt-2">
            Track performance and optimize your content strategy
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="input w-auto">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
          
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Analytics Content */}
      <AnalyticsPanel variant="detailed" />

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Content Recommendations
          </h2>
          
          <div className="space-y-4">
            <RecommendationCard
              title="Optimal Posting Time"
              description="Your audience is most active between 9-11 AM"
              action="Adjust schedule"
            />
            <RecommendationCard
              title="Top Performing Keywords"
              description="#innovation and #productivity drive highest engagement"
              action="Use more often"
            />
            <RecommendationCard
              title="Platform Focus"
              description="LinkedIn posts perform 40% better than other platforms"
              action="Increase frequency"
            />
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Upcoming Optimizations
          </h2>
          
          <div className="space-y-4">
            <OptimizationCard
              title="A/B Test Caption Length"
              description="Test shorter vs longer captions for Instagram"
              status="Ready to start"
            />
            <OptimizationCard
              title="Hashtag Strategy"
              description="Experiment with trending vs branded hashtags"
              status="In progress"
            />
            <OptimizationCard
              title="Posting Frequency"
              description="Test daily vs 3x weekly posting schedule"
              status="Scheduled"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({ title, description, action }) {
  return (
    <div className="bg-surface-light rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-text-primary mb-1">{title}</h3>
          <p className="text-sm text-text-muted">{description}</p>
        </div>
        <button className="btn btn-primary text-xs px-3 py-1">
          {action}
        </button>
      </div>
    </div>
  )
}

function OptimizationCard({ title, description, status }) {
  const statusColors = {
    'Ready to start': 'bg-green-500/20 text-green-400',
    'In progress': 'bg-yellow-500/20 text-yellow-400',
    'Scheduled': 'bg-blue-500/20 text-blue-400'
  }

  return (
    <div className="bg-surface-light rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-text-primary">{title}</h3>
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
  )
}