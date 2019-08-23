import BaseAPI from "./BaseAPI";

export default class DatabasesAPI extends BaseAPI {

  constructor() {
    super('http://database.ws.montpellier.epsi.fr/api/databases');
  }


  getDatabases(login) {
    return super.apiFetchWithData('/login/' + login, 'GET', null);
  }

  getDatabase(id) {
    return super.apiGet(id);
  }

  addDatabase(name, serverId, userLogin, userFullName) {
    const newDatabase =
      {
        "ServerId": serverId,
        "NomBD": name,
        "UserLogin": userLogin,
        "UserFullName": userFullName
      };

    return super.apiPost(newDatabase);
  }

  updateDatabase(database, userLogin) {
    const databaseUpdated =
      {
        "Id": database.Id,
        "ServerId": database.ServerId,
        "NomBD": database.NomBD,
        "UserLogin": userLogin,
        "Commentaire": database.Commentaire
      };

    return super.apiPut(databaseUpdated.Id, databaseUpdated);
  }

  deleteDatabase(id) {
    return super.apiDelete(id);
  }
}