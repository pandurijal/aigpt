# DeepSeek v3.1 API Integration - Quick Start Guide

## 🚀 Setup & Configuration

### Step 1: Get API Key from BytePlus

1. Visit [BytePlus ARK Platform](https://console.volcengine.com/ark)
2. Create account / Log in
3. Navigate to **API Keys** section
4. Create new API key for DeepSeek
5. Copy the key (starts with `ep-...`)

### Step 2: Configure Environment

Create/update `.env.local`:

```bash
# BytePlus ARK API Configuration
BYTEPLUS_API_KEY=ep-20241229xxxxxxxxxxxxxxxxxxxxx
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions

# Optional: Toggle dummy data for development
# Set USE_DUMMY_DATA=true in lib/destination-service.ts for testing
```

⚠️ **Important**: Never commit `.env.local` to git!

### Step 3: Toggle Production Mode

```typescript
// lib/destination-service.ts
export const DESTINATION_CONFIG = {
  USE_DUMMY_DATA: false,  // ← Set to false for AI mode

  API_ENDPOINT: process.env.BYTEPLUS_ENDPOINT ||
    'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
  MODEL: 'deepseek-chat',
  TEMPERATURE: 0.8,
  MAX_TOKENS: 3000,
}
```

### Step 4: Restart Dev Server

```bash
npm run dev
```

---

## 🧪 Testing the Integration

### Test 1: Dummy Data (Quick Test)

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Test API
curl -X POST http://localhost:3000/api/destination \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 10000000,
    "duration": 5,
    "travelStyle": "santai",
    "travelers": 2,
    "accommodation": "mid-range"
  }'
```

**Expected**: Instant response with Bali/Bangkok/Tokyo data

---

### Test 2: Real AI (With API Key)

**Prerequisites:**
- ✅ `BYTEPLUS_API_KEY` in `.env.local`
- ✅ `USE_DUMMY_DATA: false`
- ✅ Server restarted

```bash
curl -X POST http://localhost:3000/api/destination \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 15000000,
    "duration": 5,
    "travelStyle": "kuliner",
    "travelers": 2,
    "accommodation": "mid-range"
  }'
```

**Expected**:
- Response time: 8-15 seconds
- 2-3 AI-generated destinations
- Realistic 2024-2025 pricing
- Detailed itineraries

**Check Server Logs:**
```
🤖 Calling DeepSeek v3.1 API...
✅ DeepSeek API response received
📝 Response preview: {"recommendations":[{"destination":"Bangkok"...
✅ Valid recommendations generated: 3
```

---

## 📊 API Request/Response Format

### Request

```typescript
POST /api/destination

Headers:
  Content-Type: application/json

Body:
{
  "budget": 15000000,          // IDR (5M - 100M)
  "duration": 5,               // Days (1-30)
  "travelStyle": "kuliner",    // santai | petualangan | kuliner | budaya | belanja
  "travelers": 2,              // People (1-10)
  "accommodation": "mid-range", // budget | mid-range | luxury
  "interests": []              // Optional: ["photography", "diving"]
}
```

### Response (Success)

```json
{
  "recommendations": [
    {
      "destination": "Bangkok",
      "country": "Thailand",
      "description": "Kota metropolitan yang menggabungkan kuil Buddha bersejarah dengan mall modern dan street food kelas dunia.",
      "estimatedCost": {
        "flights": 4500000,
        "accommodation": 4000000,
        "food": 4000000,
        "activities": 2000000,
        "total": 14500000
      },
      "highlights": [
        "Grand Palace & Wat Phra Kaew yang megah",
        "Pasar apung Damnoen Saduak & pasar malam",
        "Street food legendaris di Yaowarat (Chinatown)",
        "Shopping di MBK, Siam Paragon, Chatuchak",
        "Rooftop bars dengan city view spektakuler"
      ],
      "itinerary": [
        {
          "day": 1,
          "activities": [
            "Tiba di Suvarnabhumi Airport, naik Airport Rail Link",
            "Check-in hotel di Sukhumvit",
            "Jalan-jalan di IconSiam Mall",
            "Makan malam di Asiatique The Riverfront"
          ]
        },
        // ... 4 more days
      ],
      "bestTimeToVisit": "November - Februari (musim dingin/sejuk) dengan suhu 25-30°C",
      "tips": [
        "Beli Rabbit Card untuk naik BTS/MRT lebih mudah",
        "Download Grab untuk transportasi",
        "Tukar uang di Super Rich (rate lebih bagus)",
        "Dress code: tutupi bahu & lutut saat ke kuil",
        "Bawa power bank, Bangkok panas dan banyak jalan kaki",
        "Coba street food: Pad Thai, Som Tam, Mango Sticky Rice"
      ]
    },
    // ... 1-2 more destinations
  ]
}
```

### Response (Error)

```json
{
  "error": "Missing required fields"
}
```

**Status Codes:**
- `200` - Success (includes dummy data fallback)
- `400` - Bad Request (missing fields)
- `500` - Server Error (rare, usually falls back to dummy)

---

## 🎯 Prompt System Architecture

### Files Structure

```
lib/prompts/
└── destination-prompt.ts
    ├── DESTINATION_SYSTEM_PROMPT     (9,000+ characters)
    ├── USER_QUERY_TEMPLATE(prefs)    (Dynamic user query)
    └── DEEPSEEK_API_CONFIG           (Model parameters)

app/api/destination/
└── route.ts
    ├── Imports prompt system
    ├── Calls DeepSeek API
    ├── Validates response
    └── Falls back to dummy data
```

### Prompt Components

**1. System Prompt (DESTINATION_SYSTEM_PROMPT):**
- Role definition
- Knowledge areas
- Critical requirements
- JSON schema
- Calculation guidelines
- Travel style mappings
- Common mistakes to avoid
- Quality checklist
- Example calculations

**2. User Query Template:**
```typescript
USER_QUERY_TEMPLATE({
  budget: 15000000,
  duration: 5,
  travelers: 2,
  travelStyle: 'kuliner',
  accommodation: 'mid-range'
})
```

**Output:**
```
Saya ingin merencanakan perjalanan dengan detail berikut:

📊 BUDGET & DURASI:
- Budget Total: Rp 15.000.000
- Durasi Perjalanan: 5 hari
- Jumlah Traveler: 2 orang

🎯 PREFERENSI:
- Gaya Perjalanan: Kuliner (fokus kuliner, food tours, street food)
- Tipe Akomodasi: Mid-range (hotel 3-4 bintang)

🎯 TUGAS ANDA:
Rekomendasikan 2-3 destinasi...
```

---

## 🔧 Advanced Configuration

### Adjusting AI Behavior

```typescript
// lib/prompts/destination-prompt.ts
export const DEEPSEEK_API_CONFIG = {
  model: 'deepseek-chat',

  temperature: 0.7,        // ← Lower = more consistent
                           //   Higher = more creative
                           //   Range: 0.0 - 1.0

  max_tokens: 4000,        // ← Response length
                           //   3000 = ~2 destinations
                           //   4000 = ~3 destinations

  top_p: 0.9,              // ← Nucleus sampling
                           //   Lower = more focused

  frequency_penalty: 0.1,  // ← Reduce repetition
                           //   Range: 0.0 - 2.0

  presence_penalty: 0.1,   // ← Encourage diversity
                           //   Range: 0.0 - 2.0
};
```

### Parameter Tuning Guide

| Goal | Adjust | To |
|------|--------|-----|
| More consistent JSON | temperature | 0.5 - 0.6 |
| More creative destinations | temperature | 0.8 - 0.9 |
| Faster responses | max_tokens | 2500 - 3000 |
| More destinations | max_tokens | 4500 - 5000 |
| Less repetitive tips | frequency_penalty | 0.2 - 0.3 |
| More destination variety | presence_penalty | 0.2 - 0.3 |

---

## 🐛 Troubleshooting

### Issue 1: Always Returns Dummy Data

**Symptoms:**
- Same Bali/Bangkok/Tokyo every time
- Instant response (< 1 second)

**Diagnosis:**
```typescript
// Check these in order:

1. Is USE_DUMMY_DATA = false?
   → lib/destination-service.ts line 15

2. Is BYTEPLUS_API_KEY set?
   → .env.local file

3. Did you restart the server?
   → Ctrl+C then npm run dev

4. Check server logs:
   → Should see: "🤖 Calling DeepSeek v3.1 API..."
   → If you see: "BYTEPLUS_API_KEY not configured"
      → API key missing or incorrect
```

**Solution:**
```bash
# 1. Check .env.local exists
ls -la .env.local

# 2. Verify API key format
cat .env.local | grep BYTEPLUS_API_KEY
# Should output: BYTEPLUS_API_KEY=ep-xxxxx

# 3. Restart server
npm run dev
```

---

### Issue 2: API Error 401 (Unauthorized)

**Symptoms:**
```
BytePlus API Error: {"error": "invalid_api_key"}
```

**Causes:**
- Expired API key
- Wrong API key
- Wrong endpoint region

**Solution:**
```bash
# 1. Generate new API key from BytePlus console
# 2. Update .env.local
BYTEPLUS_API_KEY=ep-NEW_KEY_HERE

# 3. Verify endpoint region
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
# OR for other regions:
# https://ark.us-east-1.volces.com/api/v3/chat/completions
```

---

### Issue 3: JSON Parse Error

**Symptoms:**
```
❌ Invalid AI response format, using dummy data
JSON Parse Error: Unexpected token < in JSON at position 0
```

**Cause:**
AI returned markdown-wrapped JSON:
````
```json
{
  "recommendations": [...]
}
```
````

**Solution:**
Already handled by regex extraction in `parseAIResponse()`:
```typescript
const jsonMatch = responseText.match(/\{[\s\S]*\}/)
const jsonText = jsonMatch ? jsonMatch[0] : responseText
```

If still failing:
1. Check server logs for full response text
2. Update regex pattern if needed
3. Adjust system prompt to emphasize "NO markdown formatting"

---

### Issue 4: Costs Exceed Budget

**Symptoms:**
- Total cost > user's budget
- Unrealistic prices

**Diagnosis:**
```typescript
// Check response in browser DevTools:
const rec = response.recommendations[0]
console.log('Total:', rec.estimatedCost.total)
console.log('Budget:', preferences.budget)
console.log('Exceeds?', rec.estimatedCost.total > preferences.budget)
```

**Solution:**
1. **Short-term**: Use dummy data fallback (already implemented)
2. **Long-term**: Update system prompt with stricter constraints:

```typescript
// Add to DESTINATION_SYSTEM_PROMPT:
"CRITICAL: The total cost MUST be at least 5% BELOW the budget.
Calculate: maxAllowed = budget * 0.95
If any destination exceeds this, REDUCE costs or REPLACE destination."
```

---

### Issue 5: Itinerary Length Mismatch

**Symptoms:**
- User requests 5 days, gets 7 days
- User requests 3 days, gets 5 days

**Diagnosis:**
```typescript
console.log('Requested duration:', preferences.duration)
console.log('Itinerary length:', rec.itinerary.length)
```

**Solution:**
Add validation in API route:
```typescript
// After parsing response
parsedResponse.recommendations = parsedResponse.recommendations.map(rec => ({
  ...rec,
  itinerary: rec.itinerary.slice(0, preferences.duration)
}))
```

Or strengthen system prompt:
```typescript
"CRITICAL: The itinerary array MUST have EXACTLY {duration} items.
No more, no less. Count twice before responding."
```

---

## 📈 Performance Monitoring

### Key Metrics to Track

```typescript
// Add to app/api/destination/route.ts

const startTime = Date.now()

// ... API call ...

const endTime = Date.now()
const duration = endTime - startTime

console.log('⏱️ API Response Time:', duration + 'ms')
console.log('📊 Response Size:', JSON.stringify(data).length, 'bytes')
console.log('🎯 Destinations Returned:', parsedResponse.recommendations.length)
```

**Benchmarks:**
- ⚡ **Fast**: < 5 seconds (rare, depends on server load)
- ✅ **Normal**: 8-15 seconds
- ⚠️ **Slow**: 15-30 seconds (high load or large max_tokens)
- ❌ **Timeout**: > 30 seconds (network issue)

---

## 💰 Cost Management

### DeepSeek v3 Pricing (via BytePlus ARK)

**Input Tokens**: ~$0.27 per 1M tokens
**Output Tokens**: ~$1.10 per 1M tokens

### Cost Per Request Estimate

**System Prompt**: ~2,500 tokens (input)
**User Query**: ~150 tokens (input)
**AI Response**: ~3,000 tokens (output)

**Total Cost Per Request**:
- Input: 2,650 tokens × $0.27/1M = $0.0007155
- Output: 3,000 tokens × $1.10/1M = $0.0033
- **Total: ~$0.004 per request (~Rp 64)**

**Monthly Estimates:**
| Daily Users | Requests/Day | Monthly Cost |
|-------------|--------------|--------------|
| 10 users | 30 | $3.60 (~Rp 57k) |
| 100 users | 300 | $36 (~Rp 576k) |
| 1000 users | 3000 | $360 (~Rp 5.8 juta) |

### Cost Optimization Tips

1. **Cache Common Queries**
```typescript
// Implement Redis cache for popular destinations
const cacheKey = `${budget}_${duration}_${style}_${accommodation}`
const cached = await redis.get(cacheKey)
if (cached) return cached
```

2. **Reduce max_tokens** (if acceptable)
```typescript
max_tokens: 3000  // 2 destinations instead of 3
// Saves ~25% on output costs
```

3. **Use Dummy Data for Testing**
```typescript
if (process.env.NODE_ENV === 'development') {
  DESTINATION_CONFIG.USE_DUMMY_DATA = true
}
```

---

## 🚀 Production Deployment

### Vercel Deployment

**1. Environment Variables**
```bash
# In Vercel Dashboard → Settings → Environment Variables
BYTEPLUS_API_KEY=ep-xxxxxxxxxxxxx
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

**2. Build Settings**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

**3. Deploy**
```bash
# Commit changes
git add .
git commit -m "Add DeepSeek v3.1 integration"
git push origin main

# Vercel auto-deploys on push
# Or manually: vercel --prod
```

**4. Verify Production**
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

**5. Monitor Logs**
- Vercel Dashboard → Deployments → Latest → Functions
- Click `/api/destination`
- View real-time logs

---

## 📚 Additional Resources

### Documentation Files

| File | Purpose |
|------|---------|
| `DEEPSEEK_PROMPT_GUIDE.md` | In-depth prompt engineering guide |
| `DESTINATION_TOOL_DESIGN.md` | Complete design specification |
| `TESTING_GUIDE.md` | Testing procedures & cases |
| `ARCHITECTURE.md` | System architecture overview |
| `API_INTEGRATION_GUIDE.md` | This file (quick start) |

### External Links

- [BytePlus ARK Console](https://console.volcengine.com/ark)
- [DeepSeek Documentation](https://platform.deepseek.com/docs)
- [BytePlus API Docs](https://www.volcengine.com/docs/82379/1099320)

---

## ✅ Pre-Launch Checklist

Before going live:

- [ ] API key configured in production environment
- [ ] `USE_DUMMY_DATA = false` in production
- [ ] Test with real API in staging environment
- [ ] Verify costs are within budget (< 95% of user budget)
- [ ] Check itinerary lengths match duration
- [ ] Confirm JSON parsing success rate > 95%
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure rate limiting (10 req/min per IP)
- [ ] Test fallback to dummy data on API failure
- [ ] Verify mobile responsiveness
- [ ] Review sample outputs for quality

---

**Last Updated**: 2025-12-29
**API Version**: DeepSeek v3.1 (deepseek-chat)
**Status**: ✅ Production Ready
