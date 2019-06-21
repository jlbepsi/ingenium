import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles} from '@material-ui/core';

// Material components
import {Divider, Grid, Typography, Paper} from '@material-ui/core';

import {
  LocationOn as LocationOnIcon,
  SettingsEthernet as SettingsEthernetIcon,
}
  from '@material-ui/icons';

import styles from './styles';

class PrinterCard extends Component {
  render() {
    const {classes, className, printer} = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>

        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={4}
            xl={4}
            xs={12}
          >
            <img
              alt="Printer"
              className={classes.image}
              src={printer.imageUrl}
            />
          </Grid>
          <Grid
            item
            lg={9}
            sm={8}
            xl={8}
            xs={12}
          >
            <Typography
              className={classes.title}
              variant="h4"
            >
              {printer.title}
            </Typography>
            <Typography
              className={classes.description}
              variant="body1"
            >
              {printer.description}
            </Typography>
            <Typography
              className={classes.description}
              variant="subtitle2"
            >
              Modèle: {printer.model}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <div className={ printer.color==='1' ? classes.statsColor : classes.stats}>
          <LocationOnIcon className={classes.displayIcon} />
          <Typography
            className={classes.displayText}
            variant="body2"
          >
            {printer.emplacement}
          </Typography>

          <SettingsEthernetIcon className={classes.endDateIcon} />
          <Typography
            className={classes.displayText}
            variant="body2"
          >
            {printer.adresseip}
          </Typography>
        </div>

        <div className={classes.stats}>
          <Typography
            className={classes.displayText}
            variant="body2"
          >
            Type d'accès : {printer.typeacces}
          </Typography>
        </div>
      </Paper>
    );
  }
}

PrinterCard.propTypes = {
  classes: PropTypes.object.isRequired,
  printer: PropTypes.object.isRequired
};

export default withStyles(styles)(PrinterCard);