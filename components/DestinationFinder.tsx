'use client'

import React, { useState } from 'react'
import { Plane, Users, Calendar, Sparkles, Loader2 } from 'lucide-react'
import { TravelPreferences, DestinationRecommendation } from '../lib/types'
import DestinationResults from './DestinationResults'

const DestinationFinder: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<DestinationRecommendation[]>([])
  const [showResults, setShowResults] = useState(false)

  const [preferences, setPreferences] = useState<TravelPreferences>({
    budget: 10000000,
    duration: 5,
    travelStyle: 'santai',
    travelers: 2,
    accommodation: 'mid-range',
    interests: []
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setShowResults(false)

    try {
      const response = await fetch('/api/destination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })

      if (!response.ok) {
        throw new Error('Failed to get recommendations')
      }

      const data = await response.json()
      setRecommendations(data.recommendations)
      setShowResults(true)
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  if (showResults && recommendations.length > 0) {
    return (
      <DestinationResults
        recommendations={recommendations}
        onBack={() => setShowResults(false)}
        preferences={preferences}
      />
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Plane className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">
              Destination Finder
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            Temukan Destinasi Impian Anda
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Masukkan budget dan preferensi Anda, biarkan AI merekomendasikan destinasi terbaik lengkap dengan breakdown biaya dan itinerary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 p-8 md:p-10 shadow-lg">
          {/* Budget */}
          <div className="mb-8">
            <label className="block text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Budget Total (IDR)
            </label>
            <div className="relative">
              <input
                type="range"
                min="5000000"
                max="100000000"
                step="1000000"
                value={preferences.budget}
                onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-neutral-500">5 Juta</span>
                <span className="text-2xl font-serif font-bold text-primary-700">
                  {formatCurrency(preferences.budget)}
                </span>
                <span className="text-xs text-neutral-500">100 Juta</span>
              </div>
            </div>
          </div>

          {/* Duration & Travelers */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Durasi (Hari)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={preferences.duration}
                onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-neutral-200 focus:border-neutral-900 focus:outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">
                <Users className="w-4 h-4 inline mr-2" />
                Jumlah Traveler
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={preferences.travelers}
                onChange={(e) => setPreferences({ ...preferences, travelers: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-neutral-200 focus:border-neutral-900 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* Travel Style */}
          <div className="mb-8">
            <label className="block text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Gaya Perjalanan
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { value: 'santai', label: '🌴 Santai', desc: 'Relax & Chill' },
                { value: 'petualangan', label: '⛰️ Petualangan', desc: 'Outdoor & Active' },
                { value: 'kuliner', label: '🍜 Kuliner', desc: 'Food & Dining' },
                { value: 'budaya', label: '🏛️ Budaya', desc: 'Heritage & Art' },
                { value: 'belanja', label: '🛍️ Belanja', desc: 'Shopping' },
              ].map((style) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, travelStyle: style.value as any })}
                  className={`p-4 border-2 transition-all ${
                    preferences.travelStyle === style.value
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-2xl mb-1">{style.label.split(' ')[0]}</div>
                  <div className="text-xs font-bold">{style.label.split(' ')[1]}</div>
                  <div className="text-[10px] opacity-70 mt-1">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accommodation */}
          <div className="mb-8">
            <label className="block text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Tipe Akomodasi
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'budget', label: 'Budget', desc: 'Hostel/Guesthouse' },
                { value: 'mid-range', label: 'Mid-Range', desc: 'Hotel 3-4 Bintang' },
                { value: 'luxury', label: 'Luxury', desc: 'Hotel 5 Bintang' },
              ].map((acc) => (
                <button
                  key={acc.value}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, accommodation: acc.value as any })}
                  className={`p-4 border-2 transition-all ${
                    preferences.accommodation === acc.value
                      ? 'border-neutral-900 bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-sm font-bold mb-1">{acc.label}</div>
                  <div className="text-xs text-neutral-500">{acc.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-neutral-900 text-white font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Mencari Destinasi Terbaik...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Temukan Destinasi
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default DestinationFinder
