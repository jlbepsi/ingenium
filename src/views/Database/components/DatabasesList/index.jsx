import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {IconButton} from '@material-ui/core';

// Material components
import Tooltip from "@material-ui/core/Tooltip";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

import DialogAddDatabase from "./DialogAddDatabase";
import DialogDelete from "../../../share/DialogDelete";
import {getPermission} from '../../../../common/database/permissions';

class DatabasesList extends Component {

  state = {
    dialogadddatabase: false,
    databaseId: '',
    databaseName: '',
    serverName: '',
    dialogdeletedatabase: false,
  };

  handleClose = (name) => {
    this.setState({ [name]: false });
  };

  addDatabase = () => {
    this.setState({ dialogadddatabase: true });
  };

  addDatabaseConfirmed = (dbName, accountId) => {
    this.setState({ dialogadddatabase: false });

    this.props.handleAddDatabase(dbName, accountId);
  };

  modifyDatabase = (database) => {
    this.props.handleModifyDatabase(database.Id);
  };

  handleCloseDeleteDatabase = () => {
    this.setState({ dialogdeletedatabase: false });
  };
  deleteDatabase = (database) => {
    this.setState({ databaseId: database.Id });
    this.setState({ databaseName: database.NomBD });
    this.setState({ serverName: database.DatabaseServerName.NomDNS });
    this.setState({ dialogdeletedatabase: true });
  };
  deleteDatabaseConfirmed = () => {
    this.setState({ dialogdeletedatabase: false });

    this.props.handleDeleteDatabase(this.state.databaseId);
  };


  renderRow(database, classes) {
    const databaseIconUrl = '/images/databases/' + database.DatabaseServerName.Code + '.png';

    let contributors = [];
    database.DatabaseGroupUsers.forEach( contributor => {

      const persmisson = getPermission(contributor.GroupType);
      contributors.push(
        <Chip
          key={contributor.SqlLogin}
          className={classes.chip}
          avatar={<Avatar>{persmisson===null ? '?' : persmisson.initial}</Avatar>}
          label={contributor.UserFullName===null ? contributor.SqlLogin : contributor.UserFullName}
          color={ contributor.GroupType===1 ? "primary" : "default" }
          variant="outlined"
        />
      );
      }
    );

    return <TableRow key={database.Id} hover>
      <TableCell>
        <img
          alt="Database"
          src={databaseIconUrl}
        />
      </TableCell>
      <TableCell><b>{database.NomBD}</b></TableCell>
      <TableCell>{database.Commentaire}</TableCell>
      <TableCell>{contributors}</TableCell>
      <TableCell>
        <Tooltip title="Modifier la base de données">
          <IconButton
            size={"small"}
            aria-label="Modifier"
            onClick={(e) => this.modifyDatabase(database, e)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Supprimer la base de données">
          <IconButton
            size={"small"}
            aria-label="Supprimer"
            className={classes.btnSupprimer}
            onClick={(e) => this.deleteDatabase(database, e)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>

  }

  render() {
    const {classes, databases, accounts} = this.props;
    const { dialogadddatabase, dialogdeletedatabase, databaseId, databaseName, serverName } = this.state;

    return (
      <div>
        <Button
          className={classes.btnAjouter}
          variant="contained"
          color={"primary"}
          onClick={this.addDatabase}
        >
          <AddIcon className={classes.leftIcon} />
          Nouvelle base de données
        </Button>

        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Contributeurs</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {databases.map(database => (
            this.renderRow(database, classes)
            ))}
            </TableBody>
          </Table>


          <DialogAddDatabase
            classes={classes}
            accounts={accounts}
            open={dialogadddatabase}
            onClose={this.handleClose}
            onActionValidate={this.addDatabaseConfirmed}
          />

          <DialogDelete
            title={'Suppression de base de données'}
            open={dialogdeletedatabase}
            onClose={this.handleCloseDeleteDatabase}
            onActionValidate={this.deleteDatabaseConfirmed}
          >
            Supprimer la base de données <strong>'{databaseName}'</strong> du serveur '{serverName}' ?
          </DialogDelete>
        </Paper>
      </div>
    );
  }
}

DatabasesList.propTypes = {
  classes: PropTypes.object.isRequired,
  databases: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  handleAddDatabase: PropTypes.func.isRequired,
  handleModifyDatabase: PropTypes.func.isRequired,
  handleDeleteDatabase: PropTypes.func.isRequired,
};

export default DatabasesList;
