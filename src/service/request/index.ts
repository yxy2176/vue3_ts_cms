import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { CMSRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置
/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class CMSRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: CMSRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        return config
      },
      (err) => {
        return err
      },
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      },
    )

    // 针对特定的cmsRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn,
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn,
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: CMSRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      const successFn = config.interceptors.requestSuccessFn

      // 确保传入的参数类型为 InternalAxiosRequestConfig，并处理返回值
      const result = successFn(config as InternalAxiosRequestConfig)

      // 如果成功拦截处理返回的是 Promise，需要等待它解析
      if (result instanceof Promise) {
        return result.then((resolvedConfig) => {
          // 处理后的配置与 Axios 请求相结合
          return this.instance.request(resolvedConfig)
        })
      }
      // 如果直接返回了配置，继续执行请求
      config = result
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: CMSRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: CMSRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: CMSRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: CMSRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default CMSRequest
