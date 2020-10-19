import axios, { AxiosRequestConfig } from 'axios'

const client = axios.create({
  baseURL: typeof window === 'undefined' ? process.env.api : '/api',
})

export class Api {
  static get(url: string): any {
    try {
      return async (config?: AxiosRequestConfig) =>
        (await client.get(url, config)).data
    } catch (error) {
      return error
    }
  }
}

export default client
