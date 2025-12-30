# BytePlus ARK (Southeast Asia) - Setup Guide

## ✅ Your Configuration

You're using:
- **Endpoint**: `https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions`
- **Model**: `deepseek-v3`
- **Region**: Southeast Asia (ap-southeast)

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Copy Environment Template

```bash
cp .env.example .env.local
```

### Step 2: Add Your API Key

Edit `.env.local`:

```bash
# Your actual API key from BytePlus console
ARK_API_KEY=your_actual_api_key_here

# Endpoint (already configured correctly)
BYTEPLUS_ENDPOINT=https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions
```

**Note**: You can use either `ARK_API_KEY` or `BYTEPLUS_API_KEY` - both work!

### Step 3: Start the Server

```bash
npm run dev
```

---

## 🧪 Test the API

### Test 1: Verify Dummy Data Works

```bash
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

**Expected**: Instant response with Bali/Bangkok/Tokyo

---

### Test 2: Verify Real API Works

**Prerequisites:**
- ✅ `ARK_API_KEY` set in `.env.local`
- ✅ Server restarted after adding key
- ✅ `USE_DUMMY_DATA: false` (already set)

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
- Realistic pricing

**Check server logs:**
```
🤖 Calling DeepSeek v3.1 API...
✅ DeepSeek API response received
📝 Response preview: {"recommendations":[...
✅ Valid recommendations generated: 3
```

---

## 🔍 Direct API Test

Test BytePlus directly with your curl command:

```bash
curl https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ARK_API_KEY" \
  -d '{
    "model": "deepseek-v3",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful travel assistant."
      },
      {
        "role": "user",
        "content": "Recommend a 5-day trip to Bangkok for 2 people with budget Rp 15 million"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 1000
  }'
```

**Expected response:**
```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "created": 1735468800,
  "model": "deepseek-v3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Here's a 5-day Bangkok itinerary..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 50,
    "completion_tokens": 200,
    "total_tokens": 250
  }
}
```

---

## 🎛️ Configuration Files

### Current Settings

**`lib/prompts/destination-prompt.ts`:**
```typescript
export const DEEPSEEK_API_CONFIG = {
  model: 'deepseek-v3',     // ✅ Your model
  temperature: 0.7,
  max_tokens: 4000,
  top_p: 0.9,
  frequency_penalty: 0.1,
  presence_penalty: 0.1,
}
```

**`lib/destination-service.ts`:**
```typescript
export const DESTINATION_CONFIG = {
  USE_DUMMY_DATA: false,    // ✅ AI mode enabled

  API_ENDPOINT: process.env.BYTEPLUS_ENDPOINT ||
    'https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions',  // ✅ Your endpoint

  MODEL: 'deepseek-v3',     // ✅ Your model
  TEMPERATURE: 0.8,
  MAX_TOKENS: 3000,
}
```

**`app/api/destination/route.ts`:**
```typescript
// Supports both environment variable names
const apiKey = process.env.ARK_API_KEY || process.env.BYTEPLUS_API_KEY
```

---

## 🐛 Troubleshooting

### Issue: "ARK_API_KEY not configured"

**Check:**
```bash
# 1. Verify .env.local exists
ls -la .env.local

# 2. Check key is set
cat .env.local | grep ARK_API_KEY

# 3. Restart server (IMPORTANT!)
# Stop server (Ctrl+C)
npm run dev
```

---

### Issue: 401 Unauthorized

**Possible causes:**
- Wrong API key
- API key expired
- Wrong endpoint region

**Solution:**
```bash
# 1. Test API key directly
curl https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ARK_API_KEY" \
  -d '{"model": "deepseek-v3", "messages": [{"role": "user", "content": "hello"}]}'

# 2. If fails, regenerate API key in BytePlus console
# 3. Update .env.local with new key
# 4. Restart server
```

---

### Issue: Wrong endpoint error

**Check endpoint matches your region:**

```bash
# Southeast Asia (your current setup)
https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions

# Other regions (if needed):
# China: https://ark.cn-beijing.volces.com/api/v3/chat/completions
# US: https://ark.us-east-1.volces.com/api/v3/chat/completions
```

---

## 📊 Expected Performance

### Response Times
- **Dummy data**: < 100ms
- **DeepSeek V3 AI**: 8-15 seconds (normal)
- **Network timeout**: > 30 seconds (check connection)

### Costs (DeepSeek V3)
- **Per request**: ~$0.004 (~Rp 64)
- **100 users/month**: ~$1.20 (~Rp 19k)
- **1000 users/month**: ~$12 (~Rp 192k)

---

## ✅ Verification Checklist

Before testing:
- [ ] `.env.local` file exists
- [ ] `ARK_API_KEY` is set (not "your_api_key_here")
- [ ] Server restarted after adding key
- [ ] `USE_DUMMY_DATA: false` in `lib/destination-service.ts`
- [ ] Check browser console for errors
- [ ] Check server terminal for logs

During testing:
- [ ] Submit form with valid inputs
- [ ] Wait 8-15 seconds for response
- [ ] See loading state ("Mencari Destinasi Terbaik...")
- [ ] Get 2-3 destination cards
- [ ] Each has cost breakdown, itinerary, tips

Server logs should show:
```
🤖 Calling DeepSeek v3.1 API...
✅ DeepSeek API response received
📝 Response preview: {"recommendations":[...
✅ Valid recommendations generated: 3
```

---

## 🚀 Deploy to Production

### Vercel

**1. Set environment variable:**
- Go to Vercel Dashboard
- Settings → Environment Variables
- Add:
  - Name: `ARK_API_KEY`
  - Value: `your_actual_api_key`
  - Environments: Production, Preview, Development

**2. Deploy:**
```bash
git add .
git commit -m "Configure BytePlus ARK Southeast Asia endpoint"
git push origin main
```

**3. Test production:**
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

---

## 📚 Related Documentation

- **Quick Start**: `QUICK_REFERENCE.md`
- **Full Guide**: `API_INTEGRATION_GUIDE.md`
- **Prompt Engineering**: `DEEPSEEK_PROMPT_GUIDE.md`
- **Testing**: `TESTING_GUIDE.md`

---

## 💡 Pro Tips

### Faster Development
```typescript
// During development, use dummy data to avoid API costs
// lib/destination-service.ts
USE_DUMMY_DATA: true  // Free & instant
```

### Monitor API Usage
Check BytePlus console for:
- Request count
- Token usage
- Cost breakdown
- Error rates

### Cost Optimization
```typescript
// Reduce max_tokens for faster & cheaper responses
max_tokens: 3000  // Instead of 4000
// Trade-off: Might get only 2 destinations instead of 3
```

---

**Status**: ✅ Configured for BytePlus ARK Southeast Asia
**Endpoint**: `https://ark.ap-southeast.bytepluses.com`
**Model**: `deepseek-v3`
**Ready to test**: Yes!
