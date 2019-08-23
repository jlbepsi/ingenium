import AuthService from "./Security/AuthService";

export default class BaseAPI {

  // Initializing important variables
  constructor(domain) {
    this.domain = domain // API server domain
  }

  apiGetAll(){

    return this.apiFetchGet(null);

    /*return fetch(this.domain)
      .then(BaseAPI._checkStatus)
      .then(response => response.json())
      .catch(err =>
        Promise.reject({
          type: 'Erreur réseau',
          status: -1,
          message: err,
        })
      );*/
  }

  /*apiGetAllWithOption(urlOption){

    return fetch(this.domain + '/' + urlOption)
      .then(BaseAPI._checkStatus)
      .then(response => response.json())
      .catch(err =>
          Promise.reject({
            type: 'Erreur réseau',
            status: -1,
            message: err,
          })
        );
  }*/

  apiGet(id){
    return this.apiFetchGet(id);

    /*const url = this.domain + '/' + id;
    return fetch(url)
      .then(BaseAPI._checkStatus)
      .then(response => response.json())
      .catch(err =>
        Promise.reject({
          type: 'Erreur réseau',
          status: -1,
          message: err,
        })
      );*/
  }

  apiPost(data) {
    return this.apiFetchWithData(null, 'POST', data);
  }
  apiPostWithURL(idOrUrl, data) {
    return this.apiFetchWithData(idOrUrl, 'POST', data);
  }
  apiPut(idOrUrl, data) {
    return this.apiFetchWithData(idOrUrl, 'PUT', data);
  }
  apiDelete(id) {
    return this.apiFetchWithData(id, 'DELETE', null);
  }
  apiDeleteWithURL(idOrUrl, data) {
    return this.apiFetchWithData(idOrUrl, 'DELETE', data);
  }

  apiFetchGet(id) {
    return this.apiFetchWithData(id, 'GET', null);
  }

  apiFetchWithData(urlToAdd, method, data) {
    console.log('apiFetchWithData')
    console.log(AuthService.getToken())

    // Données
    let fetchData = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getToken()
      }
    };
    if (data !== null) {
      // Ajout des données
      fetchData.body = JSON.stringify(data);
    }

    const url = this.domain + (urlToAdd == null ? '' : '/' + urlToAdd);
    console.log(url)
    console.log(method)
    console.log(data)

    return fetch(url, fetchData)
      .then(BaseAPI._checkStatus)
      .then(BaseAPI._parseJSON)
      .catch(err =>
        Promise.reject({
          type: 'Erreur réseau',
          status: -1,
          message: err,
        })
      );
  }


  static _parseJSON(response) {
    // Certaines réponses ne contiennent pas de JSON, exemple: HTTP DELETE
    return response.text().then(text => text ? JSON.parse(text) : {});
  }

  static _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    }

    throw new Error(response.statusText);
  }
}