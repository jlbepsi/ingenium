import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Typography, withStyles} from '@material-ui/core/index';

// Material components
import {Divider} from "@material-ui/core";

// Shared layouts
import DashboardLayout from '../layouts/DashboardLayout';


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

  /*renderPrinters() {
    const { classes } = this.props;

    if (products.length === 0) {
      return (
        <Typography variant="h6">Aucun produit n'est disponible.</Typography>
      );
    }

    return (
      <Grid
        container
        spacing={3}
      >
        {printers.map(printer => (
          <Grid
            item
            key={printer.id}
            lg={4}
            md={6}
            xs={12}
          >
            <PrinterCard printer={printer} />
          </Grid>
        ))}
      </Grid>
    );
  }*/

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Espace Web">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            WebStorage
          </Typography>
          <Divider />



        </div>
      </DashboardLayout>
    );
  }
}

WebStorage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WebStorage);
