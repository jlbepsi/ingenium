import BaseAPI from "./BaseAPI";

export default class DatabasesAPI extends BaseAPI {

  constructor() {
    super('https://database.ws.montpellier.epsi.fr/api/databases');
  }


  getDatabases(login) {
    return super.apiFetchWithData('login/' + login, 'GET', null);
  }

  getDatabase(id) {
    return super.apiGet(id);
  }

  addDatabase(name, serverId, userLogin, userFullName) {
    const newDatabase =
      {
        "serverId": serverId,
        "nomBd": name,
        "userLogin": userLogin,
        "userFullName": userFullName
      };

    return super.apiPost(newDatabase);
  }

  updateDatabase(database, userLogin) {
    const databaseUpdated =
      {
        "id": database.id,
        "serverId": database.serverId,
        "nomBd": database.nomBd,
        "userLogin": userLogin,
        "commentaire": database.Commentaire
      };

    return super.apiPut(databaseUpdated.Id, databaseUpdated);
  }

  deleteDatabase(id) {
    return super.apiDelete(id);
  }
}