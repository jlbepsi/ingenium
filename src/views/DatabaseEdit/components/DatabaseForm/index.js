import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import SnackbarContentWrapper from "../../../share/SnackbarContentWrapper";



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



class DatabaseForm extends Component {

  render() {
    const {classes, database} = this.props;

    if (database === null) {
      return (
        <Typography variant='h5'>Aucune base de données sélectionnée.</Typography>
      );
    }
    let date = new Date(database.DateCreation).toLocaleString('FR-fr', { year: 'numeric', month: 'long', day: 'numeric'});
    return (
        <form className={classes.form} autoComplete="off" >
          {! database.CanBeUpdated &&
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

                value={database.NomBD}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <TextField
                id="DateCreation"
                label="Date de création"
                fullWidth
                disabled

                value={date}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                id="Commentaire"
                label="Commentaire"
                fullWidth
                disabled={! database.CanBeUpdated}

                value={database.Commentaire}
                onChange={(event) => this.props.handleChangeCommentaire(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <TextField
                id="servername"
                label="Type de serveur"
                fullWidth
                disabled

                value={database.DatabaseServerName.Name}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <TextField
                id="serveururl"
                label="Adresse du serveur"
                fullWidth
                disabled

                value={database.DatabaseServerName.NomDNS}
              />
            </Grid>
          </Grid>

          <div className={classes.buttonsAction}>
            <Button component={RouterLink} to="/database">Annuler</Button>
            &nbsp;
            {database.CanBeUpdated &&
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.handleModifyDatabase}
            >
              Valider
            </Button>
            }
          </div>
        </form>
    )
  }
}

DatabaseForm.propTypes = {
  classes: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired,
  handleChangeCommentaire: PropTypes.func.isRequired,
  handleModifyDatabase: PropTypes.func.isRequired,
};

export default  withStyles(styles) (DatabaseForm);