import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Typography, withStyles} from '@material-ui/core';
import Divider from "@material-ui/core/Divider";

// Shared layouts
import DashboardLayout from './layouts/DashboardLayout';

// Component styles
const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 4,
  },
  displayText: {
    marginBottom: 16,
  },
  displayTextHeader: {
    marginTop: 16,
    marginBottom: 16,
  },
});

class Supports extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Supports">
        <div className={classes.root}>

          <Typography variant="h4" gutterBottom>
            Le support
          </Typography>
          <Divider />

          <Typography variant="body1"
                      className={classes.displayTextHeader}
          >
            En cas de problème, vous pouvez contacter le support.
          </Typography>

          <Typography variant="body1" gutterBottom>
            Les services Ingenium (base de données et espace Web), Suivi PPE et les imprimantes sont gérés
            par <a href="mailto:admin.reseau@montpellier-epsi.fr">l'administrateur réseau local</a>.
          </Typography>
          <Typography
            className={classes.displayText}
            variant="body1"
          >
            <strong>Tous les autres services</strong> (portail de connexion, MyLearningBox, 7Speaking, Beecome, etc.) sont gérés
            par <a href="mailto:support@reseau-cd.fr">Compétences et Développement</a>.
          </Typography>
        </div>
      </DashboardLayout>
    );
  }
}

Supports.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Supports);