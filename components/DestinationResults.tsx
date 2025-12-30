'use client'

import React, { useState } from 'react'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Lightbulb,
  CheckCircle,
  Plane,
  Hotel,
  UtensilsCrossed,
  Ticket,
  ChevronDown,
  ChevronUp,
  Clock,
  Info
} from 'lucide-react'
import { DestinationRecommendation, TravelPreferences } from '../lib/types'

interface DestinationResultsProps {
  recommendations: DestinationRecommendation[]
  onBack: () => void
  preferences: TravelPreferences
}

// Country color themes
const getCountryTheme = (country: string) => {
  const themes: Record<string, { from: string; to: string; light: string; border: string; text: string }> = {
    'Indonesia': {
      from: 'from-red-600',
      to: 'to-red-500',
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900'
    },
    'Thailand': {
      from: 'from-blue-600',
      to: 'to-blue-500',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900'
    },
    'Japan': {
      from: 'from-pink-600',
      to: 'to-red-500',
      light: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-900'
    },
    'Singapore': {
      from: 'from-emerald-600',
      to: 'to-emerald-500',
      light: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900'
    },
    'Malaysia': {
      from: 'from-yellow-600',
      to: 'to-amber-500',
      light: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900'
    },
    'Vietnam': {
      from: 'from-amber-600',
      to: 'to-orange-500',
      light: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900'
    },
    'South Korea': {
      from: 'from-indigo-600',
      to: 'to-purple-500',
      light: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-900'
    },
    'Australia': {
      from: 'from-teal-600',
      to: 'to-cyan-500',
      light: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-teal-900'
    },
    // Default theme for unlisted countries
    'default': {
      from: 'from-primary-700',
      to: 'to-primary-600',
      light: 'bg-primary-50',
      border: 'border-primary-200',
      text: 'text-primary-900'
    }
  }

  return themes[country] || themes['default']
}

const DestinationResults: React.FC<DestinationResultsProps> = ({
  recommendations,
  onBack,
  preferences,
}) => {
  const [expandedItinerary, setExpandedItinerary] = useState<Record<number, boolean>>({})
  const [expandedDestination, setExpandedDestination] = useState<Record<number, boolean>>({
    0: true // First destination expanded by default
  })

  const toggleItinerary = (recIndex: number) => {
    setExpandedItinerary(prev => ({
      ...prev,
      [recIndex]: !prev[recIndex]
    }))
  }

  const toggleDestination = (recIndex: number) => {
    setExpandedDestination(prev => ({
      ...prev,
      [recIndex]: !prev[recIndex]
    }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Form</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-3">
            Rekomendasi Destinasi untuk Anda
          </h1>
          <p className="text-neutral-600">
            Berdasarkan budget {formatCurrency(preferences.budget)} untuk {preferences.travelers} orang selama {preferences.duration} hari
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-8">
          {recommendations.map((rec, index) => {
            const theme = getCountryTheme(rec.country)
            const isExpanded = expandedDestination[index]
            const isItineraryExpanded = expandedItinerary[index]

            return (
              <div key={index} className="border border-neutral-200 bg-white shadow-lg overflow-hidden">
                {/* Header - Always visible, clickable to expand/collapse */}
                <div
                  className={`bg-gradient-to-r ${theme.from} ${theme.to} text-white p-6 cursor-pointer hover:opacity-95 transition-opacity`}
                  onClick={() => toggleDestination(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-sm font-medium opacity-90">{rec.country}</span>
                        <span className="ml-auto lg:hidden">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </span>
                      </div>
                      <h2 className="text-3xl font-serif font-bold mb-2">{rec.destination}</h2>
                      <p className="text-sm opacity-90 max-w-2xl">{rec.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm opacity-90 mb-1 flex items-center justify-end gap-1">
                        <DollarSign className="w-4 h-4" />
                        Total Estimasi
                      </div>
                      <div className="text-3xl font-bold">{formatCurrency(rec.estimatedCost.total)}</div>
                      <div className="text-xs opacity-75 flex items-center justify-end gap-1 mt-1">
                        <Info className="w-3 h-3" />
                        untuk {preferences.travelers} orang
                      </div>
                      <div className="mt-3 hidden lg:block">
                        {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                  <>
                    {/* Cost Breakdown */}
                    <div className={`p-6 ${theme.light} border-b ${theme.border}`}>
                      <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.text} mb-4 flex items-center gap-2`}>
                        <DollarSign className="w-4 h-4" />
                        Breakdown Biaya
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 border border-neutral-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Plane className="w-4 h-4 text-neutral-500" />
                            <div className="text-xs text-neutral-500">Penerbangan</div>
                          </div>
                          <div className="text-xl font-bold text-neutral-900">{formatCurrency(rec.estimatedCost.flights)}</div>
                        </div>
                        <div className="bg-white p-4 border border-neutral-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Hotel className="w-4 h-4 text-neutral-500" />
                            <div className="text-xs text-neutral-500">Akomodasi</div>
                          </div>
                          <div className="text-xl font-bold text-neutral-900">{formatCurrency(rec.estimatedCost.accommodation)}</div>
                        </div>
                        <div className="bg-white p-4 border border-neutral-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <UtensilsCrossed className="w-4 h-4 text-neutral-500" />
                            <div className="text-xs text-neutral-500">Makanan</div>
                          </div>
                          <div className="text-xl font-bold text-neutral-900">{formatCurrency(rec.estimatedCost.food)}</div>
                        </div>
                        <div className="bg-white p-4 border border-neutral-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Ticket className="w-4 h-4 text-neutral-500" />
                            <div className="text-xs text-neutral-500">Aktivitas</div>
                          </div>
                          <div className="text-xl font-bold text-neutral-900">{formatCurrency(rec.estimatedCost.activities)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Highlights */}
                        <div>
                          <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.text} mb-4 flex items-center gap-2`}>
                            <Star className={`w-4 h-4 ${theme.text.replace('text-', 'text-').replace('-900', '-600')}`} />
                            Highlights
                          </h3>
                          <ul className="space-y-2">
                            {rec.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-neutral-700">
                                <CheckCircle className={`w-4 h-4 ${theme.text.replace('text-', 'text-').replace('-900', '-600')} mt-0.5 flex-shrink-0`} />
                                <span className="text-sm">{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Best Time */}
                          <div className={`mt-6 p-4 ${theme.light} border ${theme.border} rounded-lg`}>
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className={`w-4 h-4 ${theme.text.replace('text-', 'text-').replace('-900', '-700')}`} />
                              <span className={`text-xs font-bold uppercase tracking-wider ${theme.text}`}>
                                Waktu Terbaik
                              </span>
                            </div>
                            <p className={`text-sm ${theme.text}`}>{rec.bestTimeToVisit}</p>
                          </div>
                        </div>

                        {/* Itinerary - Collapsible */}
                        <div>
                          <div
                            className="flex items-center justify-between mb-4 cursor-pointer group"
                            onClick={() => toggleItinerary(index)}
                          >
                            <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.text} flex items-center gap-2`}>
                              <Clock className="w-4 h-4" />
                              Itinerary Rekomendasi
                              <span className="text-xs font-normal normal-case opacity-70">
                                ({rec.itinerary.length} hari)
                              </span>
                            </h3>
                            <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
                              {isItineraryExpanded ? (
                                <ChevronUp className="w-5 h-5 text-neutral-600" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-neutral-600" />
                              )}
                            </button>
                          </div>

                          {/* Collapsed view - Show first 3 days */}
                          {!isItineraryExpanded && (
                            <div className="space-y-3">
                              {rec.itinerary.slice(0, 3).map((day, idx) => (
                                <div key={idx} className={`border-l-2 ${theme.border.replace('border-', 'border-l-')} pl-4 pb-3`}>
                                  <div className={`text-xs font-bold ${theme.text.replace('-900', '-700')} mb-1 flex items-center gap-1`}>
                                    <span className={`w-6 h-6 rounded-full ${theme.light} flex items-center justify-center text-xs font-bold ${theme.text}`}>
                                      {day.day}
                                    </span>
                                    Hari {day.day}
                                  </div>
                                  <ul className="space-y-1 ml-7">
                                    {day.activities.slice(0, 2).map((activity, actIdx) => (
                                      <li key={actIdx} className="text-sm text-neutral-700 flex items-start gap-2">
                                        <span className="text-neutral-400 mt-0.5">•</span>
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                    {day.activities.length > 2 && (
                                      <li className="text-xs text-neutral-500 italic ml-4">
                                        +{day.activities.length - 2} aktivitas lainnya...
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              ))}
                              {rec.itinerary.length > 3 && (
                                <div className="text-center py-2">
                                  <button
                                    onClick={() => toggleItinerary(index)}
                                    className={`text-sm ${theme.text.replace('-900', '-700')} hover:underline font-medium`}
                                  >
                                    Lihat {rec.itinerary.length - 3} hari lainnya...
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Expanded view - Show all days */}
                          {isItineraryExpanded && (
                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                              {rec.itinerary.map((day, idx) => (
                                <div key={idx} className={`border-l-2 ${theme.border.replace('border-', 'border-l-')} pl-4 pb-3`}>
                                  <div className={`text-xs font-bold ${theme.text.replace('-900', '-700')} mb-2 flex items-center gap-2`}>
                                    <span className={`w-6 h-6 rounded-full ${theme.light} flex items-center justify-center text-xs font-bold ${theme.text}`}>
                                      {day.day}
                                    </span>
                                    Hari {day.day}
                                  </div>
                                  <ul className="space-y-1 ml-7">
                                    {day.activities.map((activity, actIdx) => (
                                      <li key={actIdx} className="text-sm text-neutral-700 flex items-start gap-2">
                                        <span className="text-neutral-400 mt-0.5">•</span>
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tips */}
                      {rec.tips && rec.tips.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-neutral-200">
                          <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.text} mb-4 flex items-center gap-2`}>
                            <Lightbulb className={`w-4 h-4 ${theme.text.replace('text-', 'text-').replace('-900', '-600')}`} />
                            Tips Perjalanan
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {rec.tips.map((tip, idx) => (
                              <div key={idx} className={`flex items-start gap-2 text-sm text-neutral-600 ${theme.light} p-3 border ${theme.border} rounded-lg hover:shadow-sm transition-shadow`}>
                                <CheckCircle className={`w-4 h-4 ${theme.text.replace('text-', 'text-').replace('-900', '-600')} flex-shrink-0 mt-0.5`} />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer CTA */}
                    <div className={`p-6 ${theme.light} border-t ${theme.border}`}>
                      <button className={`w-full py-3 bg-gradient-to-r ${theme.from} ${theme.to} text-white font-bold uppercase tracking-wider hover:opacity-90 transition-opacity rounded-lg shadow-md hover:shadow-lg`}>
                        Mulai Rencanakan Perjalanan
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default DestinationResults
