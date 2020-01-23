import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Typography, withStyles} from '@material-ui/core';

// Material components
import { Grid, Divider, Link } from '@material-ui/core';

// Shared layouts
import DashboardLayout from './layouts/DashboardLayout';


// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  displayText: {
    marginBottom: 16,
  },
  displayTextHeader: {
    marginTop: 16,
    marginBottom: 16,
  },
});

class Microsoft extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Microsoft">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={12}
              sm={6}
              xl={3}
              xs={12}
            >
              <Typography variant="h4" gutterBottom>
                Microsoft Office
              </Typography>
              <Divider />

              <Typography variant="subtitle2" gutterBottom>
                Connectez-vous à <Link target="_blank"  href='https://outlook.office365.com' rel="noopener">votre messagerie</Link>
                <br />Vous pouvez utiliser la suite Office 365 (Word, Excel, ...)  .
              </Typography>
            </Grid>

            <Grid
              item
              lg={12}
              sm={6}
              xl={3}
              xs={12}
            >

              <Typography variant="h4" gutterBottom>
                Microsoft Azure
              </Typography>
              <Divider />

              <Typography variant="subtitle1"
                          className={classes.displayTextHeader}
              >
                Avec le <Link target="_blank"  href='https://portal.azure.com' rel="noopener">Portail Azure</Link>, vous pouvez utliser
                certains service Azure et <strong>télécharger les logiciels Microsoft</strong> (Visual Studio 2019, Windows Server 2019, ...).
              </Typography>

              <Typography variant="subtitle1"
                          className={classes.displayText}
              >
                <ul>
                  <li>Connectez-vous au <Link target="_blank"  href='https://portal.azure.com' rel="noopener">Portail Azure</Link></li>
                  <li>Dans la barre de recherche entrez "education", la liste des logiciels s'affichera alors.</li>
                </ul>
              </Typography>

            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Microsoft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Microsoft);
