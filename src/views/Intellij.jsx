import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Typography, withStyles} from '@material-ui/core';

// Material components
import { Divider, Link} from "@material-ui/core";

// Shared layouts
import DashboardLayout from './layouts/DashboardLayout';


// Component styles
const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    padding: theme.spacing(4),
  },
  displayText: {
    marginBottom: 16,
  },
  displayTextHeader: {
    marginTop: 16,
    marginBottom: 16,
  },
});

class Intellij extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Intellij">
        <div className={classes.root}>

          <Typography variant="h4" gutterBottom>
            La suite Intellij
          </Typography>
          <Divider />

          <Typography variant="subtitle1"
                      className={classes.displayTextHeader}
          >
            Vous pouvez avoir tous les logiciels <Link target="_blank"  href='https://www.jetbrains.com/' rel="noopener">JetBrain</Link> (PHPStorm, WebStorm, Intellij, ...)
            avec votre adresse mail EPSI. Pour cela vous devez faire quelques manipulations:
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            1 - Enregistrez-vous
          </Typography>
          <Typography
            className={classes.displayText}
            variant="subtitle1"
          >
            Allez sur la <Link target="_blank"  href='https://www.jetbrains.com/shop/eform/students' rel="noopener">page d'enregistrement</Link> (indiquez bien votre adresse mail @epsi.fr)
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            2 - Validez le mail de JetBrain
          </Typography>
          <Typography
            className={classes.displayText}
            variant="subtitle1"
          >
            Lorsque vous recevez le mail de JetBrain, validez-le pour pouvoir entrer votre mot de passe.
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            3 - Attendez la confirmation de JetBrain
          </Typography>
          <Typography
            className={classes.displayText}
            variant="subtitle1"
          >
            Vous devriez maintement pouvour utiliser <Link target="_blank"  href='https://www.jetbrains.com/products.html' rel="noopener">tous les logiciels</Link> de JetBrain.
            <strong>Votre licence est valide 1 an.</strong>
          </Typography>

            <Typography variant="subtitle2" gutterBottom>
              4 - Renouvellement de la licence
            </Typography>
            <Typography
              className={classes.displayText}
              variant="subtitle1"
            >
            Quelques jours avant la date d'expiration de votre licence, vous recevrez un mail de jetBrain vous demandant de la renouveller.
          </Typography>


        </div>
      </DashboardLayout>
    );
  }
}

Intellij.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Intellij);
