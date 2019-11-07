import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

function FormOtherContributor(props) {

  const NAME_EMPTY = 1;
  const NAME_LENGTH_INF = 1 << 2;
  const PASSWORD_EMPTY = 1 << 3;
  const PASSWORD_LENGTH_INF = 1 << 4;
  const PASSWORDCONFIRM_EMPTY = 1 << 5;
  const PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY = 1 << 6;


  function handleChangeLoginSql(event) {
    props.onChangeLogin(event.target.value)
  }
  function handleChangePassword(event) {
    props.onChangePassword(event.target.value)
  }
  function handleChangeConfirmPassword(event) {
    props.onChangePasswordConfirm(event.target.value)
  }

  return(

    <form >
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="login"
            label="Login SQL"
            fullWidth
            margin="dense"
            variant="outlined"
            value={props.loginsql}
            onChange={handleChangeLoginSql}

            error={ props.errorValues & (NAME_EMPTY | NAME_LENGTH_INF) }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            margin="dense"
            variant="outlined"
            onChange={handleChangePassword}

            error={ props.errorValues & (PASSWORD_EMPTY | PASSWORD_LENGTH_INF | PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY) }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="passwordConfirm"
            label="Confirmation du mot de passe"
            type="password"
            fullWidth
            margin="dense"
            variant="outlined"
            onChange={handleChangeConfirmPassword}

            error={ props.errorValues & (PASSWORDCONFIRM_EMPTY | PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY) }
          />
        </Grid>
      </Grid>
    </form>
  );
}


FormOtherContributor.propTypes = {
  loginsql: PropTypes.string,
  password: PropTypes.string,
  errorValues: PropTypes.number,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func.isRequired,
  onChangePasswordConfirm: PropTypes.func.isRequired,
};

export default FormOtherContributor;