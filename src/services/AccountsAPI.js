import BaseAPI from "./BaseAPI";

export default class AccountsAPI extends BaseAPI {

  constructor() {
    //super('https://database.ws.montpellier.epsi.fr/api/accounts');
    super('http://localhost:5000/api/accounts');
  }


  getAccounts(login) {
    return super.apiFetchWithData('userLogin/' + login, 'GET', null);
  }
  getServerAccounts(serverId) {
    return super.apiFetchWithData('serverId/' + serverId, 'GET', null);
  }

  getAccount(id) {
    return super.apiGet(id);
  }

  addAccount(account) {
    const newAccount =
      {
        "serverId": account.serverId,
        "userLogin": account.user,
        "password": account.password,
      };

    return super.apiPost(newAccount);
  }

  updateAccount(account) {
    const accountUpdated =
      {
        "serverId": account.serverId,
        "userLogin": account.user,
        "password": account.password,
      };

    return super.apiPut(accountUpdated.serverId, accountUpdated);
  }

  deleteAccount(account) {
    const accountDeleted =
      {
        "serverId": account.serverId,
        "userLogin": account.user,
      };

    return super.apiDeleteWithURL(accountDeleted.serverId, accountDeleted);
  }
}