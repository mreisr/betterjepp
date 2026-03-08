import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import type { paths } from './api-types'

const DEFAULT_BASE_URL = 'http://localhost:8080'

let baseUrl = DEFAULT_BASE_URL
let fetchClient = createFetchClient<paths>({ baseUrl })
let apiClient = createClient(fetchClient)

export function updateApiBaseUrl(url: string) {
  baseUrl = url || DEFAULT_BASE_URL
  fetchClient = createFetchClient<paths>({ baseUrl })
  apiClient = createClient(fetchClient)
}

export function getApiBaseUrl(): string {
  return baseUrl
}

export const api = apiClient
export const rawFetch = fetchClient
