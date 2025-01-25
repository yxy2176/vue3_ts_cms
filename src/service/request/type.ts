/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// // 针对AxiosRequestConfig配置进行扩展
// export interface CMSInterceptors<T = AxiosResponse> {
//   requestSuccessFn?: (
//     config: AxiosRequestConfig,
//   ) => AxiosRequestConfig
//   requestFailureFn?: (err: any) => any
//   responseSuccessFn?: (res: T) => T
//   responseFailureFn?: (err: any) => any
// }

// export interface CMSRequestConfig<T = AxiosResponse>
//   extends AxiosRequestConfig {
//   interceptors?: CMSInterceptors<T>
// }

// 针对AxiosRequestConfig配置进行扩展
export interface CMSInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig, // 使用 InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> // 返回类型也需要匹配
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface CMSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CMSInterceptors<T>
}
