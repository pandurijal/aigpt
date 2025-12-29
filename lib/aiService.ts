export const getConsultationResponse = async (userQuery: string, contextTools: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userQuery,
        contextTools,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    return data.text || 'Mohon maaf, saya tidak dapat memproses permintaan Anda saat ini.'
  } catch (error) {
    console.error('AI Service Error:', error)
    return 'Terjadi kesalahan saat menghubungi server konsultasi. Silakan coba lagi.'
  }
}
