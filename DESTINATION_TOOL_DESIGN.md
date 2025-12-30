# Destination Finder Tool - Design Documentation

## Overview
The Destination Finder is an AI-powered travel recommendation tool that helps Indonesian travelers discover their dream destinations based on budget, preferences, and travel style. It provides detailed cost breakdowns, day-by-day itineraries, and practical travel tips.

---

## Data Structure Design

### 1. Input: TravelPreferences
User inputs for generating personalized recommendations.

```typescript
interface TravelPreferences {
  budget: number;              // Total budget in IDR (5M - 100M)
  duration: number;            // Trip duration in days (1-30)
  travelStyle: 'santai' | 'petualangan' | 'kuliner' | 'budaya' | 'belanja';
  travelers: number;           // Number of travelers (1-10)
  accommodation: 'budget' | 'mid-range' | 'luxury';
  interests?: string[];        // Optional additional interests
}
```

**Field Details:**
- `budget`: Slider from 5,000,000 to 100,000,000 IDR
- `duration`: Number input for trip length
- `travelStyle`: 5 predefined styles with emojis
- `travelers`: Affects cost calculations (flights, accommodation, food)
- `accommodation`: Determines hotel tier and pricing
- `interests`: Future enhancement for more personalized recommendations

---

### 2. Output: DestinationRecommendation
AI-generated recommendations with complete trip details.

```typescript
interface DestinationRecommendation {
  destination: string;         // City/place name (e.g., "Bali", "Tokyo")
  country: string;             // Country name (e.g., "Indonesia", "Japan")
  description: string;         // 2-3 sentence overview of why this destination fits

  estimatedCost: {
    flights: number;           // Round-trip flights for all travelers (IDR)
    accommodation: number;     // Total lodging cost for duration (IDR)
    food: number;              // Estimated food expenses (IDR)
    activities: number;        // Tours, entrance fees, activities (IDR)
    total: number;             // Sum of all costs (IDR)
  };

  highlights: string[];        // 3-5 key attractions/experiences

  itinerary: {
    day: number;               // Day number (1, 2, 3...)
    activities: string[];      // 3-5 activities for that day
  }[];

  bestTimeToVisit: string;     // Optimal months/season with reasoning
  tips: string[];              // 4-6 practical travel tips
}
```

**Field Details:**

#### estimatedCost
- `flights`: Based on current airline prices (e.g., Garuda, AirAsia) × travelers
- `accommodation`: Nightly rate × duration × rooms needed
- `food`: Daily budget per person × duration × travelers
- `activities`: Entrance fees, tours, transportation × travelers
- `total`: Must NOT exceed user's budget input

#### highlights
- 3-5 bullet points of top attractions
- Mix of cultural, natural, and experiential highlights
- Should align with user's travelStyle preference

#### itinerary
- Day-by-day breakdown for entire trip duration
- 3-5 activities per day (morning, afternoon, evening)
- Practical and geographically logical flow
- Includes meals, rest time, travel time

#### bestTimeToVisit
- Specific months or seasons
- Weather considerations
- Peak vs. off-peak season
- Special events or festivals

#### tips
- 4-6 actionable tips
- Cover: transportation, money, safety, etiquette, booking
- Local apps, payment methods, dress codes
- Budget-saving hacks

---

## API Response Format

The AI endpoint returns a JSON object with this structure:

```json
{
  "recommendations": [
    {
      "destination": "string",
      "country": "string",
      "description": "string",
      "estimatedCost": {
        "flights": 0,
        "accommodation": 0,
        "food": 0,
        "activities": 0,
        "total": 0
      },
      "highlights": ["string"],
      "itinerary": [
        {
          "day": 1,
          "activities": ["string"]
        }
      ],
      "bestTimeToVisit": "string",
      "tips": ["string"]
    }
  ]
}
```

**Important Notes:**
- AI must return 2-3 destination recommendations
- All costs in IDR (Indonesian Rupiah)
- Total cost should be ≤ user's budget
- Itinerary length matches `duration` input
- JSON must be valid and parseable

---

## AI Prompt Engineering Strategy

### System Instruction Key Points:
1. **Role**: Expert travel consultant for Indonesian travelers
2. **Budget Realism**: Use actual 2024-2025 prices
3. **Cost Accuracy**: Detailed breakdown, not guesswork
4. **Diversity**: Mix domestic and international options
5. **Practicality**: Realistic itineraries, not rushed schedules

### User Query Format:
```
Budget: Rp 10.000.000
Durasi: 5 hari
Jumlah Travelers: 2 orang
Gaya Perjalanan: santai
Tipe Akomodasi: mid-range
```

### AI Temperature:
- `0.8` for creative yet reliable recommendations
- `max_tokens: 3000` for detailed responses

---

## Cost Calculation Guidelines

### Budget Breakdown (Typical Ratios):
- **Flights**: 20-35% of budget (higher for international)
- **Accommodation**: 25-35% of budget
- **Food**: 20-30% of budget
- **Activities**: 15-25% of budget

### Accommodation Tiers:
- **Budget**: Hostels, guesthouses (200k-400k/night)
- **Mid-range**: 3-4 star hotels (500k-1.5M/night)
- **Luxury**: 5-star hotels, resorts (1.5M-5M/night)

### Travel Style Impact:
- **Santai**: More accommodation budget, spa/relaxation activities
- **Petualangan**: More activities budget, basic accommodation
- **Kuliner**: Higher food budget (30-40%), food tours
- **Budaya**: Museum passes, guided heritage tours
- **Belanja**: Shopping allocation in activities budget

---

## Example Use Cases

### Case 1: Budget Domestic Trip
**Input:**
- Budget: 5,000,000 IDR
- Duration: 3 days
- Travelers: 2
- Style: Santai
- Accommodation: Budget

**Expected Output:**
- Destinations: Yogyakarta, Bandung, Lombok
- Flights: ~1,500,000 (domestic)
- Accommodation: ~900,000 (300k/night × 3 nights)
- Food: ~1,200,000 (200k/day per person)
- Activities: ~1,000,000

### Case 2: Mid-Range International Trip
**Input:**
- Budget: 15,000,000 IDR
- Duration: 5 days
- Travelers: 2
- Style: Kuliner
- Accommodation: Mid-range

**Expected Output:**
- Destinations: Bangkok, Kuala Lumpur, Singapore
- Flights: ~4,000,000
- Accommodation: ~4,500,000 (900k/night × 5 nights)
- Food: ~4,000,000 (higher for food tours)
- Activities: ~2,000,000

### Case 3: Luxury Long Trip
**Input:**
- Budget: 50,000,000 IDR
- Duration: 7 days
- Travelers: 2
- Style: Petualangan
- Accommodation: Luxury

**Expected Output:**
- Destinations: New Zealand, Switzerland, Iceland
- Flights: ~20,000,000
- Accommodation: ~15,000,000 (2M/night × 7 nights)
- Food: ~8,000,000
- Activities: ~6,000,000 (adventure tours)

---

## Implementation Flow

```
User fills form → Submit → Loading state → API call
                                              ↓
                                    POST /api/destination
                                              ↓
                                    BytePlus DeepSeek API
                                              ↓
                                    JSON parsing & validation
                                              ↓
                                    Fallback to dummy data if error
                                              ↓
                                    Render DestinationResults component
```

### Error Handling:
1. **API Failure**: Return fallback dummy data (Bali)
2. **JSON Parse Error**: Regex extract JSON, then parse
3. **Invalid Format**: Use type guards and defaults
4. **Network Timeout**: Show error message, retry option

---

## Dummy Data Strategy

### Purpose:
1. **Development**: Test UI without API calls
2. **Fallback**: Graceful degradation if AI fails
3. **Demo**: Show potential users what to expect
4. **Cost-saving**: Reduce API calls during testing

### Dummy Data Sources:
- `lib/dummy-destinations.json` - Static JSON file
- Covers 3 popular destinations: Bali, Bangkok, Tokyo
- Realistic prices based on 2024-2025 market rates
- Complete with all required fields

### When to Use Dummy Data:
1. API key not configured (`BYTEPLUS_API_KEY` missing)
2. API call fails (network error, timeout)
3. JSON parsing error from AI response
4. Development mode toggle (future enhancement)

---

## Future Enhancements

### Phase 2 Features:
1. **Save & Share**: Bookmark recommendations, share via link
2. **Compare**: Side-by-side destination comparison
3. **Book Now**: Integration with booking platforms
4. **Weather API**: Real-time weather data
5. **Currency Converter**: Multi-currency support
6. **User Accounts**: Save preferences, trip history

### AI Improvements:
1. **Multi-model**: Test GPT-4, Claude, Gemini for best results
2. **Fine-tuning**: Train on Indonesian travel data
3. **Context Memory**: Remember user's past preferences
4. **Visual AI**: Generate destination images with DALL-E
5. **Sentiment Analysis**: Analyze user reviews for recommendations

### Data Enhancements:
1. **Real-time Pricing**: Scrape flight/hotel APIs
2. **Reviews Integration**: TripAdvisor/Google Reviews
3. **Visa Requirements**: Auto-check visa needs by nationality
4. **Travel Alerts**: Government travel advisories
5. **Seasonal Pricing**: Dynamic cost adjustment

---

## Technical Specifications

### API Endpoint
- **URL**: `/api/destination`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Auth**: Server-side only (BYTEPLUS_API_KEY in env)

### Request Body
```json
{
  "budget": 10000000,
  "duration": 5,
  "travelStyle": "santai",
  "travelers": 2,
  "accommodation": "mid-range",
  "interests": []
}
```

### Response Body
```json
{
  "recommendations": [...]
}
```

### Status Codes
- `200`: Success
- `400`: Invalid input (missing required fields)
- `500`: Server error (API key missing, AI failure)

---

## Testing Checklist

### Functional Tests:
- [ ] Form validation (required fields)
- [ ] Budget slider (min/max limits)
- [ ] Loading state during API call
- [ ] Successful API response rendering
- [ ] Fallback to dummy data on error
- [ ] Back button returns to form
- [ ] Currency formatting (IDR)
- [ ] Responsive design (mobile/desktop)

### Edge Cases:
- [ ] Budget = 5,000,000 (minimum)
- [ ] Budget = 100,000,000 (maximum)
- [ ] Duration = 1 day
- [ ] Duration = 30 days
- [ ] Travelers = 1 (solo)
- [ ] Travelers = 10 (group)
- [ ] No internet connection
- [ ] API timeout (> 30 seconds)
- [ ] Malformed JSON from AI

### User Experience:
- [ ] Clear error messages
- [ ] Helpful tips visible
- [ ] Print-friendly layout
- [ ] Shareable results
- [ ] Accessible (WCAG 2.1)

---

## Deployment Considerations

### Environment Variables:
```bash
BYTEPLUS_API_KEY=your_api_key_here
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### Performance:
- API call timeout: 30 seconds
- Response caching: Consider caching common queries
- Rate limiting: Implement to prevent abuse
- CDN: Serve dummy-destinations.json from CDN

### Security:
- API key stored server-side only
- Input validation (prevent injection)
- Rate limiting per IP
- HTTPS only

### Monitoring:
- Track API success/failure rate
- Log parse errors for debugging
- Monitor response times
- User analytics (popular destinations, budgets)

---

## Conclusion

This design provides a robust, scalable foundation for the Destination Finder tool. The JSON structure is AI-ready with clear instructions for generating accurate, helpful recommendations. The fallback strategy ensures a smooth user experience even when the AI fails.

**Key Takeaways:**
- Comprehensive TypeScript types for type safety
- Realistic cost breakdowns based on market prices
- Practical itineraries that match trip duration
- Graceful error handling with dummy data
- Extensible design for future enhancements

The dummy data in `lib/dummy-destinations.json` serves as both a development tool and a production fallback, ensuring the app is always functional.
