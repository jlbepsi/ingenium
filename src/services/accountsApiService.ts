import { apiGet, apiPost, apiPut, apiDelete } from './baseApi'

interface Account {
  serverId: number
  user: string
  password: string
}

const URL = 'https://database.ws.montpellier.epsi.fr/api/accounts'

const getAccounts = (login: string) => apiGet(`${URL}/userLogin/${login}`)

const getServerAccounts = (serverId: string) => apiGet(`${URL}/serverId/${serverId}`)

const getAccount = (id: number) => apiGet(`${URL}/userLogin/${id}`);

const addAccount = (account: Account) => apiPost(URL, {
  serverId: account.serverId,
  userLogin: account.user,
  password: account.password,
})

const updateAccount = (account: Account) => apiPost(`${URL}/${account.serverId}`, {
  serverId: account.serverId,
  userLogin: account.user,
  password: account.password,
})

const deleteAccount = (account: Account) => apiDelete(`${URL}/${account.serverId}`, {
  serverId: account.serverId,
  userLogin: account.user,
})