# Quick Start Guide - aigpt.id Travel Platform

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your BytePlus API key
BYTEPLUS_API_KEY=your_actual_api_key_here
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

## 🎯 What You'll See

### Home Page Features:

1. **Destination Finder Tool** (Main Feature)
   - Budget slider: 5M - 100M IDR
   - Duration input
   - Number of travelers
   - Travel style selection (5 options with emojis)
   - Accommodation type (Budget/Mid-Range/Luxury)
   - Submit button to get AI recommendations

2. **AI-Powered Results**
   - 2-3 destination recommendations
   - Detailed cost breakdown:
     - Flights
     - Accommodation
     - Food
     - Activities
   - Day-by-day itinerary
   - Highlights of each destination
   - Best time to visit
   - Travel tips

3. **Other Travel Tools**
   - Trip Planner
   - Budget Calculator
   - (More coming soon)

## 🔧 How It Works

### User Flow:
1. User fills out the Destination Finder form
2. Clicks "Temukan Destinasi" button
3. Form data sent to `/api/destination` endpoint
4. BytePlus DeepSeek AI analyzes preferences
5. AI returns 2-3 tailored destination recommendations
6. Results displayed with beautiful formatting

### API Flow:
```
User Input → Next.js API Route → BytePlus DeepSeek API → AI Response → Parsed Results → User
```

## 📱 Features

- ✅ Fully responsive design
- ✅ Real-time budget formatting (IDR)
- ✅ Interactive form controls
- ✅ Loading states with animations
- ✅ Error handling
- ✅ Fallback responses
- ✅ Mobile-friendly
- ✅ SEO optimized

## 🎨 Design

- **Primary Color**: Emerald Green (#10b981)
- **Font**: DM Serif Display (headings) + Plus Jakarta Sans (body)
- **Style**: Clean, modern, professional
- **Theme**: Travel-focused with money/value emphasis

## 🔑 Required Setup

### BytePlus API Key
1. Sign up at [BytePlus/Volces](https://www.volcengine.com/)
2. Create an API key
3. Enable DeepSeek chat model access
4. Add key to `.env.local`

### Important Notes:
- API key is required for destination recommendations
- Without API key, the app will build but destination finder won't work
- The AI chatbot also uses the same API configuration

## 📂 Project Structure

```
aigpt/
├── app/
│   ├── api/
│   │   ├── destination/       # Destination recommendation API
│   │   │   └── route.ts
│   │   └── generate/          # AI chatbot API
│   │       └── route.ts
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── DestinationFinder.tsx  # Main form component
│   ├── DestinationResults.tsx # Results display
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── AiAdvisor.tsx          # Chatbot widget
├── lib/
│   ├── data.ts                # Travel tools data
│   ├── types.ts               # TypeScript types
│   └── aiService.ts           # AI service client
└── public/                    # Static assets
```

## 🧪 Testing

### Test the Destination Finder:
1. Go to homepage
2. Set budget to 15,000,000 IDR
3. Set duration to 5 days
4. Select 2 travelers
5. Choose "Santai" travel style
6. Select "Mid-Range" accommodation
7. Click "Temukan Destinasi"
8. Wait for AI to generate recommendations (10-15 seconds)
9. Review the results with cost breakdown

### Expected Result:
You should see 2-3 destinations like:
- Bali (domestic)
- Singapore (regional)
- Bangkok (regional)

Each with:
- Total cost within your budget
- Breakdown of flights, hotel, food, activities
- 5-day itinerary
- Tips and highlights

## 🚨 Troubleshooting

### "API key not configured" error
- Check `.env.local` file exists
- Verify `BYTEPLUS_API_KEY` is set
- Restart dev server after adding env vars

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

## 📊 Performance Tips

1. **Images**: Use optimized images in production
2. **Caching**: Enable API response caching if needed
3. **CDN**: Deploy static assets to CDN
4. **Database**: Consider caching popular destinations

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables (Vercel)
Add in Vercel dashboard:
- `BYTEPLUS_API_KEY`
- `BYTEPLUS_ENDPOINT`

### Other Platforms
- Netlify: Connect Git repo
- AWS Amplify: Follow deployment guide
- Docker: Use Node.js 18+ image

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [TRAVEL_UPDATE.md](./TRAVEL_UPDATE.md) - Complete feature documentation
- [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - Next.js migration notes

## 🤝 Need Help?

Check the documentation files or review the code comments for detailed explanations.

## ✨ What's Next?

Potential features to add:
- Save favorite destinations
- Share trip plans
- Export to PDF
- Real-time flight prices
- Hotel booking integration
- User accounts
- Trip history

Happy traveling! 🌍✈️
