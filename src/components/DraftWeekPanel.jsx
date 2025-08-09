import React, { useState } from 'react'
import { Calendar, Clock, Hash, Share2, Edit, Trash2, Play } from 'lucide-react'
import { format, addDays, startOfWeek } from 'date-fns'

const platformIcons = {
  instagram: '📷',
  twitter: '🐦',
  linkedin: '💼',
  tiktok: '🎵'
}

export default function DraftWeekPanel({ draftWeek, variant = 'compact', onEdit, onDelete, onSchedule }) {
  const [selectedPost, setSelectedPost] = useState(null)
  
  const startDate = startOfWeek(new Date(draftWeek.startDate))
  const isExpanded = variant === 'expanded'

  return (
    <div className={`card ${isExpanded ? 'col-span-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            Week of {format(startDate, 'MMM d, yyyy')}
          </h3>
          <p className="text-text-muted">
            {draftWeek.posts?.length || 0} posts • {draftWeek.status}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSchedule?.(draftWeek)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Schedule All</span>
          </button>
          <button
            onClick={() => onEdit?.(draftWeek)}
            className="btn btn-secondary"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete?.(draftWeek)}
            className="btn btn-secondary text-red-400 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className={`grid gap-4 ${isExpanded ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        {draftWeek.posts?.map((post, index) => {
          const postDate = addDays(startDate, index)
          
          return (
            <div
              key={post.id}
              className="bg-surface-light rounded-lg p-4 border border-border hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm text-text-muted">
                    {format(postDate, 'EEE, MMM d')}
                  </span>
                  {post.scheduledAt && (
                    <>
                      <Clock className="h-4 w-4 text-text-muted" />
                      <span className="text-sm text-text-muted">
                        {format(new Date(post.scheduledAt), 'h:mm a')}
                      </span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  {post.networkTargets?.map(platform => (
                    <span key={platform} className="text-lg">
                      {platformIcons[platform]}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-text-primary mb-3 line-clamp-3">
                {post.text}
              </p>
              
              {post.hashtags && (
                <div className="flex items-center space-x-2 text-accent text-sm">
                  <Hash className="h-3 w-3" />
                  <span>{post.hashtags.slice(0, 3).join(' #')}</span>
                  {post.hashtags.length > 3 && (
                    <span className="text-text-muted">+{post.hashtags.length - 3}</span>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  post.status === 'scheduled'
                    ? 'bg-green-500/20 text-green-400'
                    : post.status === 'draft'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {post.status}
                </span>
                
                <button className="text-text-muted hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSave={(updatedPost) => {
            // Handle post update
            setSelectedPost(null)
          }}
        />
      )}
    </div>
  )
}

function PostDetailModal({ post, onClose, onSave }) {
  const [editedPost, setEditedPost] = useState(post)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Edit Post</h3>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Caption
              </label>
              <textarea
                className="textarea h-32"
                value={editedPost.text}
                onChange={(e) => setEditedPost({...editedPost, text: e.target.value})}
                placeholder="Write your caption..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Hashtags
              </label>
              <input
                className="input"
                value={editedPost.hashtags?.join(' #') || ''}
                onChange={(e) => setEditedPost({
                  ...editedPost,
                  hashtags: e.target.value.split('#').map(tag => tag.trim()).filter(Boolean)
                })}
                placeholder="#hashtag1 #hashtag2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Platforms
              </label>
              <div className="flex space-x-4">
                {Object.keys(platformIcons).map(platform => (
                  <label key={platform} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editedPost.networkTargets?.includes(platform)}
                      onChange={(e) => {
                        const targets = editedPost.networkTargets || []
                        setEditedPost({
                          ...editedPost,
                          networkTargets: e.target.checked
                            ? [...targets, platform]
                            : targets.filter(t => t !== platform)
                        })
                      }}
                    />
                    <span>{platformIcons[platform]} {platform}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button
              onClick={() => onSave(editedPost)}
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}