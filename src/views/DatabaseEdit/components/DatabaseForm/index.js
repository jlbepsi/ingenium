import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import SnackbarContentWrapper from "../../../share/SnackbarContentWrapper";
import DialogServerAccess from "../../../Database/components/AccountsList/AccountCard/DialogServerAccess";
import Tooltip from "@material-ui/core/Tooltip";
import {IconButton} from "@material-ui/core";
import AccessIcon from '@material-ui/icons/ExitToApp';



const styles = theme => ({
  form: {
    width: "80%",
  },
  buttonsAction: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
});



/*
class DatabaseForm extends Component {

  DatabaseForm() {
    const [dialogserveraccess, setDialogserveraccess] = React.useState(false);
  }



  render() {
    const {classes, database} = this.props;

    if (database === null) {
      return (
        <Typography variant='h5'>Aucune base de données sélectionnée.</Typography>
      );
    }
    let date = new Date(database.DateCreation).toLocaleString('FR-fr', { year: 'numeric', month: 'long', day: 'numeric'});

    */


function DatabaseForm(props) {

  const [dialogserveraccess, setDialogserveraccess] = React.useState(false);
  const { classes, database } = props;

  if (database === null) {
    return (
      <Typography variant='h5'>Aucune base de données sélectionnée.</Typography>
    );
  }

  function handleClose(name) {
    setDialogserveraccess(false);
  }

  function serverAccess() {
    setDialogserveraccess(true);
  }

  function getFriendlyDateCreation() {
    return new Date(database.DateCreation).toLocaleString('FR-fr', { year: 'numeric', month: 'long', day: 'numeric'});
  }


  return (
    <div>
      <form className={classes.form} autoComplete="off" >
        {! database.canBeUpdated &&
        <SnackbarContentWrapper
          variant="warning"
          className={classes.margin}
          message="Vous n'êtes pas administrateur de la base de données."
        />
        }

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7}>
            <TextField
              id="nom"
              label="Nom de la base de données"
              fullWidth
              disabled

              value={database.nomBd}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <TextField
              id="DateCreation"
              label="Date de création"
              fullWidth
              disabled

              value={getFriendlyDateCreation}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              id="Commentaire"
              label="Commentaire"
              fullWidth
              disabled={! database.canBeUpdated}

              value={database.Commentaire}
              onChange={(event) => props.handleChangeCommentaire(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={2}>
            <Tooltip title="Accès au serveur">
              <IconButton aria-label="Acces"
                          onClick={(e) => serverAccess()}
              >
                <AccessIcon />
              </IconButton>
            </Tooltip>
            Accès au serveur
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              id="servername"
              label="Nom de serveur"
              fullWidth
              disabled

              value={database.server.name}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              id="serveururl"
              label="Adresse du serveur"
              fullWidth
              disabled

              value={database.server.nomDns}
            />
          </Grid>
        </Grid>

        <div className={classes.buttonsAction}>
          <Button component={RouterLink} to="/database">Annuler</Button>
          &nbsp;
          {database.canBeUpdated &&
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleModifyDatabase}
          >
            Valider
          </Button>
          }
        </div>
      </form>

      <DialogServerAccess
        server={database.server}
        open={dialogserveraccess}
        onClose={handleClose}
        />
    </div>
  )
}

DatabaseForm.propTypes = {
  classes: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired,
  handleChangeCommentaire: PropTypes.func.isRequired,
  handleModifyDatabase: PropTypes.func.isRequired,
};

export default  withStyles(styles) (DatabaseForm);