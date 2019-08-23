import BaseAPI from "./BaseAPI";

export default class AccountsAPI extends BaseAPI {

  constructor() {
    super('http://database.ws.montpellier.epsi.fr/api/accounts');
  }


  getAccounts(login) {
    return super.apiFetchWithData('/userlogin/' + login, 'GET', null);
  }

  getAccount(id) {
    return super.apiGet(id);
  }

  addAccount(account) {
    const newAccount =
      {
        "ServerId": account.serverid,
        "UserLogin": account.user,
        "Password": account.password,
      };

    return super.apiPost(newAccount);
  }

  updateAccount(account) {
    const accountUpdated =
      {
        "ServerId": account.serverid,
        "UserLogin": account.user,
        "Password": account.password,
      };

    return super.apiPut(accountUpdated.ServerId, accountUpdated);
  }

  deleteAccount(account) {
    const accountDeleted =
      {
        "ServerId": account.serverid,
        "UserLogin": account.user,
      };

    return super.apiDeleteWithURL(accountDeleted.ServerId, accountDeleted);
  }
}