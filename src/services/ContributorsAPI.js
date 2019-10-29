import BaseAPI from "./BaseAPI";


export default class ContributorsAPI extends BaseAPI {

  constructor() {
    //super('https://database.ws.montpellier.epsi.fr/api/contributors');
    super('http://localhost:8070/api/contributors');
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