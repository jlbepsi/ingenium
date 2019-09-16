import BaseAPI from "./BaseAPI";

export default class UtilisateursAPI extends BaseAPI {

  constructor() {
    super('https://users.ws.montpellier.epsi.fr/api/users');
  }

  /*
   * Gestion des utilisateurs
   *
   */
  getUsers() {
    return super.apiGetAll();
  }
  getUsersClasse(classe) {
    return super.apiFetchGet('classe/' + classe);
  }

  getUser(login) {
    return super.apiGet(login);
  }

}