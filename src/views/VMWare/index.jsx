import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/index';

// Material components
import { Grid } from '@material-ui/core/index';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// Shared layouts
import DashboardLayout from '../layouts/DashboardLayout';

import ProductCard from './components/ProductCard/index'
// Liste des produits VMWare
import products from './products';


// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
  },
  displayTextHeader: {
    marginTop: 16,
    marginBottom: 16,
  },
});

class VMWare extends Component {

  renderProducts() {

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
        {products.map(product => (
          <Grid
            item
            key={product.id}
            lg={4}
            md={6}
            xs={12}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="VMWare">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Les logiciels
          </Typography>
          <Divider />

          <Typography variant="body1"
                      className={classes.displayTextHeader}
          >
            Les licences sont renouvellées après la date d'expiration.
          </Typography>

          <div className={classes.content}>{this.renderProducts()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

VMWare.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VMWare);
