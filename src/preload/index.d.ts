import { ElectronAPI } from '@electron-toolkit/preload'

interface AppSettings {
  apiUrl: string
  simbriefPilotId: string
  exportDir: string
  panelWidth: number
}

interface ExportResult {
  success: boolean
  path?: string
  error?: string
}

interface Api {
  getSettings: () => Promise<AppSettings>
  saveSettings: (settings: Partial<AppSettings>) => Promise<boolean>
  selectDirectory: () => Promise<string | null>
  exportChart: (data: {
    pdfData: number[]
    exportDir: string
    icao: string
    chartName: string
  }) => Promise<ExportResult>
  getDefaultExportDir: () => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
