import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Typography, withStyles} from '@material-ui/core/index';

// Material components

// Shared layouts
import DashboardLayout from '../layouts/DashboardLayout';
import Divider from "@material-ui/core/Divider/index";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";


import AccountsList from "./components/AccountsList";
import DatabaseList from "./components/DatabasesList";
import DatabasesAPI from "../../services/DatabasesAPI";
import SnackbarContentWrapper from "../share/SnackbarContentWrapper";
import AccountsAPI from "../../services/AccountsAPI";
import AuthService from "../../services/Security/AuthService";


import styles from "../../theme/styles/database";

class Database extends Component {

  state = {
    accounts: [],
    isLoadingAccounts: false,
    databases: [],
    isLoadingDatabases: false,

    openSnackBar: false,
    snackbarIcon: '',
    snackbarMessage: ''
  };
  profile = null;


  // API
  databasesAPI = new DatabasesAPI();
  accountsAPI = new AccountsAPI();

  componentDidMount() {
    /*
     * Obtention de l'utilisateur connecté
     */
    this.profile = AuthService.getProfile();

    /*
     * Chargement des comptes des serveurs de base de données
     */
    this.setState({isLoadingAccounts: true});
    this.accountsAPI.getAccounts(this.profile.sub)
      .then(data => {
        this.setState({isLoadingAccounts: false});

        data = this.accountAnalysis(data);
        this.setState({accounts: data})
      })
      .catch(err => {
        this.setState({isLoadingAccounts: false});
        this.setState({ snackbarIcon: "error" });
        this.setState({ snackbarMessage: "Erreur : " + err.message });
        this.setState({ openSnackBar: true });
      });


    /*
     * Chargement des bases de données
     */
    this.setState({isLoadingDatabases: true});
    this.databasesAPI.getDatabases(this.profile.sub)
      .then(data => {
        this.setState({isLoadingDatabases: false});
        this.databaseAnalysis(data);
        this.setState({databases: data})
      })
      .catch(err => {
        this.setState({isLoadingDatabases: false});
        this.setState({ snackbarIcon: "error" });
        this.setState({ snackbarMessage: "Erreur : " + err.message });
        this.setState({ openSnackBar: true });
      });

  }

  accountAnalysis(data) {
    if (this.state.databases.length > 0) {
      data.forEach( (account) => {
        let dbFound = this.state.databases.filter(db => db.serverId !== account.server.id);
        account.nbDatabases = (dbFound === null ? 0 : dbFound.length);
      })
    }
    return data;
  }
  databaseAnalysis(data) {
    let accounts = this.state.accounts;

    if (accounts.length > 0) {
      accounts.forEach( (account) => {
        let dbFound = data.filter(db => db.serverId === account.server.id);
        account.nbDatabases = (dbFound === null ? 0 : dbFound.length);
      });
      this.setState( { accounts : accounts });
    }
  }

  openSnackbar(icon, message) {
    this.setState({ snackbarIcon: icon });
    this.setState({ snackbarMessage: message });
    this.setState({ openSnackBar: true });
  }

  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackBar: false });
  };

  /*
   * Comptes SQL
   *
   */

  addAccountConfirmed = (password, serverId) => {
    const newAccount =
    {
      "serverId": serverId,
      "user": this.profile.sub,
      "password": password,
    };

    this.accountsAPI.addAccount(newAccount)
      .then(data => {
        this.openSnackbar("success", "Compte SQL ajouté !");

        let dataAccounts = this.state.accounts;
        /*
         *  Les comptes SQL sont tous présents:
         *    - il faut donc le trouver
         *    - puis modifier les informations du compte
         */
        let account = dataAccounts.find(account => account.server.id === newAccount.serverId);
        account.sqlLogin = data.sqlLogin;
        account.userLogin = data.userLogin;
        account.nbDatabases = 0;

        this.setState({accounts: dataAccounts});
      })
      .catch(err => {
        console.error('Request failed', err);

        this.openSnackbar("error", "Une erreur est survenue dans l'ajout !");
      });
  };

  modifyAccountConfirmed = (sqlLogin, password, serverId) => {
    const account =
      {
        "user": this.profile.sub,
        "password": password,
        "serverId": serverId,
      };

    this.accountsAPI.updateAccount(account)
      .then(data => {
        this.openSnackbar("success", "Compte SQL modifié !");
      })
      .catch(err => {
        console.error('Request failed', err);

        this.openSnackbar("error", "Une erreur est survenue dans la modification !");
      });
  };


  deleteAccountConfirmed = (loginsql, serverId) => {
    const account =
      {
        "user": loginsql,
        "serverId": serverId,
      };

    // Suppression du compte
    this.accountsAPI.deleteAccount(account)
      .then(data => {
        this.openSnackbar("success", "Compte SQL supprimé !");

        let dataAccounts = this.state.accounts;
        dataAccounts.forEach( (account) => {
            if (account.server.id === serverId && account.sqlLogin === loginsql) {
              account.sqlLogin = null;
              account.userLogin = null;
              account.nbDatabases = 0;
            }
          }
        );
        this.setState({accounts: dataAccounts});
      })
      .catch(err => {
        console.error('Request failed', err);

        this.openSnackbar("error", "Une erreur est survenue dans la suppression !");
      });
  };


  /*
   * Base de données
   *
   */

  addDatabaseConfirmed = (name, serverId) => {
    this.databasesAPI.addDatabase(name, serverId, this.profile.sub, this.profile.nom + " " + this.profile.prenom)
      .then(data => {
        this.openSnackbar("success", "Base de données ajoutée !");

        let databases = this.state.databases;
        databases.push(data);
        // Tri par nom
        databases.sort((db1, db2) => db1.NomBD.localeCompare(db2.NomBD));

        this.setState({databases: databases})
      })
      .catch(err => {
        console.error('Request failed', err);

        this.openSnackbar("error", "Une erreur est survenue dans l'ajout !");
      });
  };

  modifyDatabase = (dbid) => {
    this.props.history.push("/database/" + dbid);
  };

  deleteDatabase = (databaseId) => {
    // Suppression de la bd
    this.databasesAPI.deleteDatabase(databaseId)
      .then(data => {
        this.openSnackbar("success", "Base de données supprimée !");

        let databases = this.state.databases.filter(db => db.Id !== databaseId);
        this.setState({databases: databases})
      })
      .catch(err => {
        console.error('Request failed', err);

        this.openSnackbar("error", "Une erreur est survenue dans la suppression !");
      });
  };


  renderAccounts() {
    const { accounts } = this.state;

    if (this.state.isLoadingAccounts) {
      return (
        <Typography variant="subtitle2">
          <CircularProgress size={25} />
          Chargement en cours ...
        </Typography>
      );
    } else  if (accounts === null || accounts.length === 0) {
      return (
        <Typography variant="h6">Aucun compte n'est disponible.</Typography>
      );
    }

    return (
      <AccountsList
        classes={this.props.classes}
        accounts={accounts}
        handleAddAccount={this.addAccountConfirmed}
        handleModifyAccount={this.modifyAccountConfirmed}
        handleDeleteAccount={this.deleteAccountConfirmed}
      />
    );
  }

  renderDatabases() {
    const { databases, accounts } = this.state;

    let validAccounts = accounts.filter(a => a.server.canAddDatabase && a.sqlLogin != null);

    if (this.state.isLoadingDatabases) {
      return (
        <Typography variant="subtitle2">
          <CircularProgress size={25} />
          Chargement en cours ...
        </Typography>
      );
    } else  if (databases == null) {
      return (
        <Typography variant="h6">Aucune base de données n'est disponible.</Typography>
      );
    }

    return (
      <DatabaseList
        classes={this.props.classes}
        databases={databases}
        accounts={validAccounts}
        handleAddDatabase={this.addDatabaseConfirmed}
        handleModifyDatabase={this.modifyDatabase}
        handleDeleteDatabase={this.deleteDatabase}
      />
    );
  }


  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Base de données">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Mes comptes
          </Typography>
          <Divider />
          <div className={classes.list}>{this.renderAccounts()}</div>

          <br /><br />

          <Typography variant="h4" gutterBottom>
            Mes bases de données
          </Typography>
          <Divider />

          <div className={classes.list}>{this.renderDatabases()}</div>


          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.openSnackBar}
            autoHideDuration={4000}
            onClose={this.handleCloseSnackBar}
          >
            <SnackbarContentWrapper
              onClose={this.handleCloseSnackBar}
              variant={this.state.snackbarIcon}
              message={this.state.snackbarMessage}
            />
          </Snackbar>

        </div>
      </DashboardLayout>
    );
  }
}

Database.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Database);
