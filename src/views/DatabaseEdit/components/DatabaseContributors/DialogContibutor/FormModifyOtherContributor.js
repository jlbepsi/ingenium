import React, {useEffect} from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Typography} from "@material-ui/core";

function FormOtherContributor(props) {

  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');


  useEffect( () =>
    verifyBtnDisabled()
  );

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }
  function handleChangeConfirmPassword(event) {
    setConfirmPassword(event.target.value);

  }

  function verifyBtnDisabled() {

    if (password !== confirmPassword) {
      setPasswordError('Les mots de passe doivent être identiques');
      props.onChangePassword(undefined);
    } else {
      setPasswordError('');
      props.onChangePassword(password);
    }

  }

  return(

    <form >
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="idContrib"
            label="Login SQL"
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={true}

            value={props.loginsql}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant={"subtitle2"} color={"secondary"} >Laissez le champ "mot de passe" vide pour ne pas le modifier.</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="pwdContrib"
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChangePassword}

            error={passwordError.length > 0}
            helperText={passwordError}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="pwdConfirmContrib"
            label="Confirmation du mot de passe"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChangeConfirmPassword}

            error={passwordError.length > 0}
            helperText={passwordError}
          />
        </Grid>
      </Grid>
    </form>
  );
}


FormOtherContributor.propTypes = {
  classes: PropTypes.object.isRequired,
  loginsql: PropTypes.string,
  password: PropTypes.string,
  onChangePassword: PropTypes.func.isRequired,
};

export default FormOtherContributor;