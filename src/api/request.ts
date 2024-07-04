import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

export interface IRequsetConfig {
  baseUrl: string
  token: string
}

export class HttpRequest {
  private baseUrl: string
  private token: string
  private pending: Map<string, AbortController>

  constructor(requsetConfig: IRequsetConfig) {
    this.baseUrl = requsetConfig.baseUrl
    this.token = requsetConfig.token
    this.pending = new Map()
  }

  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      timeout: 10_000,
    }
    return config
  }

  removePending(key: string, isRequest = false) {
    if (this.pending.has(key) && isRequest) {
      this.pending.get(key)!.abort()
    }
    this.pending.delete(key)
  }

  // 设定拦截器
  interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      (config) => {
        // 这里的请求头设置只是示例，可以根据自己的需求修改
        config.headers.set('token', this.token)

        const key = `${config.url}&${config.method}`
        this.removePending(key, true)
        const controller = new AbortController()
        config.signal = controller.signal
        this.pending.set(key, controller)
        return config
      },
      (err) => Promise.reject(err)
    )

    // 响应请求的拦截器
    instance.interceptors.response.use(
      (res) => {
        const key = `${res.config.url}&${res.config.method}`
        this.removePending(key)
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      // 这里可以根据项目需要定义统一的错误相应泛型
      (err: AxiosError<any>) => {
        return Promise.reject(err)
      }
    )
  }

  private request<T>(options: AxiosRequestConfig): Promise<T> {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return new Promise((resolve, reject) => {
      instance(newOptions)
        .then((res) => resolve(res as unknown as Promise<T>))
        .catch((err) => reject(err))
    })
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const options = Object.assign(
      {
        method: 'get',
        url,
      },
      config
    )
    return this.request(options)
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const options = Object.assign(
      {
        method: 'post',
        url,
        data,
      },
      config
    )
    return this.request(options)
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const options = Object.assign(
      {
        method: 'put',
        url,
        data,
      },
      config
    )
    return this.request(options)
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const options = Object.assign(
      {
        method: 'delete',
        url,
      },
      config
    )
    return this.request(options)
  }
}

export default HttpRequest
