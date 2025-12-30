import { Tool, Category } from './types'

export const TOOLS_DATA: Tool[] = [
  // TRAVEL
  {
    id: 'destination-finder',
    name: 'Destination Finder',
    category: Category.TRAVEL,
    shortDescription: 'Temukan destinasi wisata impian sesuai budget dan preferensi Anda.',
    fullDescription: 'Masukkan budget, durasi perjalanan, dan gaya liburan Anda. AI kami akan merekomendasikan destinasi terbaik lengkap dengan breakdown biaya, itinerary harian, dan tips perjalanan.',
    features: ['Rekomendasi Destinasi AI', 'Breakdown Biaya Detail', 'Itinerary Harian', 'Tips Perjalanan'],
    imageUrl: 'https://picsum.photos/seed/destination/400/300',
    priceModel: 'Gratis'
  },
  {
    id: 'trip-planner',
    name: 'Trip Planner',
    category: Category.TRAVEL,
    shortDescription: 'Generator itinerary liburan otomatis berdasarkan destinasi.',
    fullDescription: 'Sudah tahu mau ke mana? Masukkan destinasi dan preferensi Anda. TripPlanner akan menyusun jadwal harian lengkap, rekomendasi hotel sesuai budget, dan estimasi biaya transportasi.',
    features: ['Input Destinasi', 'Jadwal Hari-per-Hari', 'Estimasi Biaya Total', 'Rekomendasi Akomodasi'],
    imageUrl: 'https://picsum.photos/seed/travel_gen/400/300',
    priceModel: 'Gratis'
  },

  // PRODUCTIVITY
  {
    id: 'email-writer',
    name: 'Email Writer AI',
    category: Category.PRODUCTIVITY,
    shortDescription: 'Tulis email profesional dalam hitungan detik dengan AI.',
    fullDescription: 'Cukup masukkan poin-poin yang ingin disampaikan, AI akan menghasilkan email profesional dengan tone yang sesuai untuk bisnis, formal, atau casual.',
    features: ['Berbagai Tone', 'Multi Bahasa', 'Template Email', 'Grammar Check'],
    imageUrl: 'https://picsum.photos/seed/email/400/300',
    priceModel: 'Gratis'
  },
  {
    id: 'meeting-summarizer',
    name: 'Meeting Summarizer',
    category: Category.PRODUCTIVITY,
    shortDescription: 'Rangkum meeting notes menjadi action items yang jelas.',
    fullDescription: 'Upload atau paste transkrip meeting, AI akan membuat ringkasan, highlight poin penting, dan list action items dengan PIC masing-masing.',
    features: ['Auto Summary', 'Action Items', 'Key Points', 'Export PDF'],
    imageUrl: 'https://picsum.photos/seed/meeting/400/300',
    priceModel: 'Gratis'
  },
  {
    id: 'task-prioritizer',
    name: 'Task Prioritizer',
    category: Category.PRODUCTIVITY,
    shortDescription: 'AI yang membantu prioritas task berdasarkan deadline dan impact.',
    fullDescription: 'Masukkan daftar task Anda, AI akan menganalisa urgency, importance, dan dependensi untuk memberikan rekomendasi urutan pengerjaan yang optimal.',
    features: ['Eisenhower Matrix', 'Priority Score', 'Time Estimation', 'Calendar Sync'],
    imageUrl: 'https://picsum.photos/seed/task/400/300',
    priceModel: 'Freemium'
  },

  // CREATIVE
  {
    id: 'caption-generator',
    name: 'Caption Generator',
    category: Category.CREATIVE,
    shortDescription: 'Generate caption menarik untuk Instagram, TikTok, atau sosmed lainnya.',
    fullDescription: 'Upload foto atau deskripsikan konten Anda, AI akan membuat caption kreatif lengkap dengan emoji dan hashtag yang relevan.',
    features: ['Auto Hashtag', 'Emoji Smart', 'Multi Platform', 'Tone Adjustment'],
    imageUrl: 'https://picsum.photos/seed/caption/400/300',
    priceModel: 'Gratis'
  },
  {
    id: 'story-writer',
    name: 'Story Writer',
    category: Category.CREATIVE,
    shortDescription: 'AI co-writer untuk menulis cerita, novel, atau skenario.',
    fullDescription: 'Mulai dengan ide atau plot, AI akan membantu develop karakter, alur cerita, dialog, dan deskripsi scene. Cocok untuk penulis pemula maupun profesional.',
    features: ['Character Builder', 'Plot Generator', 'Dialogue Helper', 'Genre Specific'],
    imageUrl: 'https://picsum.photos/seed/story/400/300',
    priceModel: 'Freemium'
  },

  // LEARNING
  {
    id: 'explain-like-im-5',
    name: 'Explain Like I\'m 5',
    category: Category.LEARNING,
    shortDescription: 'Penjelasan konsep rumit dengan bahasa sederhana dan mudah dipahami.',
    fullDescription: 'Masukkan topik atau konsep yang sulit dipahami, AI akan menjelaskan dengan analogi sederhana, contoh konkret, dan bahasa yang mudah dimengerti.',
    features: ['Analogi Sederhana', 'Contoh Real', 'Visual Diagram', 'Multi Level'],
    imageUrl: 'https://picsum.photos/seed/eli5/400/300',
    priceModel: 'Gratis'
  },
  {
    id: 'study-planner',
    name: 'Study Planner',
    category: Category.LEARNING,
    shortDescription: 'Buat jadwal belajar efektif berdasarkan target dan waktu tersedia.',
    fullDescription: 'Input materi yang harus dipelajari dan deadline, AI akan membuat study plan dengan spaced repetition, pomodoro breaks, dan tips efektif.',
    features: ['Spaced Repetition', 'Pomodoro Timer', 'Progress Track', 'Smart Reminder'],
    imageUrl: 'https://picsum.photos/seed/study/400/300',
    priceModel: 'Gratis'
  },

  // HEALTH
  {
    id: 'meal-planner',
    name: 'AI Meal Planner',
    category: Category.HEALTH,
    shortDescription: 'Rencana menu sehat mingguan sesuai kebutuhan kalori dan preferensi.',
    fullDescription: 'Input target kalori, diet restriction, dan preferensi makanan. AI akan membuat meal plan lengkap dengan resep dan shopping list.',
    features: ['Calorie Calculator', 'Diet Customize', 'Recipe Library', 'Shopping List'],
    imageUrl: 'https://picsum.photos/seed/meal/400/300',
    priceModel: 'Freemium'
  },
  {
    id: 'workout-generator',
    name: 'Workout Generator',
    category: Category.HEALTH,
    shortDescription: 'Program latihan personal berdasarkan level fitness dan goal.',
    fullDescription: 'AI akan membuat workout plan yang disesuaikan dengan fitness level, peralatan yang tersedia, dan target (weight loss, muscle gain, endurance).',
    features: ['Custom Workout', 'Video Guide', 'Progress Track', 'Rest Day Optimizer'],
    imageUrl: 'https://picsum.photos/seed/workout/400/300',
    priceModel: 'Freemium'
  },

  // FINANCE
  {
    id: 'budget-analyzer',
    name: 'Budget Analyzer',
    category: Category.FINANCE,
    shortDescription: 'Analisa pengeluaran dan saran budget management yang smart.',
    fullDescription: 'Upload transaksi bulanan, AI akan mengkategorikan spending, identifikasi pola boros, dan memberikan rekomendasi budget allocation.',
    features: ['Auto Categorize', 'Spending Insight', 'Saving Tips', 'Financial Goals'],
    imageUrl: 'https://picsum.photos/seed/budget/400/300',
    priceModel: 'Gratis'
  },
  {
    id: 'investment-advisor',
    name: 'Investment Advisor',
    category: Category.FINANCE,
    shortDescription: 'Rekomendasi investasi sesuai profil risiko dan tujuan keuangan.',
    fullDescription: 'Jawab kuesioner profil risiko, AI akan merekomendasikan portfolio allocation (saham, obligasi, reksadana) dan strategi investasi.',
    features: ['Risk Profiling', 'Portfolio Suggestion', 'Market Insight', 'Rebalancing Alert'],
    imageUrl: 'https://picsum.photos/seed/invest/400/300',
    priceModel: 'Freemium'
  },

  // LIFESTYLE
  {
    id: 'gift-finder',
    name: 'Gift Finder',
    category: Category.LIFESTYLE,
    shortDescription: 'Rekomendasi hadiah unik berdasarkan personality dan budget.',
    fullDescription: 'Deskripsikan orang yang akan diberi hadiah (hobi, usia, personality), AI akan menyarankan gift ideas kreatif dan toko online yang jual.',
    features: ['Personality Match', 'Budget Filter', 'Occasion Specific', 'Shopping Link'],
    imageUrl: 'https://picsum.photos/seed/gift/400/300',
    priceModel: 'Gratis'
  },
  {
    id: 'style-advisor',
    name: 'Style Advisor',
    category: Category.LIFESTYLE,
    shortDescription: 'Personal stylist AI untuk outfit dan fashion recommendations.',
    fullDescription: 'Upload foto outfit atau lemari pakaian, AI akan memberi saran mix-match, warna yang cocok, dan shopping recommendation sesuai body type.',
    features: ['Outfit Match', 'Color Palette', 'Body Type Guide', 'Trend Analysis'],
    imageUrl: 'https://picsum.photos/seed/style/400/300',
    priceModel: 'Freemium'
  }
]