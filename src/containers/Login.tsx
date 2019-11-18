import React, { useState, ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react'
import { useHistory } from 'react-router'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContentWrapper from '../components/SnackBarContentWrapper/SnackBarContentWrapper'

import { login } from "../services/authService"
import CircularProgress from "@material-ui/core/CircularProgress"

type FormFields = { login: string, password: string }

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
}))

export default () => {
  const [loading, setLoading] = useState(false)
  const [form, setValues] = useState<FormFields>({
      login: '',
      password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [openSnackBar, setOpenSnackBar] = useState(false)  

  const classes = useStyles()
  const history = useHistory()

  const updateField = (fieldName: keyof FormFields) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...form,
        [fieldName]: e.target.value
    })
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' && form.login.length > 0 && form.password.length > 0) {
          handleSubmit()
      }
  } 

  const handleCloseSnackBar = (_?: SyntheticEvent<any, Event>, reason?: string) => {
      if (reason !== 'clickaway') {
        setOpenSnackBar(false)
      } 
  } 
  
  const openSnackbar = (message: string) => {
      setErrorMessage(message)
      setOpenSnackBar(true)
  } 
  
  const handleSubmit = async () => {
      setLoading(true)
      try {
        await login(form.login, form.password, "ROLE_USER")
        history.replace('/')
      } catch (error) {
        console.log(error)
        openSnackbar('Le login ou le mot de passe sont incorrects')
      }
      setLoading(false)
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
            onChange={updateField('login')}
            onKeyPress={handleKeyPress} />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin={"dense"}
            label="Mot de passe"
            name="password"
            type="password"
            value={form.password}
            onChange={updateField('password')}
            onKeyPress={handleKeyPress} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={handleSubmit} >
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
        onClose={handleCloseSnackBar} >
        <SnackbarContentWrapper
          onClose={handleCloseSnackBar}
          variant="error"
          message={errorMessage} />
      </Snackbar>
    </Container>
  )
}