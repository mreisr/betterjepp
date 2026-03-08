import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { CollapsiblePanel } from '@/components/layout/CollapsiblePanel'
import { MainContent, PanelContent } from '@/components/layout/MainContent'
import { useChartsStore } from '@/stores/chartsStore'
import { rawFetch } from '@/lib/api-client'

function AppContent() {
  const setChartTypes = useChartsStore((s) => s.setChartTypes)

  useEffect(() => {
    const loadChartTypes = async () => {
      try {
        const result = await rawFetch.GET('/api/v1/chart-types')
        if (result.data) {
          setChartTypes(result.data.types || [])
        }
      } catch (error) {
        console.error('Failed to load chart types:', error)
      }
    }
    loadChartTypes()
  }, [setChartTypes])

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <CollapsiblePanel>
          <PanelContent />
        </CollapsiblePanel>
        <MainContent />
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
