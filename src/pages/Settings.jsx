import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { User, Bell, CreditCard, Shield, Link2, Save } from 'lucide-react'

export default function Settings() {
  const { user, subscription } = useApp()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    performance: true
  })

  const [connectedPlatforms, setConnectedPlatforms] = useState({
    instagram: false,
    twitter: true,
    linkedin: true,
    tiktok: false
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-text-primary">Settings</h1>
        <p className="text-text-muted mt-2">
          Manage your account, preferences, and integrations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            <SettingsNavItem icon={User} label="Profile" active />
            <SettingsNavItem icon={Bell} label="Notifications" />
            <SettingsNavItem icon={Link2} label="Integrations" />
            <SettingsNavItem icon={CreditCard} label="Billing" />
            <SettingsNavItem icon={Shield} label="Privacy" />
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Profile Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <input className="input" defaultValue={user?.name} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input className="input" defaultValue={user?.email} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Company
                </label>
                <input className="input" placeholder="Your company name" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Bio
                </label>
                <textarea className="textarea" rows={3} placeholder="Tell us about yourself..." />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="card">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Notification Preferences
            </h2>
            
            <div className="space-y-4">
              <NotificationToggle
                label="Email notifications"
                description="Receive email updates about your content"
                checked={notifications.email}
                onChange={(checked) => setNotifications({...notifications, email: checked})}
              />
              <NotificationToggle
                label="Push notifications"
                description="Get real-time updates in your browser"
                checked={notifications.push}
                onChange={(checked) => setNotifications({...notifications, push: checked})}
              />
              <NotificationToggle
                label="Weekly reports"
                description="Receive weekly performance summaries"
                checked={notifications.weekly}
                onChange={(checked) => setNotifications({...notifications, weekly: checked})}
              />
              <NotificationToggle
                label="Performance alerts"
                description="Get notified about significant changes"
                checked={notifications.performance}
                onChange={(checked) => setNotifications({...notifications, performance: checked})}
              />
            </div>
          </div>

          {/* Platform Integrations */}
          <div className="card">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Platform Integrations
            </h2>
            
            <div className="space-y-4">
              <PlatformConnection
                platform="Instagram"
                icon="📷"
                connected={connectedPlatforms.instagram}
                onToggle={(connected) => setConnectedPlatforms({...connectedPlatforms, instagram: connected})}
              />
              <PlatformConnection
                platform="Twitter"
                icon="🐦"
                connected={connectedPlatforms.twitter}
                onToggle={(connected) => setConnectedPlatforms({...connectedPlatforms, twitter: connected})}
              />
              <PlatformConnection
                platform="LinkedIn"
                icon="💼"
                connected={connectedPlatforms.linkedin}
                onToggle={(connected) => setConnectedPlatforms({...connectedPlatforms, linkedin: connected})}
              />
              <PlatformConnection
                platform="TikTok"
                icon="🎵"
                connected={connectedPlatforms.tiktok}
                onToggle={(connected) => setConnectedPlatforms({...connectedPlatforms, tiktok: connected})}
              />
            </div>
          </div>

          {/* Subscription Info */}
          <div className="card">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Current Plan
            </h2>
            
            <div className="bg-surface-light rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary capitalize">
                    {subscription.tier} Plan
                  </h3>
                  <p className="text-text-muted">
                    {subscription.tier === 'starter' && '$9/month'}
                    {subscription.tier === 'pro' && '$29/month'}
                    {subscription.tier === 'scale' && '$79/month'}
                  </p>
                </div>
                <button className="btn btn-primary">Upgrade</button>
              </div>
              
              <div className="space-y-2 text-sm text-text-muted">
                <p>✓ {subscription.features.weeklyDrafts} weekly drafts per month</p>
                <p>{subscription.features.aiOptimization ? '✓' : '✗'} AI optimization</p>
                <p>{subscription.features.analytics ? '✓' : '✗'} Advanced analytics</p>
                <p>{subscription.features.multipleProjects ? '✓' : '✗'} Multiple projects</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="btn btn-primary flex items-center space-x-2">
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsNavItem({ icon: Icon, label, active = false }) {
  return (
    <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-primary text-white' 
        : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
    }`}>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  )
}

function NotificationToggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium text-text-primary">{label}</p>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-surface-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  )
}

function PlatformConnection({ platform, icon, connected, onToggle }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="font-medium text-text-primary">{platform}</p>
          <p className="text-sm text-text-muted">
            {connected ? 'Connected' : 'Not connected'}
          </p>
        </div>
      </div>
      
      <button
        onClick={() => onToggle(!connected)}
        className={`btn ${connected ? 'btn-secondary' : 'btn-primary'}`}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  )
}