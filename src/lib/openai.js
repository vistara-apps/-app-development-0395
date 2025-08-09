import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export async function generateWeeklyContent(brandVoice, topics = []) {
  const prompt = `
    Create 7 social media posts for a week based on this brand voice:
    - Tone: ${brandVoice.toneProfile.tone}
    - Style: ${brandVoice.toneProfile.style}
    - Audience: ${brandVoice.toneProfile.audience}
    - Keywords: ${brandVoice.toneProfile.keywords.join(', ')}
    
    Topics to include: ${topics.length > 0 ? topics.join(', ') : 'general brand content, tips, engagement'}
    
    For each post, provide:
    1. Engaging caption (under ${brandVoice.voiceConstraints.maxLength} characters)
    2. 3-5 relevant hashtags
    3. Best platform (instagram, twitter, linkedin, tiktok)
    4. Optimal posting time (morning, afternoon, evening)
    
    Return as JSON array with this structure:
    [
      {
        "day": 1,
        "text": "caption text",
        "hashtags": ["tag1", "tag2"],
        "platform": "instagram",
        "timeSlot": "morning",
        "engagement_hooks": ["question", "call_to_action"]
      }
    ]
  `

  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a social media expert who creates engaging, brand-consistent content. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const content = response.choices[0].message.content
    // Extract JSON from response if wrapped in markdown
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content]
    return JSON.parse(jsonMatch[1])
  } catch (error) {
    console.error('Error generating content:', error)
    // Return mock data as fallback
    return generateMockWeeklyContent()
  }
}

export async function optimizePost(post, brandVoice, platform) {
  const prompt = `
    Optimize this social media post for ${platform}:
    "${post.text}"
    
    Brand voice: ${brandVoice.toneProfile.tone}, ${brandVoice.toneProfile.style}
    Target audience: ${brandVoice.toneProfile.audience}
    
    Improve for:
    - Platform-specific best practices
    - Engagement (questions, CTAs)
    - Hashtag optimization
    - Character limits
    
    Return JSON: {"text": "optimized text", "hashtags": ["tag1"], "improvements": ["what changed"]}
  `

  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    })

    const content = response.choices[0].message.content
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, content]
    return JSON.parse(jsonMatch[1])
  } catch (error) {
    console.error('Error optimizing post:', error)
    return {
      text: post.text,
      hashtags: post.hashtags,
      improvements: ['Unable to optimize at this time']
    }
  }
}

function generateMockWeeklyContent() {
  return [
    {
      day: 1,
      text: "Monday motivation: Every expert was once a beginner. What's one new skill you're working on this week? 💪",
      hashtags: ["MondayMotivation", "Growth", "Learning", "Skills", "Productivity"],
      platform: "linkedin",
      timeSlot: "morning",
      engagement_hooks: ["question", "motivation"]
    },
    {
      day: 2,
      text: "Behind the scenes: The magic happens when preparation meets opportunity. Here's what we're building... 🚀",
      hashtags: ["BehindTheScenes", "Innovation", "Building", "Opportunity", "Process"],
      platform: "instagram",
      timeSlot: "afternoon",
      engagement_hooks: ["behind_scenes", "curiosity"]
    },
    {
      day: 3,
      text: "Wednesday wisdom: Success isn't just about what you accomplish, but what you inspire others to do. 🌟",
      hashtags: ["WednesdayWisdom", "Success", "Inspiration", "Leadership", "Impact"],
      platform: "twitter",
      timeSlot: "morning",
      engagement_hooks: ["wisdom", "inspiration"]
    },
    {
      day: 4,
      text: "Throwback to when we first started this journey. Look how far we've come! What's your biggest win this month? 🎉",
      hashtags: ["ThrowbackThursday", "Journey", "Growth", "Wins", "Progress"],
      platform: "instagram",
      timeSlot: "evening",
      engagement_hooks: ["throwback", "question"]
    },
    {
      day: 5,
      text: "Friday feature: Celebrating the small wins that lead to big victories. What are you celebrating today? 🎊",
      hashtags: ["FridayFeature", "Celebration", "SmallWins", "Victory", "Gratitude"],
      platform: "linkedin",
      timeSlot: "afternoon",
      engagement_hooks: ["celebration", "question"]
    },
    {
      day: 6,
      text: "Weekend vibes: Time to recharge and reflect. What's one lesson you learned this week? 🌅",
      hashtags: ["WeekendVibes", "Recharge", "Reflection", "Lessons", "Mindfulness"],
      platform: "instagram",
      timeSlot: "morning",
      engagement_hooks: ["reflection", "question"]
    },
    {
      day: 7,
      text: "Sunday planning: Setting intentions for the week ahead. What's your top priority for next week? 📝",
      hashtags: ["SundayPlanning", "Intentions", "Priorities", "WeekAhead", "Focus"],
      platform: "twitter",
      timeSlot: "evening",
      engagement_hooks: ["planning", "question"]
    }
  ]
}