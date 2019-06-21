import React, {useEffect} from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";

import ButtonStyled from "../../../../share/ButtonStyled";
import AccountListItem from "../../AccountListItem";



function DialogModifyAccount(props) {

  const [errors, setErrors] = React.useState([]);
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [btnAddDisabled, setBtnAddDisabled] = React.useState(0);

  const PASSWORD_EMPTY = 0x1;
  const PASSWORD_LENGTH_INF = 0x2;
  const PASSWORDCONFIRM_EMPTY = 0x4;
  const PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY = 0x8;

  useEffect( () => {
      console.log('DialogModifyAccount - props.useEffect')
      verifyBtnAddDisabled()
    }, [password, passwordConfirm]
  );

  const { classes, onClose, onActionValidate, accountSelected, ...other } = props;

  function handleAction () {
    onActionValidate(accountSelected.SqlLogin, password, accountSelected.DatabaseServerName.Id);
  }
  function handleClose () {
    onClose('dialogmodifyaccount');
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }
  function handleChangeConfirmPassword(event) {
    setPasswordConfirm(event.target.value);
  }

  function verifyBtnAddDisabled() {

    let errorsList = [];

    let disabled = 0x0;
    if (password.length === 0) {
      disabled |= PASSWORD_EMPTY;
      errorsList.push('Le mot de passe doit être renseigné');
    } else if (password.length < 6) {
      disabled |= PASSWORD_LENGTH_INF;
      errorsList.push('La longueur minimale doit être de 6 caractères');
    }
    if (passwordConfirm.length === 0) {
      disabled |= PASSWORDCONFIRM_EMPTY;
      errorsList.push('La confirmation du mot de passe doit être renseigné');
    } else if (password !== passwordConfirm) {
      disabled |= PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY;
      errorsList.push('Les mots de passe doivent être identiques');
    }

    setErrors(errorsList);
    setBtnAddDisabled(disabled);
  }

  function displayErrors() {
    if (errors.length === 0) {
      return (<div className={classes.noErrors} >&nbsp;</div>)
    }

    return (
      <div className={classes.errorMessages} >
        <ul>
          {errors.map( (error, index) => (
            <li key={index}><strong>{error}</strong></li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={true}
      {...other}
    >
      <DialogTitle id="form-dialog-title">Modification du compte</DialogTitle>

      <DialogContent>
        <Typography variant={"subtitle2"}>Compte SQL</Typography>
        <TextField
          id="login"
          label="Login SQL"
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={true}

          InputProps={{
            classes: {
              disabled: classes.formControlDisabled,
            }
          }}

          value={accountSelected.SqlLogin}
        />
        <br /><br />

        <Typography variant={"subtitle2"}>Serveur</Typography>
        <List>
          <AccountListItem
            key={accountSelected.DatabaseServerName.Id + '-' + accountSelected.SqlLogin}
            classes={classes}
            account={accountSelected}
            accountId={accountSelected.DatabaseServerName.Id + '-' + accountSelected.SqlLogin}
          />
        </List>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChangePassword}

              error={(btnAddDisabled & PASSWORD_EMPTY) === PASSWORD_EMPTY}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              id="passwordConfirm"
              label="Confirmation du mot de passe"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChangeConfirmPassword}

              error={(btnAddDisabled & PASSWORD_EMPTY) === PASSWORD_EMPTY}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {displayErrors()}
          </Grid>
        </Grid>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Annuler
        </Button>


        <ButtonStyled
          text='Ajouter'
          variant={"success"}
          disabled={btnAddDisabled !== 0x0}
          onClick={handleAction}
        />

      </DialogActions>
    </Dialog>
  );
}

DialogModifyAccount.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  accountSelected: PropTypes.object.isRequired,
};

export default DialogModifyAccount;
