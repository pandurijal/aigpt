import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userQuery, contextTools } = await request.json()

    if (!userQuery) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // BytePlus API configuration
    const apiKey = process.env.BYTEPLUS_API_KEY
    const endpoint = process.env.BYTEPLUS_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemInstruction = `
Anda adalah konsultan profesional untuk platform 'aigpt.id'.
Tugas Anda adalah membantu pengguna menemukan alat chat yang tepat dari direktori kami, atau memberikan ide solusi jika alat belum tersedia.

Konteks Direktori Alat Kami:
${contextTools}

Panduan Gaya Bicara:
- Profesional, ramah, dan membantu.
- Gunakan Bahasa Indonesia yang baik dan benar (baku namun luwes).
- Jangan terdengar seperti robot. Hindari kata-kata "Saya adalah AI". Gunakan "Kami" atau "Saya" sebagai konsultan.
- Jika ada alat yang cocok di daftar, rekomendasikan alat tersebut dengan menyebutkan namanya.
- Jika tidak ada, berikan ide konseptual bagaimana alat semacam itu bisa dibangun atau solusi alternatif.
- Jawab dengan ringkas (maksimal 3 paragraf).
`

    // Call BytePlus DeepSeek API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // DeepSeek model identifier
        messages: [
          {
            role: 'system',
            content: systemInstruction,
          },
          {
            role: 'user',
            content: userQuery,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('BytePlus API Error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate response' },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Extract the response text from DeepSeek's response format
    const responseText = data.choices?.[0]?.message?.content ||
      'Mohon maaf, saya tidak dapat memproses permintaan Anda saat ini.'

    return NextResponse.json({ text: responseText })
  } catch (error) {
    console.error('API Route Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
