import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {withStyles} from '@material-ui/core';

// Material components
import {Typography, Divider} from "@material-ui/core";

// Shared layouts
import DashboardLayout from './layouts/DashboardLayout';
import Link from "@material-ui/core/Link";


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

class GitHub extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="GitHub">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Les outils GitHub
          </Typography>
          <Divider />

          <Typography variant="body1"
                      className={classes.displayTextHeader}
          >
            Vous pouvez avoir plus de fonctionnalités sur GitHub avec votre adresse mail EPSI.
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            1 - Enregistrez-vous
          </Typography>
          <Typography
            className={classes.displayText}
            variant="body1"
          >
            Allez sur la <Link target="_blank"  href='https://gitlab.com/users/sign_in#register-pane' rel="noopener">page d'enregistrement</Link> (indiquez bien votre adresse mail @epsi.fr)
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            2 - Utilisez GitHub
          </Typography>
          <Typography
            className={classes.displayText}
            variant="body1"
          >
            Lors de l'utilisation de GitHub, vous avez plus de fonctionnalités qu'un utilisateur lambda
          </Typography>
        </div>
      </DashboardLayout>
    );
  }
}

GitHub.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GitHub);
