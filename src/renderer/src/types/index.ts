export interface PinnedChart {
  icao: string
  filename: string
  proc_id: string
  type_name: string
}

export interface AppSettings {
  apiUrl: string
  simbriefPilotId: string
  exportDir: string
  panelWidth: number
}

export type ChartCategory = 'all' | 'taxi' | 'departure' | 'arrival' | 'approach' | 'other'

export type SidebarTab = 'flight' | 'airport' | 'settings'

export const DEFAULT_SETTINGS: AppSettings = {
  apiUrl: 'http://localhost:8080',
  simbriefPilotId: '',
  exportDir: '',
  panelWidth: 280
}

export const DEFAULT_PANEL_WIDTH = 280
export const MIN_PANEL_WIDTH = 200
export const MAX_PANEL_WIDTH = 400
