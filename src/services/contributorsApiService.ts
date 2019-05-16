import { apiPost, apiPut, apiDelete } from "./baseApi";

interface Contributor {
  id: number
  sqlLogin: string
}

const URL = 'https://database.ws.montpellier.epsi.fr/api/contributors'

const addContributor = (newContributor: Contributor) => {
  return apiPost(URL, newContributor);
}

const modifyContributor = (contributor: Contributor) => {
  return apiPut(`${URL}/${contributor.sqlLogin}`, contributor);
}

const deleteContributor = (sqlLogin: string, contributor: Contributor) => {
  return apiDelete(`${URL}/${sqlLogin}`, contributor)
}