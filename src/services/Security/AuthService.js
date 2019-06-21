import decode from 'jwt-decode';


export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://192.168.100.185:8081/api/auth'; // API server domain
    AuthService.fetch = AuthService.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this)
  }

  login(username, password) {
    return this.loginWithRole(username, password, null)
  }

  loginWithRole(username, password, role) {
    /* TODO : activate Authentication */
    AuthService.setToken({login: username}); // Setting the token in localStorage
    return true;

    // Get a token from api server using the fetch api
    /*
    return AuthService.fetch(`${this.domain}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        role
      })
    }).then(res => {
      console.log("AuthService.login");
      AuthService.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    })
    */
  }

  static isLoggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken(); // Getting token from localstorage
    return !!token && !AuthService.isTokenExpired(token) // handwaiving here
  }

  static isTokenExpired(token) {
    try {
      /* TODO : activate Authentication */
      return false;
      /*
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
      */
    }
    catch (err) {
      return false;
    }
  }

  static setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  static getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  static logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  static getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(AuthService.getToken());
  }


  static fetch(url, fetchData) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (AuthService.isLoggedIn()) {
      headers['Authorization'] = 'Bearer ' + AuthService.getToken();
    }
    fetchData["headers"] = headers;

    return fetch(url, fetchData)
      .then(AuthService._checkStatus)
      .then(response => response.json())
  }

  static _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    }

    console.log(response);
    throw new Error(response.statusText);
  }
}