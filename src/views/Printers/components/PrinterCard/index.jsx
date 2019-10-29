import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
// Material helpers
import { withStyles} from '@material-ui/core';

// Material components
import {Typography} from '@material-ui/core';

import {
  LocationOn as LocationOnIcon,
  SettingsEthernet as SettingsEthernetIcon,
  ExitToApp as AccessTypeIcon
}
  from '@material-ui/icons';

import styles from './styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

class PrinterCard extends Component {

  handleSelectPrinter = () => {
    this.props.onDialog(this.props.printer)
  };

  render() {
    const {classes, printer} = this.props;
    const imageUrl = "/images/printers/" +  printer.model + ".jpeg";

    return (

      <Card  className={classes.card}>

        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {printer.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {printer.description}
          </Typography>

          <div className={classes.subinfo}>
            <div className={classes.subinfoitem}>
              <img
                alt="Printer"
                className={classes.imageWrapper}
                src={imageUrl}
              />
            </div>

            <div className={classes.subinfoitem}>

              <div className={classes.stats}>
                <Typography variant="subtitle1" color="textSecondary">
                  {printer.fullModel}
                </Typography>
              </div>

              <div className={classes.stats}>
                <LocationOnIcon />
                <Typography variant="subtitle1" color="textSecondary">
                  {printer.emplacement}
                </Typography>
              </div>

              <div className={classes.stats}>
                <AccessTypeIcon />
                <Typography variant="subtitle1" color="textSecondary">
                  {printer.typeacces}
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button color={"primary"} size="small" onClick={this.handleSelectPrinter} >Installer l'imprimante</Button>
        </CardActions>
      </Card>
    );
  }
}

PrinterCard.propTypes = {
  classes: PropTypes.object.isRequired,
  printer: PropTypes.object.isRequired,
  onDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(PrinterCard);