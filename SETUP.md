# Next.js Setup Guide - aigpt.id

This project has been successfully migrated to Next.js with BytePlus DeepSeek API integration.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- BytePlus API account with DeepSeek model access

## Installation

1. Install dependencies:
```bash
npm install
```

## Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your BytePlus API credentials:
```env
BYTEPLUS_API_KEY=your_actual_api_key_here
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### Getting BytePlus API Keys

1. Sign up for a BytePlus account at https://www.volcengine.com/
2. Navigate to the API section and create a new API key
3. Enable access to the DeepSeek chat model
4. Copy the API key to your `.env.local` file

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── generate/          # BytePlus DeepSeek API route
│   │       └── route.ts
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/                # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── AiAdvisor.tsx         # AI chatbot component
│   ├── ToolCard.tsx
│   ├── CategoryFilter.tsx
│   └── SeoContent.tsx
├── lib/
│   ├── data.ts               # Tools data
│   ├── types.ts              # TypeScript types
│   └── aiService.ts          # AI service client
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## API Integration

### BytePlus DeepSeek API

The AI consultation feature uses BytePlus's DeepSeek model through a Next.js API route:

- **Endpoint**: `/api/generate`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "userQuery": "User's question",
    "contextTools": "Context about available tools"
  }
  ```
- **Response**:
  ```json
  {
    "text": "AI-generated response"
  }
  ```

### How it Works

1. User interacts with the AI Advisor chatbot
2. Client sends request to `/api/generate` endpoint
3. Next.js API route calls BytePlus DeepSeek API with system instructions
4. Response is returned to the client and displayed in the chat

## Features

- ✅ Next.js 15 with App Router
- ✅ Server-side API routes for secure API key handling
- ✅ BytePlus DeepSeek integration for AI chat
- ✅ Tailwind CSS for styling
- ✅ TypeScript for type safety
- ✅ Responsive design
- ✅ SEO optimized

## Deployment

This project can be deployed to:

- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your Git repository
- **Docker**: Use the included Dockerfile (if available)

### Environment Variables for Deployment

Make sure to set these environment variables in your deployment platform:
- `BYTEPLUS_API_KEY`
- `BYTEPLUS_ENDPOINT`

## Troubleshooting

### API Key Issues
- Verify your API key is correct in `.env.local`
- Ensure the API key has access to DeepSeek models
- Check that the endpoint URL is correct for your region

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be 18+)

## Support

For issues or questions, please refer to:
- Next.js Documentation: https://nextjs.org/docs
- BytePlus Documentation: https://www.volcengine.com/docs
