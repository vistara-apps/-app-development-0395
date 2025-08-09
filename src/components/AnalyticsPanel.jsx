import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, Eye, Heart, Share, Users } from 'lucide-react'

const mockAnalyticsData = {
  engagement: [
    { day: 'Mon', likes: 45, shares: 12, comments: 8 },
    { day: 'Tue', likes: 52, shares: 18, comments: 15 },
    { day: 'Wed', likes: 38, shares: 9, comments: 6 },
    { day: 'Thu', likes: 67, shares: 25, comments: 22 },
    { day: 'Fri', likes: 89, shares: 34, comments: 28 },
    { day: 'Sat', likes: 76, shares: 28, comments: 19 },
    { day: 'Sun', likes: 94, shares: 41, comments: 35 }
  ],
  overview: {
    totalImpressions: 12459,
    totalEngagements: 1847,
    engagementRate: 14.8,
    followerGrowth: 23
  }
}

export default function AnalyticsPanel({ variant = 'compact' }) {
  const isDetailed = variant === 'detailed'

  return (
    <div className={`space-y-6 ${isDetailed ? 'col-span-full' : ''}`}>
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Eye}
          title="Impressions"
          value={mockAnalyticsData.overview.totalImpressions.toLocaleString()}
          change="+12.5%"
          trend="up"
        />
        <StatCard
          icon={Heart}
          title="Engagements"
          value={mockAnalyticsData.overview.totalEngagements.toLocaleString()}
          change="+8.3%"
          trend="up"
        />
        <StatCard
          icon={TrendingUp}
          title="Engagement Rate"
          value={`${mockAnalyticsData.overview.engagementRate}%`}
          change="+2.1%"
          trend="up"
        />
        <StatCard
          icon={Users}
          title="Followers"
          value={`+${mockAnalyticsData.overview.followerGrowth}`}
          change="+15.2%"
          trend="up"
        />
      </div>

      {/* Engagement Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Weekly Engagement
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockAnalyticsData.engagement}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }} 
            />
            <Line type="monotone" dataKey="likes" stroke="#8B5CF6" strokeWidth={2} />
            <Line type="monotone" dataKey="shares" stroke="#06B6D4" strokeWidth={2} />
            <Line type="monotone" dataKey="comments" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {isDetailed && (
        <>
          {/* Platform Performance */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Platform Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PlatformCard platform="Instagram" engagement="18.4%" posts={12} />
              <PlatformCard platform="Twitter" engagement="12.7%" posts={15} />
              <PlatformCard platform="LinkedIn" engagement="22.1%" posts={8} />
              <PlatformCard platform="TikTok" engagement="9.3%" posts={5} />
            </div>
          </div>

          {/* Best Performing Posts */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Top Performing Posts
            </h3>
            <div className="space-y-3">
              <TopPost
                text="Monday motivation: Every expert was once a beginner..."
                platform="LinkedIn"
                engagement={234}
                impressions={1847}
              />
              <TopPost
                text="Behind the scenes: The magic happens when preparation..."
                platform="Instagram"
                engagement={189}
                impressions={1456}
              />
              <TopPost
                text="Friday feature: Celebrating the small wins that lead..."
                platform="Twitter"
                engagement={156}
                impressions={1203}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, title, value, change, trend }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-muted text-sm">{title}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          <p className={`text-sm ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {change}
          </p>
        </div>
        <Icon className="h-8 w-8 text-text-muted" />
      </div>
    </div>
  )
}

function PlatformCard({ platform, engagement, posts }) {
  return (
    <div className="bg-surface-light rounded-lg p-4">
      <h4 className="font-medium text-text-primary mb-2">{platform}</h4>
      <p className="text-2xl font-bold text-primary mb-1">{engagement}</p>
      <p className="text-text-muted text-sm">{posts} posts this week</p>
    </div>
  )
}

function TopPost({ text, platform, engagement, impressions }) {
  return (
    <div className="bg-surface-light rounded-lg p-4">
      <p className="text-text-primary mb-2 line-clamp-2">{text}</p>
      <div className="flex items-center justify-between text-sm text-text-muted">
        <span>{platform}</span>
        <div className="flex space-x-4">
          <span>{engagement} engagements</span>
          <span>{impressions} impressions</span>
        </div>
      </div>
    </div>
  )
}