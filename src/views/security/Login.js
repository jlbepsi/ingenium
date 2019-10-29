import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../share/SnackbarContentWrapper";

import AuthService from "../../services/Security/AuthService";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonProgress: {
        marginRight: '8px',
    },
}));

export default function SignIn(props) {
    const authenticationService = new AuthService();

    const classes = useStyles();

    const [loading, setLoading] = React.useState( false);
    const [form, setValues] = React.useState({
        login: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = React.useState('');
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    function handleKeyPress(event) {
        if (event.key === 'Enter' && form.login.length > 0 && form.password.length > 0) {
            handleSubmit();
        }
    }

    function handleCloseSnackBar (event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    }

    function openSnackbar(message) {
        setErrorMessage(message);
        setOpenSnackBar(true);
    }


    function handleSubmit() {
        setLoading(true);
        authenticationService.loginWithRole(form.login, form.password, "ROLE_USER")
          .then(res =>{
              setLoading(false);
              props.history.replace('/');
          })
          .catch(error =>{
              setLoading(false);
              console.log(error);
              openSnackbar('Le login ou le mot de passe sont incorrects');
          })
    }

return (
<Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
          Ingenium
      </Typography>
      <div className={classes.form}>
          <TextField
            variant="outlined"
            required
            fullWidth
            margin={"dense"}
            label="Identifiant"
            name="login"
            autoFocus

            value={form.login}
            onChange={updateField}
            onKeyPress={handleKeyPress}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin={"dense"}
            label="Mot de passe"
            name="password"
            type="password"

            value={form.password}
            onChange={updateField}
            onKeyPress={handleKeyPress}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}

            onClick={handleSubmit}
          >
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              Connexion
          </Button>
      </div>
  </div>


  <Snackbar
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
    }}
    open={openSnackBar}
    autoHideDuration={4000}
    onClose={handleCloseSnackBar}
  >
      <SnackbarContentWrapper
        onClose={handleCloseSnackBar}
        variant={"error"}
        message={errorMessage}
      />
  </Snackbar>
</Container>
);
}