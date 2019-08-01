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


// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  paper: {
    padding: theme.spacing.unit * 2,
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
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center'
  },
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

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
              <DatabaseInfo classes={classes} classeName={classes.item} />
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

            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <SuiviPPEInfo classes={classes} classeName={classes.item} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
