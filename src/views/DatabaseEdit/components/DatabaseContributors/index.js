import React, { Component } from 'react'
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import {IconButton} from "@material-ui/core";

import AddIcon from "@material-ui/icons/AddCircle";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {permissions, getPermission} from '../../../../common/database/permissions';
import DialogAddContributor from "./DialogContibutor/DialogAddContributor";
import DialogModifyContributor from "./DialogContibutor/DialogModifyContributor";
import DialogDelete from "../../../share/DialogDelete";


class DatabaseContributors extends Component {

  state = {
    dialogaddcontributor: false,
    dialogmodifycontributor: false,
    dialogdeletecontributor: false,
    sqlLogin: '',
    userFullName: '',
    groupType: 0,
  };

  handleChangePermission = (value) => {
    this.setState({ groupType: value })
  };


  handleClose = (name) => {
    this.setState({ [name]: false });
  };
  handleCloseDialogDeleteContributor = () => {
    this.setState({ dialogdeletecontributor: false });
  };

  addContributor = () => {
    this.setState({ dialogaddcontributor: true });
  };
  addContributorConfirmed = (loginsql, fullname, password, permissionid) => {
    this.setState({ dialogaddcontributor: false });

    this.props.handleAddContributor(loginsql, fullname, password, permissionid);
  };

  modifyContributor = (contributor) => {
    this.setState({ sqlLogin: contributor.sqlLogin });
    this.setState({ userFullName: contributor.userFullName });
    this.setState({ groupType: contributor.groupType });

    this.setState({ dialogmodifycontributor: true });
  };
  modifyContributorConfirmed = (loginsql, password, groupType) => {
    this.setState({ dialogmodifycontributor: false });

    this.props.handleModifyContributor(loginsql, password, groupType);
  };

  deleteContributor = (contributor) => {
    this.setState({ sqlLogin: contributor.sqlLogin });
    this.setState({ userFullName: contributor.userFullName });
    this.setState({ dialogdeletecontributor: true });
  };
  deleteContributorConfirmed = () => {
    this.setState({ dialogdeletecontributor: false });

    this.props.handleDeleteContributor(this.state.sqlLogin);
  };

  renderContributors(database, classes) {
    let rows = [], cptAdmins = 0;
    // On compte d'abord le nb d'administrateur
    database.users.forEach((contributor) => {
      if (contributor.groupType === 1)
        cptAdmins++;
    });

    // Puis on affiche les éléments : si il n'ya qu'un seul administrateur il ne peut pas être supprimé ni modifié
    database.users.forEach((contributor) => {
      rows.push(this.renderRow(contributor, cptAdmins, classes))
    });

    return rows;
  };

  renderRow(contributor, cptAdmins, classes) {
    const persmisson = getPermission(contributor.groupType);
    const fullName = (contributor.userFullName === null ? "Non" : contributor.userFullName);

    let contributorcanBeUpdated = contributor.canBeUpdated, contributorcanBeDeleted = contributor.canBeDeleted;
    // si il n'ya qu'un seul administrateur il ne peut pas être ni supprimé ni modifié
    if (contributor.groupType === 1 && cptAdmins <= 1) {
      contributorcanBeUpdated = contributorcanBeDeleted = false;
    }

    let actions = [];
    if (contributorcanBeUpdated) {
      actions.push(
        <Tooltip title="Modifier le contributeur">
          <IconButton
            size={"small"}
            aria-label="Modifier"
            onClick={(e) => this.modifyContributor(contributor, e)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      );
    }
    if (contributorcanBeDeleted) {
      actions.push(
        <Tooltip title="Supprimer le contributeur">
          <IconButton
            size={"small"}
            aria-label="Supprimer"
            className={classes.btnSupprimer}
            onClick={(e) => this.deleteContributor(contributor, e)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
    }
    /*if (actions.length === 0) {
      actions.push(<Typography>Vous n'êtes pas administrateur</Typography>)
    }*/

    return <TableRow key={contributor.sqlLogin} hover>
      <TableCell>{fullName}</TableCell>
      <TableCell><b>{contributor.sqlLogin}</b></TableCell>
      <TableCell>

        <Chip
          className={classes.chip}
          avatar={<Avatar>{persmisson===null ? '?' : persmisson.initial}</Avatar>}
          label={persmisson===null || persmisson.title===null ? 'Aucune' : persmisson.title}
          color={ contributor.groupType===1 ? "primary" : "default" }
          variant="outlined"
        />

      </TableCell>
      <TableCell>
        {actions}
      </TableCell>
    </TableRow>

  }


  render() {
    const {classes, database} = this.props;

    if (database === null || database.contributors === null) {
      return (
        <Typography variant='h5'>Aucun contributeurs.</Typography>
      );
    }

    const { dialogaddcontributor, dialogmodifycontributor, dialogdeletecontributor,
      sqlLogin, userFullName, groupType } = this.state;

    return (
      <div>
        {database.canAddGroupUser &&
        <Button
          className={classes.btnAjouter}
          variant="contained"
          color={"primary"}
          onClick={this.addContributor}
        >
          <AddIcon className={classes.leftIcon}/>
          Nouveau contributeur
        </Button>
        }

        <Paper>
          <Table className={classes.table} size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell>Contributeur EPSI</TableCell>
                <TableCell>Login</TableCell>
                <TableCell>Permissions</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderContributors(database, classes)}
            </TableBody>
          </Table>


          <DialogAddContributor
            classes={classes}
            permissions={permissions}
            open={dialogaddcontributor}
            serverId={database.serverId}
            onClose={this.handleClose}
            onActionValidate={this.addContributorConfirmed}
          />

          <DialogModifyContributor
            classes={classes}
            permissions={permissions}
            loginsql={sqlLogin}
            userFullName={userFullName}
            permissionid={groupType}
            open={dialogmodifycontributor}
            onClose={this.handleClose}
            onActionValidate={this.modifyContributorConfirmed}
            onChangePermission={this.handleChangePermission}
          />


          <DialogDelete
            title={'Suppression du contributeur'}
            open={dialogdeletecontributor}
            onClose={this.handleCloseDialogDeleteContributor}
            onActionValidate={this.deleteContributorConfirmed}
          >
            {userFullName === null &&
            <div>Supprimer le contributeur <strong>'{sqlLogin}'</strong> ?</div>
            }
            {userFullName !== null &&
            <div>Supprimer le contributeur <strong>'{sqlLogin}'</strong> ({userFullName})?</div>
            }
          </DialogDelete>


        </Paper>
      </div>
        
    )
  }
}

DatabaseContributors.propTypes = {
  classes: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired,
  handleAddContributor: PropTypes.func.isRequired,
  handleModifyContributor: PropTypes.func.isRequired,
  handleDeleteContributor: PropTypes.func.isRequired,
};

export default DatabaseContributors;