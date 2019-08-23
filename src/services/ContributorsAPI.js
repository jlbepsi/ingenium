import BaseAPI from "./BaseAPI";


export default class ContributorsAPI extends BaseAPI {

  constructor() {
    super('http://database.ws.montpellier.epsi.fr/api/contributors');
  }

  addContributor(newContributor) {
    return super.apiPost(newContributor);
  }

  modifyContributor(contributor) {
    return super.apiPut(contributor.SqlLogin, contributor);
  }

  deleteContributor(loginsql, contributor) {
    return super.apiDeleteWithURL(loginsql, contributor)
  }
}