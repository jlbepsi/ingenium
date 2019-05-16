import React from 'react'
import { Route as RouteBase, RouteProps, Redirect } from 'react-router-dom'
import { isLoggedIn } from  '../../services/authService'

const InsecureRoute = (props: RouteProps) => <RouteBase {...props} />
const ProtectedRoute = (props: RouteProps) => isLoggedIn() ? (
  <RouteBase {...props} />
) : (
  <Redirect to={{ pathname: '/login'}} />
)

export default ({component, withAuth = false, ...props}: Props) => (
  withAuth ? <ProtectedRoute {...props} /> : <InsecureRoute {...props} />
)

interface Props extends RouteProps {
  withAuth?: boolean
}