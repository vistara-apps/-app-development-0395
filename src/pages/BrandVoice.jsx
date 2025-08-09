import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Mic, Save, RefreshCw } from 'lucide-react'

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'playful', label: 'Playful' },
  { value: 'inspirational', label: 'Inspirational' }
]

const styleOptions = [
  { value: 'conversational', label: 'Conversational' },
  { value: 'educational', label: 'Educational' },
  { value: 'storytelling', label: 'Storytelling' },
  { value: 'direct', label: 'Direct' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'motivational', label: 'Motivational' }
]

export default function BrandVoice() {
  const { brandVoice, dispatch } = useApp()
  const [formData, setFormData] = useState({
    name: brandVoice?.name || '',
    tone: brandVoice?.toneProfile?.tone || 'professional',
    style: brandVoice?.toneProfile?.style || 'conversational',
    audience: brandVoice?.toneProfile?.audience || '',
    keywords: brandVoice?.toneProfile?.keywords?.join(', ') || '',
    maxLength: brandVoice?.voiceConstraints?.maxLength || 280,
    hashtagCount: brandVoice?.voiceConstraints?.hashtagCount || 5,
    callToAction: brandVoice?.voiceConstraints?.callToAction || true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const updatedBrandVoice = {
      id: brandVoice?.id || '1',
      name: formData.name,
      toneProfile: {
        tone: formData.tone,
        style: formData.style,
        audience: formData.audience,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
      },
      voiceConstraints: {
        maxLength: parseInt(formData.maxLength),
        hashtagCount: parseInt(formData.hashtagCount),
        callToAction: formData.callToAction
      }
    }

    dispatch({ type: 'SET_BRAND_VOICE', payload: updatedBrandVoice })
    alert('Brand voice saved successfully!')
  }

  const handleReset = () => {
    setFormData({
      name: '',
      tone: 'professional',
      style: 'conversational',
      audience: '',
      keywords: '',
      maxLength: 280,
      hashtagCount: 5,
      callToAction: true
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold text-text-primary">Brand Voice</h1>
        <p className="text-text-muted mt-2">
          Define your brand's personality and tone for AI-generated content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Basic Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Brand Voice Name
                  </label>
                  <input
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="My Brand Voice"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Tone
                    </label>
                    <select
                      className="input"
                      value={formData.tone}
                      onChange={(e) => setFormData({...formData, tone: e.target.value})}
                    >
                      {toneOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Style
                    </label>
                    <select
                      className="input"
                      value={formData.style}
                      onChange={(e) => setFormData({...formData, style: e.target.value})}
                    >
                      {styleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Target Audience
                  </label>
                  <input
                    className="input"
                    value={formData.audience}
                    onChange={(e) => setFormData({...formData, audience: e.target.value})}
                    placeholder="young professionals, entrepreneurs, students..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Brand Keywords
                  </label>
                  <input
                    className="input"
                    value={formData.keywords}
                    onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                    placeholder="innovation, growth, community, sustainability..."
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Separate keywords with commas
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Content Constraints
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Maximum Character Length
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.maxLength}
                      onChange={(e) => setFormData({...formData, maxLength: e.target.value})}
                      min="50"
                      max="2000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Number of Hashtags
                    </label>
                    <input
                      type="number"
                      className="input"
                      value={formData.hashtagCount}
                      onChange={(e) => setFormData({...formData, hashtagCount: e.target.value})}
                      min="1"
                      max="30"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="callToAction"
                    checked={formData.callToAction}
                    onChange={(e) => setFormData({...formData, callToAction: e.target.checked})}
                  />
                  <label htmlFor="callToAction" className="text-sm text-text-secondary">
                    Include call-to-action in posts
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary flex items-center space-x-2">
                <Save className="h-5 w-5" />
                <span>Save Brand Voice</span>
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Reset</span>
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Preview
            </h2>
            
            <div className="space-y-4">
              <div className="bg-surface-light rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-2">Brand Voice Summary</h3>
                <div className="text-sm text-text-muted space-y-1">
                  <p><strong>Name:</strong> {formData.name || 'Unnamed'}</p>
                  <p><strong>Tone:</strong> {formData.tone}</p>
                  <p><strong>Style:</strong> {formData.style}</p>
                  <p><strong>Audience:</strong> {formData.audience || 'Not specified'}</p>
                  <p><strong>Keywords:</strong> {formData.keywords || 'None'}</p>
                </div>
              </div>

              <div className="bg-surface-light rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-2">Constraints</h3>
                <div className="text-sm text-text-muted space-y-1">
                  <p><strong>Max Length:</strong> {formData.maxLength} characters</p>
                  <p><strong>Hashtags:</strong> {formData.hashtagCount} per post</p>
                  <p><strong>Call-to-Action:</strong> {formData.callToAction ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>

              <div className="bg-surface-light rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-2">Sample Post</h3>
                <p className="text-sm text-text-secondary">
                  {formData.tone === 'professional' 
                    ? "Excited to share our latest innovation in the industry. This breakthrough will help young professionals achieve their goals more efficiently."
                    : formData.tone === 'casual'
                    ? "Hey everyone! 👋 Just dropped something amazing that'll totally change how you think about productivity. Check it out!"
                    : "Ready to transform your workflow? Our new solution is here to empower creators and innovators everywhere. 🚀"
                  }
                </p>
                <div className="mt-2 text-xs text-accent">
                  #{formData.keywords.split(',')[0]?.trim() || 'innovation'} #productivity #growth
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Tips for Better Results
            </h2>
            <ul className="text-sm text-text-muted space-y-2">
              <li>• Be specific about your target audience</li>
              <li>• Include 5-10 brand keywords for consistency</li>
              <li>• Choose a tone that matches your brand personality</li>
              <li>• Set realistic character limits for your platforms</li>
              <li>• Test different styles to see what resonates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}