import { BASE_URL, TIME_OUT } from './config'
import CMSRequest from './request'

const cmsRequest = new CMSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export default cmsRequest
