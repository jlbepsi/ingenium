import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Typography, withStyles} from '@material-ui/core';

// Shared layouts
import DashboardLayout from './layouts/DashboardLayout';
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";


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

class Suivippe extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Suivi PPE">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Le suivi des stages et situations pour le BTS
          </Typography>
          <Divider />

          <Typography variant="body1"
                      className={classes.displayTextHeader}
          >
            Si vous êtes inscrit au BTS, vous devez utiliser
            le site de <Link target="_blank"  href='https://newsuivippe.montpellier.epsi.fr' rel="noopener">suivi du BTS</Link> pour vos stages et situations.
          </Typography>

        </div>
      </DashboardLayout>
    );
  }
}

Suivippe.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Suivippe);
