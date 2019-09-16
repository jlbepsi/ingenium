import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Link, Typography, withStyles} from '@material-ui/core/index';

// Material components
import {Divider} from "@material-ui/core";

// Shared layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AuthService from "../../services/Security/AuthService";


// Component styles
const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 4,
  },
  printers: {
    marginTop: 16,
    marginBottom: 16,
  },
  displayText: {
    marginBottom: 16,
  },
  displayTextHeader: {
    marginTop: 16,
    marginBottom: 16,
  },
  tab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class WebStorage extends Component {

  render() {
    const { classes } = this.props;
    const profile = AuthService.getProfile();
    const url = "http://web.montpellier.epsi.fr/~" + profile.sub;

    return (
      <DashboardLayout title="Espace Web">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Le serveur Web Apache
          </Typography>
          <Divider />
          <Typography variant="body1"
                      className={classes.displayTextHeader}
          >
            Votre espace web est presque prêt pour déposer vos pages HTML et PHP. Il faut faire les étapes suivantes:
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            1 - Utiliser un client FTP tel que FileZilla
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            2 - Entrer les informations de connexion suivantes
          </Typography>
          <Typography
            className={classes.displayText}
            variant="body1"
          >
            <ul>
              <li>Serveur : <code>newftpweb.montpellier.epsi.fr</code></li>
              <li>Identifiant : <i>votre login</i></li>
              <li>Mot de passe: <i>Votre mot de passe</i></li>
              <li>Port : <code>4623</code></li>
            </ul>
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            3 - Créer votre espace web
          </Typography>
          <Typography
            className={classes.displayText}
            variant="body1"
          >
            Pour afficher votre page personnelle, vous <b>devez créer un répertoire nommé "web"</b> à la racine de votre dossier
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            4 - Accéder à votre espace web
          </Typography>
          <Typography
            className={classes.displayText}
            variant="body1"
          >
            Votre page personnelle est : <Link target="_blank"  href={url}  rel="noopener">{url}/</Link>
          </Typography>

        </div>
      </DashboardLayout>
    );
  }
}

WebStorage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WebStorage);
