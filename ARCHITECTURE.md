# Destination Finder - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                                                                 │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │ DestinationFinder │              │DestinationResults│        │
│  │   (Form Page)    │─────────────▶│  (Results Page)  │        │
│  │                  │   Show Results│                  │        │
│  │  - Budget Slider │              │  - Cost Breakdown │        │
│  │  - Duration      │              │  - Highlights     │        │
│  │  - Travel Style  │              │  - Itinerary      │        │
│  │  - Accommodation │              │  - Tips           │        │
│  └──────────────────┘              └──────────────────┘        │
│           │                                 ▲                   │
│           │ Submit Form                     │                   │
│           ▼                                 │                   │
└───────────────────────────────────────────────────────────────┘
            │                                 │
            │ POST /api/destination           │
            │                                 │
┌───────────▼─────────────────────────────────┴───────────────────┐
│                      API ROUTE LAYER                            │
│                  app/api/destination/route.ts                   │
│                                                                 │
│  1. Validate input (budget, duration, travelers)               │
│  2. Check USE_DUMMY_DATA flag                                  │
│  3. Check BYTEPLUS_API_KEY exists                              │
│  4. Generate AI prompt                                         │
│  5. Call BytePlus API or return dummy data                     │
│  6. Parse & validate response                                  │
│  7. Fallback to dummy data on any error                        │
└─────────────────────────────────────────────────────────────────┘
            │                      │
            │                      │
    ┌───────▼──────────┐  ┌────────▼──────────┐
    │  SERVICE LAYER   │  │   DATA LAYER      │
    │                  │  │                   │
    │ destination-     │  │ dummy-            │
    │ service.ts       │  │ destinations.json │
    │                  │  │                   │
    │ Functions:       │  │ Static JSON:      │
    │ • getDummyDest() │  │ • Bali            │
    │ • generatePrompt │  │ • Bangkok         │
    │ • parseResponse  │  │ • Tokyo           │
    │ • validate       │  │                   │
    └──────────────────┘  └───────────────────┘
            │
            │
    ┌───────▼──────────────────────────────────┐
    │      EXTERNAL AI SERVICE                 │
    │                                          │
    │  BytePlus DeepSeek API                   │
    │  - Model: deepseek-chat                  │
    │  - Temperature: 0.8                      │
    │  - Max Tokens: 3000                      │
    │  - Response: JSON recommendations        │
    └──────────────────────────────────────────┘
```

---

## Data Flow Sequence

### Happy Path (AI Success)

```
User → Form → Submit
  ↓
API Route validates input
  ↓
Generate AI prompt from preferences
  ↓
Call BytePlus API with prompt
  ↓
Receive AI response (JSON text)
  ↓
Parse JSON with regex extraction
  ↓
Validate recommendation structure
  ↓
Return to frontend
  ↓
Render DestinationResults component
  ↓
User sees 2-3 destination recommendations
```

### Fallback Path (Error Handling)

```
User → Form → Submit
  ↓
API Route validates input
  ↓
Check: USE_DUMMY_DATA = true?
  │
  ├─ YES → getDummyDestinations() → Return dummy data
  │
  └─ NO → Check: API key exists?
         │
         ├─ NO → getDummyDestinations() → Return dummy data
         │
         └─ YES → Call BytePlus API
                  │
                  ├─ API Error (500, timeout, etc.)
                  │   └─→ getDummyDestinations() → Return dummy data
                  │
                  ├─ Invalid JSON response
                  │   └─→ getDummyDestinations() → Return dummy data
                  │
                  └─ Success → Parse & return AI data
```

---

## Component Structure

```
app/
├── page.tsx
│   └── <DestinationFinder />
│
components/
├── DestinationFinder.tsx
│   ├── State: preferences, isLoading, recommendations
│   ├── Form: Budget, Duration, Travelers, Style, Accommodation
│   └── Submit → POST /api/destination → Show Results
│
├── DestinationResults.tsx
│   ├── Props: recommendations[], preferences, onBack()
│   ├── Display: Cost breakdown, Highlights, Itinerary, Tips
│   └── Back Button → Return to form
│
├── Header.tsx
├── Footer.tsx
└── AiAdvisor.tsx

lib/
├── types.ts
│   ├── TravelPreferences interface
│   └── DestinationRecommendation interface
│
├── destination-service.ts
│   ├── DESTINATION_CONFIG (toggle dummy/AI)
│   ├── getDummyDestinations()
│   ├── generateAIPrompt()
│   ├── parseAIResponse()
│   ├── validateRecommendations()
│   └── Helper functions (scale costs, adjust itinerary)
│
└── dummy-destinations.json
    └── Static fallback data (Bali, Bangkok, Tokyo)

app/api/destination/
└── route.ts
    ├── POST handler
    ├── Input validation
    ├── AI API call
    ├── Error handling
    └── Dummy data fallback
```

---

## Configuration System

### Environment Variables

```bash
# .env.local
BYTEPLUS_API_KEY=ep-xxxxxxxxxxxxx
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### Code Configuration

```typescript
// lib/destination-service.ts
export const DESTINATION_CONFIG = {
  USE_DUMMY_DATA: false,     // Toggle for dev/prod
  API_ENDPOINT: process.env.BYTEPLUS_ENDPOINT,
  MODEL: 'deepseek-chat',
  TEMPERATURE: 0.8,
  MAX_TOKENS: 3000,
}
```

### Configuration Priority

```
1. USE_DUMMY_DATA = true
   └─→ Always use dummy data (dev mode)

2. BYTEPLUS_API_KEY not set
   └─→ Fallback to dummy data (missing config)

3. API call fails
   └─→ Fallback to dummy data (error handling)

4. All conditions met
   └─→ Use AI-generated data (production)
```

---

## Error Handling Strategy

### Three-Layer Fallback System

```
┌─────────────────────────────────────────┐
│ Layer 1: Configuration Check            │
│ • USE_DUMMY_DATA flag                   │
│ • API key validation                    │
│ → Prevents unnecessary API calls        │
└─────────────────────────────────────────┘
              ↓ (if passed)
┌─────────────────────────────────────────┐
│ Layer 2: API Call Error Handling       │
│ • Network errors                        │
│ • API timeouts                          │
│ • Non-200 status codes                  │
│ → Returns dummy data on failure         │
└─────────────────────────────────────────┘
              ↓ (if passed)
┌─────────────────────────────────────────┐
│ Layer 3: Response Validation            │
│ • JSON parsing errors                   │
│ • Missing required fields               │
│ • Invalid data structure                │
│ → Returns dummy data on invalid format  │
└─────────────────────────────────────────┘
              ↓ (if passed)
         ✅ Return AI Data
```

### Error Types & Responses

| Error Type | Status Code | Response |
|------------|-------------|----------|
| Missing required fields | 400 | `{ error: "Missing required fields" }` |
| API key not configured | 200 | Dummy data (silent fallback) |
| API call failure | 200 | Dummy data (logged error) |
| JSON parse error | 200 | Dummy data (logged error) |
| Invalid data structure | 200 | Dummy data (logged error) |
| Server crash | 500 | `{ error: "Internal server error" }` |

---

## AI Prompt Engineering

### System Instruction Structure

```
Role Definition
  ↓
"Anda adalah ahli perjalanan..."

Task Breakdown
  ↓
1. Analisa preferensi
2. Rekomendasikan 2-3 destinasi
3. Breakdown biaya detail
4. Itinerary harian
5. Tips perjalanan

Constraints
  ↓
- Budget realistis (2024-2025)
- Total ≤ user budget
- Pertimbangkan jumlah travelers
- Beragam (domestik + internasional)

Output Format
  ↓
JSON schema dengan contoh
```

### User Query Template

```
Input Variables:
- Budget: Rp 10.000.000
- Durasi: 5 hari
- Jumlah Travelers: 2 orang
- Gaya Perjalanan: santai
- Tipe Akomodasi: mid-range

AI Task:
"Rekomendasikan destinasi wisata yang sesuai..."
```

### Response Processing

```
AI Raw Response
  ↓
Regex Extract: /\{[\s\S]*\}/
  ↓
JSON.parse(extracted)
  ↓
Validate structure
  ↓
Check required fields
  ↓
Return parsed data or fallback
```

---

## Dummy Data Strategy

### Purpose

1. **Development**: Fast iteration without API calls
2. **Fallback**: Graceful degradation on errors
3. **Demo**: Show users expected output format
4. **Testing**: Predictable data for QA

### Selection Logic

```typescript
function getDummyDestinations(preferences: TravelPreferences) {
  // Filter by budget (allow 20% over)
  const filtered = dummyData.filter(
    dest => dest.total <= preferences.budget * 1.2
  )

  // If none fit, scale the cheapest
  if (filtered.length === 0) {
    return [scaleCheapest(preferences.budget)]
  }

  // Return top 3 matches
  return filtered.slice(0, 3).map(dest => ({
    ...dest,
    itinerary: adjustItinerary(dest.itinerary, preferences.duration)
  }))
}
```

### Dynamic Adjustments

1. **Cost Scaling**: Proportionally scale all costs to fit budget
2. **Itinerary Length**: Extend/shorten to match duration
3. **Traveler Count**: Adjust per-person costs (future enhancement)

---

## Performance Optimization

### Response Time Targets

```
┌────────────────────────┬──────────────┐
│ Operation              │ Target Time  │
├────────────────────────┼──────────────┤
│ Dummy Data             │ < 100ms      │
│ API Call (cached)      │ < 1s         │
│ API Call (fresh)       │ < 15s        │
│ Page Load (FCP)        │ < 2s         │
│ Time to Interactive    │ < 3s         │
└────────────────────────┴──────────────┘
```

### Optimization Strategies

1. **Static Dummy Data**: Loaded once at runtime
2. **Lazy Loading**: Results component renders only when needed
3. **Parallel Imports**: Use dynamic imports for heavy components
4. **Caching**: Consider caching common query results
5. **CDN**: Serve JSON from edge locations

---

## Security Considerations

### API Key Protection

```
✅ Stored server-side only (.env.local)
✅ Never exposed to client
✅ Not included in bundle
✅ Verified in API route before use
```

### Input Validation

```typescript
// Server-side validation
if (!preferences.budget || !preferences.duration || !preferences.travelers) {
  return 400 Bad Request
}

// Type safety (TypeScript)
interface TravelPreferences {
  budget: number;      // Not string!
  duration: number;    // Validated range
  // ...
}
```

### Rate Limiting (Future)

```
Implement per-IP rate limiting:
- 10 requests per minute per IP
- 100 requests per hour per IP
- Prevent API abuse
```

---

## Deployment Architecture

### Development

```
Local Machine
  ↓
npm run dev (localhost:3000)
  ↓
USE_DUMMY_DATA: true (fast iteration)
```

### Staging

```
Vercel Preview Deploy
  ↓
USE_DUMMY_DATA: false
BYTEPLUS_API_KEY: staging_key
  ↓
Test with real AI
```

### Production

```
Vercel Production Deploy
  ↓
USE_DUMMY_DATA: false
BYTEPLUS_API_KEY: production_key
  ↓
Graceful fallback on errors
```

---

## Monitoring & Logging

### Client-Side

```typescript
// User-facing errors
try {
  const response = await fetch('/api/destination', {...})
  if (!response.ok) {
    throw new Error('Failed to get recommendations')
  }
} catch (error) {
  console.error('Error:', error)
  alert('Terjadi kesalahan. Silakan coba lagi.')
}
```

### Server-Side

```typescript
// Development logs
console.log('Using dummy data (development mode)')
console.warn('BYTEPLUS_API_KEY not configured, using dummy data')
console.error('BytePlus API Error:', errorText)
console.error('JSON Parse Error:', parseError)

// Production logs (Vercel)
// Visible in Vercel Dashboard → Functions → Logs
```

### Analytics (Future)

```
Track:
- Most popular budgets
- Most selected travel styles
- Average response times
- API success/failure rate
- Dummy data fallback frequency
```

---

## Future Enhancements

### Phase 2: Advanced Features

```
1. User Accounts
   - Save favorite destinations
   - Trip history
   - Personalized recommendations

2. Real-time Pricing
   - Flight API integration (Skyscanner, Kayak)
   - Hotel API (Booking.com, Agoda)
   - Dynamic cost updates

3. Multi-language Support
   - English, Indonesian, Mandarin
   - Localized recommendations

4. Social Features
   - Share itineraries
   - Group trip planning
   - Community reviews

5. Booking Integration
   - Direct booking links
   - Affiliate partnerships
   - Price comparison
```

### Technical Improvements

```
1. Caching Layer
   - Redis for common queries
   - CDN for static data
   - Client-side cache with SWR

2. Advanced AI
   - Multi-model comparison
   - Fine-tuned models
   - Image generation (destination photos)

3. Testing
   - Unit tests (Jest)
   - E2E tests (Playwright)
   - Visual regression tests

4. Performance
   - Code splitting
   - Image optimization
   - Lazy loading
   - Service worker (PWA)
```

---

## Summary

This architecture provides:

✅ **Robustness**: Multiple fallback layers
✅ **Performance**: Fast dummy data, optimized AI calls
✅ **Flexibility**: Easy toggle between dev/prod modes
✅ **Scalability**: Service layer ready for future features
✅ **Maintainability**: Clear separation of concerns

The system gracefully handles all error scenarios while providing a seamless user experience.
