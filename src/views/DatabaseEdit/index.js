import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import DashboardLayout from "../layouts/DashboardLayout";
import Divider from "@material-ui/core/Divider";
import DatabaseForm from "./components/DatabaseForm";
import DatabaseContributors from "./components/DatabaseContributors";

import styles from '../../theme/styles/database'
import DatabasesAPI from "../../services/DatabasesAPI";
import ContributorsAPI from "../../services/ContributorsAPI";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../share/SnackbarContentWrapper";
import AuthService from "../../services/Security/AuthService";

class DatabaseEdit extends Component {

  title = "";

  state = {
    database: null,
    isLoadingDatabase: false,

    openSnackBar: false,
    snackbarIcon: "success",
    snackbarMessage: "Modifications effectuées !",
    processRunning: true,
  };
  profile = null;


  // API
  databasesAPI = new DatabasesAPI();
  contributorsAPI = new ContributorsAPI();

  constructor(props) {
    super(props);

    this.title = "Modification de la base de données";
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const {match: {params}} = this.props;

    this.databasesAPI.getDatabase(parseInt(params.dbid))
      .then(data => {
        this.setState({isLoadingDatabase: false});

        data.DatabaseGroupUsers.sort((dgu1, dgu2) => dgu1.GroupType - dgu2.GroupType);
        this.setState({database: data})
      })
      .catch(err => {
        this.setState({isLoadingDatabase: false});

        this.openSnackbar("error", "Impossible d'obtenir les données !");
      });

    /*
     * Obtention de l'utilisateur connecté
     */
    this.profile = AuthService.getProfile();
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
   * Contributeurs de la base de données
   *
   */

  addContributor = (loginsql, fullname, password, permissionid) => {
/*

    public class GroupUserModel
    {
        public int DbId { get; set; }
        public string SqlLogin { get; set; }
        public string UserLogin { get; set; }
        public string UserFullName { get; set; }
        public string Password { get; set; }
        public int GroupType { get; set; }
    }
 */
    let newContributor =
      {
        "DbId": this.state.database.Id,
        "SqlLogin": loginsql,
        "Password": password,
        "UserLogin": loginsql,
        "UserFullName": fullname,
        "GroupType": permissionid
      };
    this.contributorsAPI.addContributor(newContributor)
      .then(data => {
        let database= this.state.database;
        database.DatabaseGroupUsers.push(data);
        // Tri par nom
        database.DatabaseGroupUsers.sort((dgu1, dgu2) => dgu1.GroupType - dgu2.GroupType);

        // OK
        this.openSnackbar("success", 'Contributeur ajouté !');
        this.setState({database: database});
      })
      .catch(err => {
        this.openSnackbar("error", "Erreur dans l'ajout du contributeur");
      });
  };

  modifyContributor = (loginsql,  password, permissionid) => {
    let database= this.state.database;
    let contributor = database.DatabaseGroupUsers.find(c => c.SqlLogin === loginsql);

    contributor.GroupType = permissionid;
    contributor.Password = password;

    this.contributorsAPI.modifyContributor(contributor)
      .then(data => {
        let database= this.state.database;
        let contributor = database.DatabaseGroupUsers.find(c => c.SqlLogin === loginsql);
        contributor.GroupType = permissionid;

        // OK
        this.openSnackbar("success", 'Contributeur modifié !');
        this.setState({database: database});
      })
      .catch(err => {
        this.openSnackbar("error", "Erreur dans la modification du contributeur");
      });
  };

  deleteContributor = (loginsql) => {
    let contributorToDelete =
      {
        "DbId": this.state.database.Id,
        "SqlLogin": loginsql,
      };

    this.contributorsAPI.deleteContributor(loginsql, contributorToDelete)
      .then(data => {
        let database= this.state.database;
        database.DatabaseGroupUsers = database.DatabaseGroupUsers.filter(c => c.SqlLogin !== loginsql);

        this.setState({database: database});

        // OK
        this.openSnackbar("success", 'Contributeur supprimé !');
        this.setState({database: database});
      })
      .catch(err => {
        this.openSnackbar("error", "Erreur dans la suppression du contributeur");
      });

  };

  changeCommentaire = (description) => {
    let database = this.state.database;
    database.Commentaire = description;

    this.setState({database: database});
  };

  validateForm = () => {
    this.databasesAPI.updateDatabase(this.state.database, this.profile.sub)
      .then(data => {
        // OK
        this.openSnackbar("success", 'Modifications enregistrées !');
      })
      .catch(err => {
        this.setState({isLoadingDatabase: false});
        this.openSnackbar("error", "Erreur dans la modification de la base de données");
      });
  };

  render() {
    const { classes } = this.props;

    const database = this.state.database;


    let title = <Typography variant="h4" gutterBottom>
      {this.title}
    </Typography>;

    return (

      <DashboardLayout title="Base de données">
          <div className={classes.root}>
            {title}

            <Button component={RouterLink} to="/database" color="primary">Retour à la liste</Button>

            <DatabaseForm
              classes={classes}
              database={database}
              handleChangeCommentaire={this.changeCommentaire}
              handleModifyDatabase={this.validateForm}
            />

            <Typography variant="h4" gutterBottom>
              Liste des contributeurs
            </Typography>
            <Divider />

            <DatabaseContributors
              classes={classes}
              database={database}
              handleAddContributor={this.addContributor}
              handleModifyContributor={this.modifyContributor}
              handleDeleteContributor={this.deleteContributor}
            />

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
    )
  }
}

export default  withStyles(styles) (DatabaseEdit);