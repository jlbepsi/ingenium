import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from  "../../services/Security/AuthService"

const MainLayout = ({component: Component, ...rest}) => {

  const isLoggedIn = AuthService.isLoggedIn();

  return (

    isLoggedIn ? (
      <Route {...rest} render={matchProps => (
          <Component {...matchProps} />
      )} />
    ) : (
      <Redirect to={{ pathname: '/login'}} />
    )
  )
};

export default MainLayout;