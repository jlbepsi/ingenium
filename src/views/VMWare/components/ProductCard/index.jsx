import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import {withStyles} from '@material-ui/core';

// Material components
import { Grid, Typography, Divider, Paper, Link } from '@material-ui/core';

// Material icons
import {
  VpnKey as VpnKeyIcon,
  GetApp as GetAppIcon,
  CalendarToday as CalendarTodayIcon
} from '@material-ui/icons';


// Component styles
import styles from './styles';

class ProductCard extends Component {
  render() {
    const { classes, className, product } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>

        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={6}
            xs={12}
          >
            <img
              alt="Product"
              className={classes.image}
              src={product.imageUrl}
            />
          </Grid>
          <Grid
            item
            lg={8}
            sm={6}
            xl={6}
            xs={12}
          >
            <Typography
              className={classes.title}
              variant="h4"
            >
              {product.title}
            </Typography>
            <Typography
              className={classes.description}
              variant="body1"
            >
              {product.description}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <div className={classes.stats}>
          <VpnKeyIcon className={classes.displayIcon} />
          <Typography
            className={classes.displayText}
            variant="subtitle2"
          >
            {product.licensekey}
          </Typography>

          <CalendarTodayIcon className={classes.endDateIcon} />
          <Typography
            className={classes.displayText}
            variant="subtitle2"
          >
            Expire le {product.enddate}
          </Typography>
        </div>

        <div className={classes.stats}>
          <GetAppIcon className={classes.displayIcon} />
          <Typography
            className={classes.displayText}
            variant="subtitle2"
          >
            <Link target="_blank"  href={product.url} rel="noopener">
              {product.urlUI}
            </Link>
          </Typography>
        </div>
      </Paper>
    );
  }
}

ProductCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCard);
