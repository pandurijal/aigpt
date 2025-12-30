# Destination Finder - Testing Guide

## Quick Start Testing

### 1. Test with Dummy Data (No API Key Needed)

**Option A: Toggle in code**
```typescript
// In lib/destination-service.ts
export const DESTINATION_CONFIG = {
  USE_DUMMY_DATA: true,  // Set to true
  // ...
}
```

**Option B: Remove API key temporarily**
```bash
# In .env.local
# BYTEPLUS_API_KEY=your_key_here  (comment out)
```

**Expected Result:**
- Instant responses (no API call)
- Returns Bali, Bangkok, or Tokyo based on budget
- Costs automatically scaled to fit budget
- Itinerary adjusted to match duration

### 2. Test with Real AI

**Setup:**
```bash
# In .env.local
BYTEPLUS_API_KEY=your_actual_api_key_here
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

```typescript
// In lib/destination-service.ts
export const DESTINATION_CONFIG = {
  USE_DUMMY_DATA: false,  // Set to false
  // ...
}
```

**Expected Result:**
- 5-15 second response time
- AI-generated recommendations
- Personalized based on travel style
- Falls back to dummy data if AI fails

---

## Test Cases

### Budget Tests

#### Low Budget (5-8M IDR)
```json
{
  "budget": 6000000,
  "duration": 3,
  "travelers": 2,
  "travelStyle": "santai",
  "accommodation": "budget"
}
```
**Expected:** Domestic destinations (Bali, Yogyakarta, Lombok)

#### Mid Budget (10-20M IDR)
```json
{
  "budget": 15000000,
  "duration": 5,
  "travelers": 2,
  "travelStyle": "kuliner",
  "accommodation": "mid-range"
}
```
**Expected:** ASEAN destinations (Bangkok, Singapore, Kuala Lumpur)

#### High Budget (30M+ IDR)
```json
{
  "budget": 50000000,
  "duration": 7,
  "travelers": 2,
  "travelStyle": "petualangan",
  "accommodation": "luxury"
}
```
**Expected:** International destinations (Tokyo, Dubai, Europe)

### Duration Tests

#### Short Trip (1-3 days)
- Itinerary should have 1-3 items
- Activities should be nearby (no day trips)

#### Medium Trip (4-7 days)
- Balanced itinerary
- Mix of city exploration + day trips

#### Long Trip (8+ days)
- May include multiple cities
- More relaxed pacing

### Travel Style Tests

| Style | Expected Recommendations |
|-------|-------------------------|
| **Santai** | Beach destinations, spa resorts, relaxation spots |
| **Petualangan** | Mountains, hiking, outdoor activities, nature |
| **Kuliner** | Food cities (Bangkok, Penang), food tours, markets |
| **Budaya** | Historical sites, museums, UNESCO heritage |
| **Belanja** | Shopping cities (Bangkok, Singapore), malls, markets |

### Accommodation Tests

| Type | Expected Cost/Night (2 people) |
|------|-------------------------------|
| **Budget** | 200k - 500k |
| **Mid-range** | 600k - 1.5M |
| **Luxury** | 1.5M - 5M+ |

---

## UI Testing Checklist

### Form Validation
- [ ] Budget slider moves smoothly (5M - 100M)
- [ ] Duration accepts 1-30 days
- [ ] Travelers accepts 1-10 people
- [ ] Travel style buttons toggle correctly
- [ ] Accommodation buttons toggle correctly
- [ ] Submit button disabled during loading

### Loading State
- [ ] "Mencari Destinasi Terbaik..." message appears
- [ ] Spinner icon animates
- [ ] Form is disabled during API call
- [ ] Loading lasts 1-15 seconds (depending on API)

### Results Display
- [ ] Back button returns to form
- [ ] Shows 2-3 destination cards
- [ ] Each card has all sections:
  - Header (destination, country, total cost)
  - Cost breakdown (4 boxes)
  - Highlights (checkmark list)
  - Best time to visit (calendar icon)
  - Itinerary (day-by-day)
  - Tips (lightbulb icon)
- [ ] Currency formatted as IDR (Rp 10.000.000)
- [ ] Responsive on mobile/tablet/desktop

### Error Handling
- [ ] Missing API key → dummy data fallback
- [ ] API timeout → dummy data fallback
- [ ] Invalid JSON from AI → dummy data fallback
- [ ] Network error → error message or dummy data
- [ ] No internet → graceful error message

---

## API Testing with cURL

### Test API Endpoint Directly

```bash
curl -X POST http://localhost:3000/api/destination \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 10000000,
    "duration": 5,
    "travelStyle": "santai",
    "travelers": 2,
    "accommodation": "mid-range",
    "interests": []
  }'
```

**Expected Response:**
```json
{
  "recommendations": [
    {
      "destination": "Bali",
      "country": "Indonesia",
      "description": "...",
      "estimatedCost": {
        "flights": 3000000,
        "accommodation": 3500000,
        "food": 2000000,
        "activities": 1500000,
        "total": 10000000
      },
      "highlights": ["...", "..."],
      "itinerary": [...],
      "bestTimeToVisit": "...",
      "tips": ["..."]
    }
  ]
}
```

---

## Browser DevTools Testing

### Console Logs to Check

**Dummy Data Mode:**
```
Using dummy data (development mode)
```

**No API Key:**
```
BYTEPLUS_API_KEY not configured, using dummy data
```

**API Error:**
```
BytePlus API Error: [error message]
Falling back to dummy data due to API error
```

**Invalid JSON:**
```
JSON Parse Error: [error]
Invalid AI response format, using dummy data
```

### Network Tab

**Check API Call:**
- URL: `/api/destination`
- Method: `POST`
- Status: `200 OK`
- Response Time: < 15s

**Request Payload:**
```json
{
  "budget": 10000000,
  "duration": 5,
  "travelStyle": "santai",
  "travelers": 2,
  "accommodation": "mid-range"
}
```

---

## Performance Testing

### Metrics to Monitor

| Metric | Target | Notes |
|--------|--------|-------|
| API Response Time | < 15s | AI generation time |
| Dummy Data Response | < 500ms | Instant fallback |
| First Contentful Paint | < 2s | Page load speed |
| Time to Interactive | < 3s | App ready to use |
| Bundle Size | < 500KB | Check with `npm run build` |

### Load Testing

```bash
# Install Apache Bench (if not installed)
brew install httpd  # macOS

# Test 100 requests with 10 concurrent
ab -n 100 -c 10 -p payload.json -T application/json \
  http://localhost:3000/api/destination
```

**payload.json:**
```json
{
  "budget": 10000000,
  "duration": 5,
  "travelStyle": "santai",
  "travelers": 2,
  "accommodation": "mid-range"
}
```

---

## Edge Case Testing

### Extreme Inputs

1. **Minimum Everything**
```json
{
  "budget": 5000000,
  "duration": 1,
  "travelers": 1,
  "travelStyle": "santai",
  "accommodation": "budget"
}
```

2. **Maximum Everything**
```json
{
  "budget": 100000000,
  "duration": 30,
  "travelers": 10,
  "travelStyle": "petualangan",
  "accommodation": "luxury"
}
```

3. **Mismatched Budget/Duration**
```json
{
  "budget": 5000000,
  "duration": 14,
  "travelers": 4,
  "travelStyle": "belanja",
  "accommodation": "luxury"
}
```
**Expected:** AI should recommend budget-friendly destinations or dummy data scales costs.

### Invalid Inputs (Should Return 400)

```bash
# Missing required fields
curl -X POST http://localhost:3000/api/destination \
  -H "Content-Type: application/json" \
  -d '{"budget": 10000000}'

# Expected: {"error": "Missing required fields"}
```

---

## Deployment Testing

### Environment Variables Check

```bash
# Verify env vars are loaded
npm run dev
# Check console for:
# - No warnings about missing API key (if configured)
# - Correct endpoint being used
```

### Production Build Test

```bash
# Build for production
npm run build

# Run production server
npm start

# Test the app at http://localhost:3000
```

### Vercel Deployment Test

After deploying to Vercel:

1. **Check Environment Variables in Vercel Dashboard:**
   - `BYTEPLUS_API_KEY` is set
   - `BYTEPLUS_ENDPOINT` is set (optional)

2. **Test Live URL:**
```bash
curl -X POST https://your-app.vercel.app/api/destination \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 10000000,
    "duration": 5,
    "travelStyle": "santai",
    "travelers": 2,
    "accommodation": "mid-range"
  }'
```

3. **Check Vercel Logs:**
   - Functions → destination → Logs
   - Look for errors or fallback messages

---

## Debugging Tips

### Issue: Always Returns Same Dummy Data

**Fix:**
1. Check `USE_DUMMY_DATA` flag in `lib/destination-service.ts`
2. Verify `BYTEPLUS_API_KEY` in `.env.local`
3. Restart dev server: `npm run dev`

### Issue: API Call Fails

**Debugging:**
1. Check console for error messages
2. Verify API key is valid
3. Test API endpoint with cURL
4. Check BytePlus API dashboard for quota/usage
5. Verify endpoint URL is correct

### Issue: JSON Parse Error

**Debugging:**
1. Check server console for `Response Text:` log
2. AI might be returning text before JSON
3. Regex extraction should catch this: `/\{[\s\S]*\}/`
4. Fallback to dummy data should trigger

### Issue: Wrong Itinerary Length

**Fix:**
- Check `adjustItinerary()` function in `destination-service.ts`
- Should match user's `duration` input
- Dummy data extends/slices automatically

---

## Automated Testing (Future)

### Jest Unit Tests

```typescript
// __tests__/destination-service.test.ts
import { getDummyDestinations, parseAIResponse } from '@/lib/destination-service'

describe('getDummyDestinations', () => {
  it('returns destinations within budget', () => {
    const prefs = {
      budget: 10000000,
      duration: 5,
      travelStyle: 'santai' as const,
      travelers: 2,
      accommodation: 'mid-range' as const
    }

    const results = getDummyDestinations(prefs)

    expect(results.length).toBeGreaterThan(0)
    results.forEach(dest => {
      expect(dest.estimatedCost.total).toBeLessThanOrEqual(prefs.budget * 1.2)
    })
  })
})
```

### Playwright E2E Tests

```typescript
// e2e/destination-finder.spec.ts
import { test, expect } from '@playwright/test'

test('should find destinations with form input', async ({ page }) => {
  await page.goto('/')

  // Fill form
  await page.getByLabel('Budget Total').fill('10000000')
  await page.getByLabel('Durasi').fill('5')
  await page.getByLabel('Jumlah Traveler').fill('2')
  await page.getByText('Santai').click()
  await page.getByText('Mid-Range').click()

  // Submit
  await page.getByText('Temukan Destinasi').click()

  // Wait for results
  await expect(page.getByText('Rekomendasi Destinasi')).toBeVisible()
  await expect(page.getByText('Bali')).toBeVisible()
})
```

---

## Summary

This guide covers all testing scenarios for the Destination Finder tool:

✅ **Dummy Data Testing** - Instant fallback without API
✅ **AI Integration Testing** - Real BytePlus DeepSeek calls
✅ **Edge Cases** - Extreme inputs and error handling
✅ **Performance** - Response times and load testing
✅ **Deployment** - Production and Vercel testing

**Quick Toggle:**
- Development → `USE_DUMMY_DATA: true`
- Production → `USE_DUMMY_DATA: false` + valid API key

The tool gracefully falls back to dummy data on any error, ensuring users always get results.
