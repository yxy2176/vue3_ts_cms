import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import CMSRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const cmsRequest = new CMSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        //类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
  },
})

export default cmsRequest
