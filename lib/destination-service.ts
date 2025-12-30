import { TravelPreferences, DestinationRecommendation } from './types'
import dummyDestinations from './dummy-destinations.json'

/**
 * Configuration for destination finder service
 */
export const DESTINATION_CONFIG = {
  // Toggle this to use dummy data instead of AI API
  USE_DUMMY_DATA: false,

  // API Configuration (BytePlus ARK Southeast Asia endpoint)
  API_ENDPOINT: process.env.BYTEPLUS_ENDPOINT || 'https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions',
  MODEL: 'deepseek-v3',
  TEMPERATURE: 0.8,
  MAX_TOKENS: 3000,
}

/**
 * Get dummy destinations filtered by user preferences
 * This is used as fallback or for development
 */
export function getDummyDestinations(preferences: TravelPreferences): DestinationRecommendation[] {
  const { budget, duration, travelers } = preferences

  // Sort destinations by cost (cheapest to most expensive)
  const sortedDestinations = [...dummyDestinations.recommendations].sort(
    (a, b) => a.estimatedCost.total - b.estimatedCost.total
  )

  // Find destinations that match or can be scaled to the budget
  const suitable: DestinationRecommendation[] = []

  for (const dest of sortedDestinations) {
    const ratio = budget / dest.estimatedCost.total

    // If budget is much higher (5x or more), scale up to luxury version
    // If budget is much lower (0.5x or less), scale down to budget version
    // If within range (0.5x to 5x), scale proportionally
    if (ratio >= 0.4 && ratio <= 10) {
      suitable.push(scaleDestinationCosts(dest, budget, travelers, duration))
    }
  }

  // If we found suitable destinations, return up to 3
  if (suitable.length > 0) {
    return suitable.slice(0, 3)
  }

  // Fallback: scale the middle destination
  const middleDest = sortedDestinations[Math.floor(sortedDestinations.length / 2)]
  return [scaleDestinationCosts(middleDest, budget, travelers, duration)]
}

/**
 * Scale a destination's costs to fit within budget
 */
function scaleDestinationCosts(
  destination: DestinationRecommendation,
  targetBudget: number,
  travelers: number,
  duration: number
): DestinationRecommendation {
  // Calculate scale factor (target 90-95% of budget for safety)
  const usableBudget = targetBudget * 0.93
  const scaleFactor = usableBudget / destination.estimatedCost.total

  // Determine budget tier for description
  let budgetTier = ''
  let tierDescription = ''

  if (targetBudget >= 50000000) {
    budgetTier = 'Luxury'
    tierDescription = ' dengan akomodasi premium dan pengalaman eksklusif'
  } else if (targetBudget >= 20000000) {
    budgetTier = 'Premium'
    tierDescription = ' dengan fasilitas yang nyaman dan aktivitas lengkap'
  } else if (targetBudget >= 10000000) {
    budgetTier = 'Comfort'
    tierDescription = ' dengan value for money terbaik'
  } else {
    budgetTier = 'Budget-Friendly'
    tierDescription = ' dengan pengeluaran yang efisien'
  }

  // Scale all costs proportionally
  const scaledCosts = {
    flights: Math.round(destination.estimatedCost.flights * scaleFactor),
    accommodation: Math.round(destination.estimatedCost.accommodation * scaleFactor),
    food: Math.round(destination.estimatedCost.food * scaleFactor),
    activities: Math.round(destination.estimatedCost.activities * scaleFactor),
  }

  // Ensure total matches (fix any rounding errors)
  const calculatedTotal = scaledCosts.flights + scaledCosts.accommodation + scaledCosts.food + scaledCosts.activities
  const totalDiff = Math.round(usableBudget) - calculatedTotal

  // Add difference to accommodation (usually the largest component)
  scaledCosts.accommodation += totalDiff

  return {
    ...destination,
    estimatedCost: {
      ...scaledCosts,
      total: Math.round(usableBudget)
    },
    itinerary: adjustItinerary(destination.itinerary, duration),
    description: `${destination.description.split('.')[0]}${tierDescription}. (Disesuaikan untuk ${travelers} orang, ${duration} hari)`,
    tips: [
      ...destination.tips,
      `Budget tier: ${budgetTier} - Total estimasi Rp ${(usableBudget / 1000000).toFixed(1)} juta untuk ${travelers} orang`
    ]
  }
}

/**
 * Adjust itinerary length to match trip duration
 */
function adjustItinerary(
  originalItinerary: { day: number; activities: string[] }[],
  targetDuration: number
): { day: number; activities: string[] }[] {
  if (originalItinerary.length === targetDuration) {
    return originalItinerary
  }

  // If target is shorter, slice
  if (targetDuration < originalItinerary.length) {
    return originalItinerary.slice(0, targetDuration)
  }

  // If target is longer, extend with generic activities
  const extended = [...originalItinerary]
  for (let i = originalItinerary.length; i < targetDuration; i++) {
    extended.push({
      day: i + 1,
      activities: [
        'Eksplorasi area sekitar bebas',
        'Kunjungi tempat wisata lokal yang belum terjamah',
        'Nikmati kuliner khas daerah',
        'Istirahat dan relaksasi di hotel'
      ]
    })
  }

  return extended
}

/**
 * Generate AI prompt for destination recommendations
 */
export function generateAIPrompt(preferences: TravelPreferences): {
  systemInstruction: string
  userQuery: string
} {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const systemInstruction = `
Anda adalah ahli perjalanan dan konsultan wisata profesional yang membantu wisatawan Indonesia menemukan destinasi impian mereka.

Tugas Anda:
1. Analisa preferensi dan budget yang diberikan pengguna
2. Rekomendasikan 2-3 destinasi wisata yang REALISTIS dan sesuai dengan budget
3. Berikan breakdown biaya yang AKURAT dan DETAIL untuk setiap destinasi
4. Buat itinerary harian yang praktis dan menarik
5. Berikan tips perjalanan yang berguna

PENTING:
- Budget harus REALISTIS berdasarkan harga aktual di tahun 2024-2025
- Breakdown biaya harus mencakup: penerbangan, akomodasi, makanan, dan aktivitas
- Total biaya tidak boleh melebihi budget yang diberikan
- Pertimbangkan jumlah travelers dalam perhitungan
- Berikan destinasi yang BERAGAM (domestik dan internasional jika budget memungkinkan)
- Itinerary harus praktis dan bisa dilakukan dalam durasi yang diberikan

Format Response (HARUS dalam format JSON yang valid):
{
  "recommendations": [
    {
      "destination": "Nama Kota/Destinasi",
      "country": "Nama Negara",
      "description": "Deskripsi singkat mengapa destinasi ini cocok",
      "estimatedCost": {
        "flights": [harga tiket PP untuk semua travelers dalam IDR],
        "accommodation": [harga total akomodasi untuk durasi menginap dalam IDR],
        "food": [estimasi biaya makan untuk semua travelers dalam IDR],
        "activities": [estimasi biaya aktivitas/wisata dalam IDR],
        "total": [total semua biaya dalam IDR]
      },
      "highlights": [
        "Highlight 1",
        "Highlight 2",
        "Highlight 3"
      ],
      "itinerary": [
        {
          "day": 1,
          "activities": ["Aktivitas 1", "Aktivitas 2", "Aktivitas 3"]
        },
        {
          "day": 2,
          "activities": ["Aktivitas 1", "Aktivitas 2"]
        }
      ],
      "bestTimeToVisit": "Bulan terbaik untuk berkunjung dan alasannya",
      "tips": [
        "Tips 1",
        "Tips 2",
        "Tips 3"
      ]
    }
  ]
}

Pastikan response HANYA berisi JSON yang valid, tanpa teks tambahan apapun.
`

  const userQuery = `
Budget: ${formatCurrency(preferences.budget)}
Durasi: ${preferences.duration} hari
Jumlah Travelers: ${preferences.travelers} orang
Gaya Perjalanan: ${preferences.travelStyle}
Tipe Akomodasi: ${preferences.accommodation}
${preferences.interests && preferences.interests.length > 0 ? `Minat: ${preferences.interests.join(', ')}` : ''}

Rekomendasikan destinasi wisata yang sesuai dengan preferensi di atas. Berikan 2-3 pilihan destinasi dengan breakdown biaya yang detail dan realistis.
`

  return { systemInstruction, userQuery }
}

/**
 * Parse AI response and extract JSON
 */
export function parseAIResponse(responseText: string): { recommendations: DestinationRecommendation[] } | null {
  try {
    // Try to extract JSON from the response if it contains additional text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    const jsonText = jsonMatch ? jsonMatch[0] : responseText
    return JSON.parse(jsonText)
  } catch (error) {
    console.error('JSON Parse Error:', error)
    return null
  }
}

/**
 * Validate destination recommendation structure
 */
export function validateRecommendations(data: any): boolean {
  if (!data || !Array.isArray(data.recommendations)) {
    return false
  }

  for (const rec of data.recommendations) {
    // Check required fields
    if (!rec.destination || !rec.country || !rec.estimatedCost) {
      return false
    }

    // Check cost breakdown
    const cost = rec.estimatedCost
    if (!cost.flights || !cost.accommodation || !cost.food || !cost.activities || !cost.total) {
      return false
    }

    // Check arrays
    if (!Array.isArray(rec.highlights) || !Array.isArray(rec.itinerary) || !Array.isArray(rec.tips)) {
      return false
    }
  }

  return true
}
