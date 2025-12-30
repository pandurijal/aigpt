import { NextRequest, NextResponse } from 'next/server'
import { TravelPreferences } from '../../../lib/types'
import {
  DESTINATION_CONFIG,
  getDummyDestinations,
  parseAIResponse,
  validateRecommendations
} from '../../../lib/destination-service'
import {
  DESTINATION_SYSTEM_PROMPT,
  USER_QUERY_TEMPLATE,
  DEEPSEEK_API_CONFIG
} from '../../../lib/prompts/destination-prompt'

export async function POST(request: NextRequest) {
  try {
    const preferences: TravelPreferences = await request.json()

    // Validate required fields
    if (!preferences.budget || !preferences.duration || !preferences.travelers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // If USE_DUMMY_DATA is true, return dummy data immediately
    if (DESTINATION_CONFIG.USE_DUMMY_DATA) {
      console.log('Using dummy data (development mode)')
      return NextResponse.json({
        recommendations: getDummyDestinations(preferences)
      })
    }

    // Check for API key (supports both ARK_API_KEY and BYTEPLUS_API_KEY)
    const apiKey = process.env.ARK_API_KEY || process.env.BYTEPLUS_API_KEY
    if (!apiKey) {
      console.warn('⚠️ ARK_API_KEY or BYTEPLUS_API_KEY not configured, using dummy data')
      return NextResponse.json({
        recommendations: getDummyDestinations(preferences)
      })
    }

    // Generate AI prompt using optimized DeepSeek v3.1 prompt
    const userQuery = USER_QUERY_TEMPLATE(preferences)

    console.log('🤖 Calling DeepSeek v3.1 API...')

    // Call BytePlus DeepSeek API
    const response = await fetch(DESTINATION_CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_API_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: DESTINATION_SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userQuery,
          },
        ],
        temperature: DEEPSEEK_API_CONFIG.temperature,
        max_tokens: DEEPSEEK_API_CONFIG.max_tokens,
        top_p: DEEPSEEK_API_CONFIG.top_p,
        frequency_penalty: DEEPSEEK_API_CONFIG.frequency_penalty,
        presence_penalty: DEEPSEEK_API_CONFIG.presence_penalty,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('BytePlus API Error:', errorText)

      // Fallback to dummy data on API error
      console.log('Falling back to dummy data due to API error')
      return NextResponse.json({
        recommendations: getDummyDestinations(preferences)
      })
    }

    const data = await response.json()
    const responseText = data.choices?.[0]?.message?.content || '{}'

    console.log('✅ DeepSeek API response received')
    console.log('📝 Response preview:', responseText.substring(0, 200) + '...')

    // Parse AI response
    const parsedResponse = parseAIResponse(responseText)

    if (!parsedResponse || !validateRecommendations(parsedResponse)) {
      console.error('❌ Invalid AI response format, using dummy data')
      console.error('Response text:', responseText)
      return NextResponse.json({
        recommendations: getDummyDestinations(preferences)
      })
    }

    console.log('✅ Valid recommendations generated:', parsedResponse.recommendations.length)
    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error('API Route Error:', error)

    // Final fallback to dummy data
    try {
      const preferences: TravelPreferences = await request.json()
      return NextResponse.json({
        recommendations: getDummyDestinations(preferences)
      })
    } catch {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
