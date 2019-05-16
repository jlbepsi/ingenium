import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface HTTPHeader {
  [key: string]: string
}

export interface HTTPResponse {
  data: any
  status: number
  statusText: string
}

export const get = <T>(url: string, headers?: HTTPHeader) => {
  const options: AxiosRequestConfig = headers ? { headers } : {}
  return axios.get<T>(url, options)
    .then(response => formatResponse<T>(response))
}

export const post = <T>(url: string, body: any, headers?: HTTPHeader) => {
  const options: AxiosRequestConfig = headers ? { headers } : {}
  return axios.post<T>(url, body, options)
    .then(response => formatResponse<T>(response))
}

export const put = <T>(url: string, body: any, headers?: HTTPHeader) => {
  const options: AxiosRequestConfig = headers ? { headers } : {}
  return axios.put<T>(url, body, options)
    .then(response => formatResponse<T>(response))
}

export const patch = <T>(url: string, body: any, headers?: HTTPHeader) => {
  const options: AxiosRequestConfig = headers ? { headers } : {}
  return axios.patch<T>(url, body, options)
    .then(response => formatResponse<T>(response))
}

// As delete is a reserved keyword, we need to rename it
// Axios do not permit to send a payload with delete function as its a bad practice. So we need to use post function with delete method
export const deleteCall = <T>(url: string, body: any, headers?: HTTPHeader) => {
  const options: AxiosRequestConfig = headers ? { method: 'DELETE', headers } : { method: 'DELETE' }
  return axios.post<T>(url, body, options)
    .then(response => formatResponse<T>(response))
}

const formatResponse = <T>(response: AxiosResponse<T>): HTTPResponse => ({
  data: response.data,
  status: response.status,
  statusText: response.statusText,
})
