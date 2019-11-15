import * as http from '../utils/http'
import { decode } from '../utils/jwt'

interface LoginApiResponse {
  token: string
}

const URL = 'https://users.ws.montpellier.epsi.fr/api/auth'

export const login = async (username: string, password: string, role?: string) => {
  // Get a token from api server using the fetch api

  /* TOD : activate Authentication
  AuthService.setToken({name: username}); // Setting the token in sessionStorage
  */
 try {
   const response = await http.post<LoginApiResponse>(`${URL}/login`, {
     username,
     password,
     role
   })
 
   setToken(response.data.token) // Setting the token in sessionStorage
   return response
 } catch(error) {
   console.log(error)
 }
}

export const isLoggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken(); // Getting token from localstorage
  return token && !isTokenExpired(token) // handwaiving here
}

const isTokenExpired = (token: string) => {
  try {
    /* TOD : activate Authentication
    return false;*/
    const decoded = decode(token)
    return decoded.exp < Date.now() / 1000
  } catch (err) {
    return false
  }
}


// Saves user token to sessionStorage
const setToken = (idToken: string) => sessionStorage.setItem('id_token', idToken)

// Retrieves the user token from sessionStorage
export const getToken = () => sessionStorage.getItem('id_token')

// Clear user token and profile data from sessionStorage
const logout = () => sessionStorage.removeItem('id_token');

const getProfile = () => {
  /* TOD : activate Authentication
  return AuthService.getToken();*/
  const token = getToken()
  return token ? decode(token) : null
}


const fetch = async (url: string) => {
  // performs api calls sending the required authentication headers
  const headers: http.HTTPHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  // Setting Authorization header
  // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
  if (isLoggedIn()) {
    headers['Authorization'] = `Bearer ${getToken()}`
  }

  try {
    const response = await http.post(url, {}, headers)
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

  console.log(response);
  throw new Error(response.statusText);
}