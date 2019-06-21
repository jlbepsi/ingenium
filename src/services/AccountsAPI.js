import BaseAPI from "./BaseAPI";

import accounts from './mockup/accounts'

export default class AccountsAPI { //extends BaseAPI {

  constructor() {
    //super('http://accounts.webservices.montpellier.epsi.fr/api/accounts');
    //super('http://localhost:8081/api/accounts');

    this.accountsMock = accounts;
  }


  getAccounts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.accountsMock);
      }, 1000);
    });
  }

  getAccount(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const account = this.accountsMock.find(accountMock => accountMock.Id === id);

        if (account) {
          resolve(account);
        } else {
          reject({
            error: 'Compte SQL non trouvé'
          });
        }
      }, 500);
    });
  }

  addAccount(newAccount) {
    /*const newAccount =
      {
        "user": "test.v8",
        "password": password,
        "serverid": serverId,
      };*/

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let account = this.accountsMock.find(account => account.DatabaseServerName.Id === newAccount.serverid);
        account.SqlLogin = newAccount.user;
        account.UserLogin = newAccount.user;

        if (account) {
          resolve(account);
        } else {
          reject({
            error: 'Compte SQL non ajouté'
          });
        }
      }, 500);
    });
  }

  updateAccount(account) {
    /*const newAccount =
      {
        "loginsql": "test.v8",
        "password": password,
        "serverid": serverid,
      };*/

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(true);
      }, 500);
    });
  }

  deleteAccount(loginsql, servercode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        let deleted = false;
        this.accountsMock.forEach( (account) => {
            if (account.DatabaseServerName.Code === servercode && account.SqlLogin === loginsql) {
              account.SqlLogin = null;
              deleted = true;
            }
          }
        );

        if (deleted) {
          resolve(null);
        } else {
          reject({
            error: 'Compte SQL non trouvé'
          });
        }
      }, 500);
    });
  }
}