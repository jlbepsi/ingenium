import { apiGet } from "./baseApi";

const URL = 'https://users.ws.montpellier.epsi.fr/api/users'

const getUsers = () => apiGet(URL)

const getUsersClasse = (grade: string) => apiGet(`${URL}/classe/${grade}`)

const getUser = (username: string) => apiGet(`${URL}/${username}`)