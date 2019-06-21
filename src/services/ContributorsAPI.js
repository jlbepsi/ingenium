import BaseAPI from "./BaseAPI";


export default class ContributorsAPI { //extends BaseAPI {

  constructor() {
    //super('http://accounts.webservices.montpellier.epsi.fr/api/accounts');
    //super('http://localhost:8081/api/accounts');
  }

  addContributor(newContributor) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        resolve(newContributor);
      }, 500);
    });
  }

  modifyContributor(contributor) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        resolve(contributor);
      }, 500);
    });
  }

  deleteContributor(loginsql) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(null);
      }, 500);
    });
  }
}