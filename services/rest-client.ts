import axios from 'axios'

const client = axios.create({
  baseURL:
    typeof window === 'undefined' ? process.env.NEXT_PUBLIC_REST : '/api/rest',
})

export interface ApiResponse<T> {
  results: T[]
  info: {
    count: number
    next: string
    pages: number
    prev: string | null
  }
}

export class Api {
  static get<T>(url: string): (params: any) => Promise<ApiResponse<T>> {
    try {
      return async (params: any) => {
        return (await client.get(url, { params })).data
      }
    } catch (error) {
      return error
    }
  }
}

export default client
