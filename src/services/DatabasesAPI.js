import BaseAPI from "./BaseAPI";

import databases from './mockup/databases'

export default class DatabasesAPI { //extends BaseAPI {

  constructor() {
    //super('http://users.webservices.montpellier.epsi.fr/api/users');
    //super('http://localhost:8081/api/users');

    this.databasesMock = databases;
  }


  getDatabases() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.databasesMock);
      }, 700);
    });
  }

  getDatabase(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const database = this.databasesMock.find(database => database.Id === id);

        if (database) {
          resolve(database);
        } else {
          reject({
            error: 'Base de données non trouvée'
          });
        }
      }, 500);
    });
  }

  addDatabase(name, accountid) {
    let newDatabase =
      {
        "DatabaseGroupUsers":[
          {
            "DbId":111,
            "SqlLogin":"test.v8",
            "UserLogin":"test.v8",
            "UserFullName":"V8 Test",
            "GroupType":1,
            "AddedByUserLogin":"test.v8"
          }
        ],
        "DatabaseServerName":{
          "Id":3,
          "Code":"mysql",
          "Name":"MySQL test",
          "IPLocale":"0.0.0.0",
          "NomDNS":"mysql.montpellier.epsi.fr",
          "Description": "MySQL",
          "CanAddDatabase":1
        },
        "Id":111,
        "ServerId":0,
        "NomBD":name,
        "DateCreation":"2019-06-18",
        "Commentaire":"bla bla"
      };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(newDatabase);
      }, 500);
    });
  }

  updateDatabase(databaseUpdated) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const database = this.databasesMock.find(database => database.Id === databaseUpdated.Id);

        if (database) {
          resolve(database);
        } else {
          reject({
            error: 'Base de données non trouvée'
          });
        }
      }, 500);
    });
  }

  deleteDatabase(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        this.databasesMock = this.databasesMock.filter(d => d.Id !== id);

        resolve(null);
      }, 500);
    });
  }
}