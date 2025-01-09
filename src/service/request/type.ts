/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface CMSInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: AxiosRequestConfig,
  ) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface CMSRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: CMSInterceptors<T>
}
