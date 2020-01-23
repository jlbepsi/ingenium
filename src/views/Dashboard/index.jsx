import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import DashboardLayout from '../layouts/DashboardLayout';
import DatabaseInfo from "./components/DatabaseInfo";
import WebStorageInfo from "./components/WebStorageInfo";
import SuiviPPEInfo from "./components/SuiviPPEInfo";
import AuthService from "../../services/Security/AuthService";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from "@material-ui/lab/AlertTitle";

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
  },
  btnAction: {
  },
  item: {
    height: '100%',
    boxSizing: 'borderBox'
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  details: {
    marginLeft: 'auto',
  },
  title: {
    color: theme.palette.text.secondary,
    fontWeight: 700
  },
  value: {
    textAlign: 'right',
    marginTop: theme.spacing.unit
  },
  iconWrapper: {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    height: '6rem',
    width: '6rem'
  },
  footer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
});

class Dashboard extends Component {

  profile = null;

  render() {
    const { classes } = this.props;
    const profile = AuthService.getProfile();

    const suiviPPE = (profile.bts ?
      <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <SuiviPPEInfo classes={classes} classeName={classes.item} profile={profile} />
      </Grid> :
        ""
    );

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <DatabaseInfo classes={classes} classeName={classes.item}  profile={profile}  />
            </Grid>

            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <WebStorageInfo classes={classes} classeName={classes.item} />
            </Grid>

            {suiviPPE}
          </Grid>

          <br />
          <Divider />
          <Paper className={classes.root}>
            <Typography variant="h3" component="h3">
              Nouvel Ingenium : Nouvelle base de données
            </Typography>
            <Alert severity="error">Vous devez utiliser le nouvel Ingenium !</Alert>
            <Typography variant="h6" component="h6">
              L'ancien Ingenium est toujours accessible à l'adresse <a href="https://oldingenium.montpellier.epsi.fr" target="_blank" rel="noopener noreferrer">https://oldingenium.montpellier.epsi.fr</a>.<br />
              Vous pouvez toujours accéder à vos anciennes bases de données via ce site.
              Il faudra exporter vos bases de données vers le nouveau site. <br />
            </Typography>
            <Typography component="p">
              Pour MySQL, vous devez faire les étapes suivantes :
              <ul>
                <li>Connectez-vous à l'ancienne adresse de <a href="https://mysql.montpellier.epsi.fr" target="_blank" rel="noopener noreferrer">PHPMyAdmin</a></li>
                <li>Exportez votre base de données (Onglet Export) dans un fichier</li>
                <li>Dans ce nouvel Ingenium, créez la nouvelle base de données</li>
                <li>Connectez-vous à l'adresse du <a href="https://mysql2.montpellier.epsi.fr" target="_blank" rel="noopener noreferrer">nouveau PHPMyAdmin</a></li>
                <li>Sélectionnez votre base de données nouvellement créée</li>
                <li>Importer votre fichier (Onglet Import)</li>
              </ul>
              Pour SQL Server, vous devez faire les étapes suivantes :
              <ul>
                <li>Ouvrez SQLServer management Studio</li>
                <li>Connectez-vous au serveur sqlserver.montpellier.epsi.fr,4433</li>
                <li>Exportez votre base de données dans un fichier:
                  <ul>
                    <li>clic-droit sur votre BD puis Tâches | Générer des scripts</li>
                    <li>sélectionner les tables et vues, procédures sotckeés (si il y en a) puis Suivant</li>
                    <li>Cliquer sur le bouton "Avancé" puis pour l'option "Type de données à inclure dans le script", choisir "Schéma et données"</li>
                    <li>Choisir l'emplacement du fichier puis Suivant er Terminer</li>
                  </ul>
                </li>
                <li>Dans ce nouvel Ingenium, créez la nouvelle base de données</li>
                <li>Dans SQLServer management Studio, connectez-vous au nouveau serveur sqlserver2.montpellier.epsi.fr,4453</li>
                <li>Sélectionnez votre base de données nouvellement créée</li>
                <li>Dans SQLServer management Studio, ouvrez votre fichier de BD et exécutez-le</li>
              </ul>
            </Typography>
          </Paper>

          <br />
          <Paper className={classes.root}>
            <Typography variant="h3" component="h3">
              Mes sites
            </Typography>
            <Typography component="p">
              Site <a href="https://aka.ms/devtoolsforteaching" target="_blank" rel="noopener noreferrer">Azure Dev Tools for Teaching (ADTT)</a> pour télécharger les versions de Windows, SQL Server, ...
            </Typography>
            <Alert severity="success">
              <AlertTitle>Base de données, Site Web, ...</AlertTitle>
              Azure Dev Tools for Teaching vous permet de créer des bases de données, des sites web et bien d'autres fonctionnalités !
            </Alert>
          </Paper>

          <br />
          <Paper className={classes.root}>
            <Typography variant="h3" component="h3">
              Mes contacts
            </Typography>
            <Typography component="p">
              <ul>
                <li>La majorité des services sont gérés par C&D. En cas de problèmes contacter le support C&D : <a href="mailto:support@reseau-cd.fr">support@reseau-cd.fr</a>.</li>
                <li>Les imprimantes et le site Ingenium sont gérés par Montpellier : <a href="mailto:admin.reseau@montpellier-epsi.fr">administrateur réseau</a>.</li>
              </ul>
            </Typography>
          </Paper>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
