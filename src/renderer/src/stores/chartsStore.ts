import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChartInfo, ChartType } from '@/lib/api-types'
import { PinnedChart, ChartCategory } from '@/types'

interface ChartsState {
  currentIcao: string
  currentChart: ChartInfo | null
  chartTypes: ChartType[]
  pinnedCharts: PinnedChart[]
  categoryFilter: ChartCategory
  searchQuery: string

  setCurrentIcao: (icao: string) => void
  setCurrentChart: (chart: ChartInfo | null) => void
  setChartTypes: (types: ChartType[]) => void
  getTypeName: (code: string) => string
  pinChart: (chart: PinnedChart) => void
  unpinChart: (icao: string, filename: string) => void
  isPinned: (icao: string, filename: string) => boolean
  setCategoryFilter: (category: ChartCategory) => void
  setSearchQuery: (query: string) => void
}

export const useChartsStore = create<ChartsState>()(
  persist(
    (set, get) => ({
      currentIcao: '',
      currentChart: null,
      chartTypes: [],
      pinnedCharts: [],
      categoryFilter: 'all',
      searchQuery: '',

      setCurrentIcao: (icao: string) => {
        set({ currentIcao: icao.toUpperCase(), currentChart: null })
      },

      setCurrentChart: (chart: ChartInfo | null) => {
        set({ currentChart: chart })
      },

      setChartTypes: (types: ChartType[]) => {
        set({ chartTypes: types })
      },

      getTypeName: (code: string) => {
        const types = get().chartTypes
        const found = types.find((t) => t.code === code)
        return found?.type || code
      },

      pinChart: (chart: PinnedChart) => {
        const pinned = get().pinnedCharts
        const exists = pinned.some((p) => p.icao === chart.icao && p.filename === chart.filename)
        if (!exists) {
          set({ pinnedCharts: [...pinned, chart] })
        }
      },

      unpinChart: (icao: string, filename: string) => {
        set((state) => ({
          pinnedCharts: state.pinnedCharts.filter(
            (p) => !(p.icao === icao && p.filename === filename)
          )
        }))
      },

      isPinned: (icao: string, filename: string) => {
        return get().pinnedCharts.some((p) => p.icao === icao && p.filename === filename)
      },

      setCategoryFilter: (category: ChartCategory) => {
        set({ categoryFilter: category })
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query })
      }
    }),
    {
      name: 'betterjepp-charts',
      partialize: (state) => ({
        pinnedCharts: state.pinnedCharts,
        chartTypes: state.chartTypes
      })
    }
  )
)

export function categorizeChart(chart: ChartInfo): ChartCategory {
  const type = chart.chart_type?.toUpperCase() || ''
  const typeName = chart.type_name?.toUpperCase() || ''

  if (
    type === 'AD' ||
    type === 'AP' ||
    typeName.includes('TAXI') ||
    typeName.includes('AIRPORT DIAGRAM')
  ) {
    return 'taxi'
  }
  if (typeName.includes('SID') || typeName.includes('DP') || typeName.includes('DEPARTURE')) {
    return 'departure'
  }
  if (typeName.includes('STAR') || typeName.includes('ARRIVAL')) {
    return 'arrival'
  }
  if (
    typeName.includes('ILS') ||
    typeName.includes('RNAV (GPS)') ||
    typeName.includes('VOR') ||
    typeName.includes('NDB') ||
    typeName.includes('APPROACH') ||
    typeName.includes('APP')
  ) {
    return 'approach'
  }
  return 'other'
}
