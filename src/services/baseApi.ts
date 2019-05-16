import { getToken } from './authService'
import * as http from '../utils/http'

export const apiGet = (url: string) => {
  return apiRequest(url, http.get);
}

export const apiPost = (url: string, data?: any) => {
  return apiRequest(url, http.post, data);
}

export const apiPut = (url: string, data?: any) => {
  return apiRequest(url, http.put, data);
}

export const apiDelete = (url: string, data?: any) => {
  return apiRequest(url, http.deleteCall, data);
}

const apiRequest = async (url: string, requestFn: Function, data: any = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }

  try {
    const response = await requestFn(url, data, headers)
    checkResponseStatus(response)
    return response
  } catch (err) {
    return {
      type: 'Erreur réseau',
      status: -1,
      message: err,
    }
  }
}

const checkResponseStatus = (response: http.HTTPResponse) => {
  // raises an error in case response status is not a success
  if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
    return response;
  }

  throw new Error(response.statusText);
}