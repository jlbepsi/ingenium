import React from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../services/Security/AuthService";

export default function Logout(props) {

    AuthService.logout();

    return(
      <Redirect to='/login' />
    );
}

/*class Logout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        AuthService.logout();

        return (
            <Redirect to='/login' />
        );
    }
}

export default Logout;*/