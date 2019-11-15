import jwtDecode from 'jwt-decode'

interface TokenDto {
  foo: string
  exp: number
  iat: number
}

export const decode = (token: string) => jwtDecode<TokenDto>(token)