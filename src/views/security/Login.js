import React, { Component } from 'react';
import AuthService from '../../services/Security/AuthService';
import Button from "@material-ui/core/Button";


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: ''
        };

        this.authenticationService = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        if(AuthService.isLoggedIn())
            this.props.history.replace('/');
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleSubmit(event) {
        event.preventDefault();

        /* TODO : activate Authentication */
        this.authenticationService.login("test.v5", "123ABC");
        this.props.history.replace('/');
        /*
        this.authenticationService.loginWithRole(this.state.username, this.state.password, "ROLE_ADMIN")
            .then(res =>{
                console.log("login AuthService.login.then");
                this.props.history.replace('/');
            })
            .catch(error =>{
                console.log(error);
                this.setState({ errorMessage: 'Le login ou le mot de passe sont incorrects' });
            })

         */
    }

    render() {
        /* TODO : faire la page de connexion */
        return (
          <div>
                        <Button color='primary' onClick={this.handleSubmit} >Connexion</Button>
          </div>
        );
    }
}

export default Login;