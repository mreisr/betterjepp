import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

interface ExportResult {
  success: boolean
  path?: string
  error?: string
}

const api = {
  // Settings
  getSettings: (): Promise<{
    apiUrl: string
    simbriefPilotId: string
    exportDir: string
    panelWidth: number
  }> => ipcRenderer.invoke('get-settings'),

  saveSettings: (settings: {
    apiUrl?: string
    simbriefPilotId?: string
    exportDir?: string
    panelWidth?: number
  }): Promise<boolean> => ipcRenderer.invoke('save-settings', settings),

  // Export
  selectDirectory: (): Promise<string | null> => ipcRenderer.invoke('select-directory'),

  exportChart: (data: {
    pdfData: number[]
    exportDir: string
    icao: string
    chartName: string
  }): Promise<ExportResult> => ipcRenderer.invoke('export-chart', data),

  getDefaultExportDir: (): Promise<string> => ipcRenderer.invoke('get-default-export-dir')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
