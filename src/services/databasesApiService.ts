import { apiGet, apiPost, apiPut, apiDelete } from './baseApi'

interface Database {
  id: number
  serverId: number
  nomBd: string
  commentaire: string
}

const URL = 'https://database.ws.montpellier.epsi.fr/api/databases'

const getDatabases = (login: string) => {
  return apiGet(`${URL}/login/${login}`);
}

const getDatabase = (id: number) => {
  return apiGet(`${URL}/${id}`);
}

const addDatabase = (name: string, serverId: number, userLogin: string, userFullName: string) => apiPost(URL, {
  serverId, userLogin, userFullName,
  nomBd: name,
})

const updateDatabase = (database: Database, userLogin: string) => apiPut(`${URL}/${database.id}`, {
  userLogin,
  id: database.id,
  serverId: database.serverId,
  nomBd: database.nomBd,
  commentaire: database.commentaire
})

const deleteDatabase = (id: number) => apiDelete(`${URL}/${id}`)
