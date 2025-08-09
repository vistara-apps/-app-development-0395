import { createClient } from '@supabase/supabase-js'

// Mock Supabase client for demo purposes
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Mock database operations for demo
export const mockDatabase = {
  async getDraftWeeks(userId) {
    return [
      {
        id: '1',
        userId,
        startDate: new Date().toISOString(),
        status: 'draft',
        posts: [
          {
            id: '1',
            text: 'Excited to share our latest innovation! 🚀 The future of productivity starts here. #innovation #productivity #tech',
            hashtags: ['innovation', 'productivity', 'tech', 'startup', 'growth'],
            networkTargets: ['twitter', 'linkedin'],
            scheduledAt: new Date(Date.now() + 86400000).toISOString(),
            status: 'scheduled'
          },
          {
            id: '2',
            text: 'Building something amazing takes time, patience, and the right team. Here\'s to the journey! 💪 #teamwork #building #startup',
            hashtags: ['teamwork', 'building', 'startup', 'journey', 'growth'],
            networkTargets: ['instagram', 'twitter'],
            scheduledAt: new Date(Date.now() + 2 * 86400000).toISOString(),
            status: 'scheduled'
          }
        ]
      }
    ]
  },
  
  async saveDraftWeek(draftWeek) {
    return { ...draftWeek, id: Date.now().toString() }
  }
}