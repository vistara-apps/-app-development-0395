import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { generateWeeklyContent } from '../lib/openai'
import { Wand2, Loader2, Calendar, RefreshCw } from 'lucide-react'
import DraftWeekPanel from '../components/DraftWeekPanel'
import { startOfWeek, format } from 'date-fns'

export default function DraftWeek() {
  const { brandVoice, dispatch } = useApp()
  const [generating, setGenerating] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(null)
  const [topics, setTopics] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleGenerateWeek = async () => {
    if (!brandVoice) {
      alert('Please set up your brand voice first')
      return
    }

    setGenerating(true)
    try {
      const topicList = topics.split(',').map(t => t.trim()).filter(Boolean)
      const posts = await generateWeeklyContent(brandVoice, topicList)
      
      const newWeek = {
        id: Date.now().toString(),
        startDate: startOfWeek(selectedDate).toISOString(),
        status: 'draft',
        posts: posts.map((post, index) => ({
          id: `post-${index}`,
          text: post.text,
          hashtags: post.hashtags,
          networkTargets: [post.platform],
          scheduledAt: null,
          status: 'draft',
          day: post.day,
          timeSlot: post.timeSlot
        }))
      }

      setCurrentWeek(newWeek)
      dispatch({ type: 'ADD_DRAFT_WEEK', payload: newWeek })
      dispatch({ type: 'SET_CURRENT_WEEK', payload: newWeek })
    } catch (error) {
      console.error('Error generating week:', error)
      alert('Failed to generate content. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleRegeneratePost = async (postIndex) => {
    if (!currentWeek || !brandVoice) return

    const updatedPosts = [...currentWeek.posts]
    updatedPosts[postIndex] = {
      ...updatedPosts[postIndex],
      text: 'Regenerating...'
    }

    const updatedWeek = { ...currentWeek, posts: updatedPosts }
    setCurrentWeek(updatedWeek)

    try {
      const newPosts = await generateWeeklyContent(brandVoice, [])
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        text: newPosts[postIndex]?.text || 'Failed to regenerate',
        hashtags: newPosts[postIndex]?.hashtags || []
      }

      const finalWeek = { ...currentWeek, posts: updatedPosts }
      setCurrentWeek(finalWeek)
      dispatch({ type: 'UPDATE_DRAFT_WEEK', payload: finalWeek })
    } catch (error) {
      console.error('Error regenerating post:', error)
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        text: 'Failed to regenerate. Please try again.'
      }
      setCurrentWeek({ ...currentWeek, posts: updatedPosts })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-text-primary">Draft Week</h1>
        <p className="text-text-muted mt-2">
          Generate AI-powered social media content for an entire week
        </p>
      </div>

      {/* Generation Form */}
      <div className="card">
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          Create New Week
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Week Starting Date
            </label>
            <input
              type="date"
              className="input"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Topics (optional)
            </label>
            <input
              className="input"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="product launch, behind scenes, tips..."
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleGenerateWeek}
            disabled={generating}
            className="btn btn-primary flex items-center space-x-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating Content...</span>
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                <span>Generate Week</span>
              </>
            )}
          </button>
        </div>

        {/* Brand Voice Info */}
        {brandVoice && (
          <div className="mt-6 p-4 bg-surface-light rounded-lg">
            <h3 className="font-medium text-text-primary mb-2">Current Brand Voice</h3>
            <div className="text-sm text-text-muted space-y-1">
              <p><strong>Tone:</strong> {brandVoice.toneProfile.tone}</p>
              <p><strong>Style:</strong> {brandVoice.toneProfile.style}</p>
              <p><strong>Audience:</strong> {brandVoice.toneProfile.audience}</p>
              <p><strong>Keywords:</strong> {brandVoice.toneProfile.keywords.join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Generated Week */}
      {currentWeek && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text-primary">
              Generated Content
            </h2>
            <button
              onClick={handleGenerateWeek}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Regenerate All</span>
            </button>
          </div>

          <DraftWeekPanel
            draftWeek={currentWeek}
            variant="expanded"
            onEdit={(week) => console.log('Edit:', week)}
            onDelete={(week) => {
              setCurrentWeek(null)
              dispatch({ type: 'SET_CURRENT_WEEK', payload: null })
            }}
            onSchedule={(week) => console.log('Schedule:', week)}
          />

          {/* Individual Post Controls */}
          <div className="grid grid-cols-1 gap-4">
            {currentWeek.posts?.map((post, index) => (
              <div key={post.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-text-muted" />
                      <span className="text-sm text-text-muted">Day {post.day}</span>
                      <span className="text-sm text-text-muted">•</span>
                      <span className="text-sm text-text-muted">{post.timeSlot}</span>
                    </div>
                    <p className="text-text-primary mb-2">{post.text}</p>
                    <div className="flex items-center space-x-2 text-accent text-sm">
                      <span>#{post.hashtags?.join(' #') || ''}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRegeneratePost(index)}
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentWeek && !generating && (
        <div className="card text-center py-12">
          <Wand2 className="h-16 w-16 text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Ready to Create Content?
          </h3>
          <p className="text-text-muted">
            Use AI to generate a full week of social media posts tailored to your brand voice.
          </p>
        </div>
      )}
    </div>
  )
}