export interface ChartInfo {
  icao: string
  filename: string
  proc_id: string
  chart_type: string
  type_name: string
  category: string
  date_eff: string
  sheet_id: string
  has_tcl: boolean
}

export interface ChartList {
  icao: string
  total: number
  charts: ChartInfo[]
}

export interface ChartType {
  code: string
  type: string
  category: string
}

export interface ChartTypesResponse {
  total: number
  types: ChartType[]
}

export interface HealthResponse {
  [key: string]: string
}

export interface paths {
  '/api/v1/chart-types': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': ChartTypesResponse
          }
        }
      }
    }
  }
  '/api/v1/charts/{icao}': {
    get: {
      parameters: {
        path: {
          icao: string
        }
        query?: {
          type?: string
          search?: string
        }
      }
      responses: {
        200: {
          content: {
            'application/json': ChartList
          }
        }
      }
    }
  }
  '/api/v1/charts/{icao}/export/{filename}': {
    get: {
      parameters: {
        path: {
          icao: string
          filename: string
        }
      }
      responses: {
        200: {
          content: {
            'application/pdf': Blob
          }
        }
      }
    }
  }
  '/health': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': HealthResponse
          }
        }
      }
    }
  }
}
