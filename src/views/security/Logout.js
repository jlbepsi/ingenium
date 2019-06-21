import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../../services/Security/AuthService";



class Logout extends Component {

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

export default Logout;