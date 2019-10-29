import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Typography, withStyles} from '@material-ui/core/index';

// Material components

// Shared layouts
import DashboardLayout from '../layouts/DashboardLayout';
import Divider from "@material-ui/core/Divider";

// icons
import {
  SettingsEthernet as SettingsEthernetIcon,
  Wifi as WifiIcon,
  Web as WebIcon,
} from "@material-ui/icons";


import PrinterCard from './components/PrinterCard/index'

// Liste des produits VMWare
import printers from './printers';
import PrinterDialog from "./components/PrinterDialog";

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



class Index extends Component {
  state = {
    value: 1,
    openDialog: false,
    selectedPrinter: null
  };

  handleClose = () => {
    this.setState({ openDialog: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  showPrinterDialog = (printer) => {
    this.setState({ selectedPrinter: printer });
    this.setState({ openDialog: true });
  };


  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Imprimantes">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Imprimantes disponibles
          </Typography>
          <Divider />

          <div>
            {printers.map(printer => (
              <PrinterCard
                key={printer.id}
                printer={printer}
                onDialog={this.showPrinterDialog}
              />
            ))}
          </div>

          <Typography variant="subtitle2" gutterBottom>
            Comment installer les imprimantes ?
          </Typography>
          <Typography
            className={classes.displayText}
            variant="subtitle1"
          >
            <ul>
              <li>Si vous êtes en filaire : choisissez l'option Impression en filaire <SettingsEthernetIcon /> </li>
              <li>Si vous êtes en Wifi : choisissez l'option Impression via le Wifi <WifiIcon /> <strong>(option recommandée)</strong></li>
              <li>Si vous êtes fan du Bureau Virtuel : choisissez l'option Impression avec le Bureau Virtuel <WebIcon /></li>
            </ul>
          </Typography>

          <PrinterDialog
            classes={classes}
            open={this.state.openDialog}
            onClose={this.handleClose}
            printer={this.state.selectedPrinter}
          />

        </div>
      </DashboardLayout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
