import React, {Component} from "react";
import PropTypes from "prop-types";
import {Grid} from "@material-ui/core";


import AccountCard from "./AccountCard";
import DialogServerAccess from "./AccountCard/DialogServerAccess";
import DialogAddAccount from "./AccountCard/DialogAddAccount";
import DialogDelete from "../../../share/DialogDelete";
import DialogModifyAccount from "./AccountCard/DialogModifyAccount";


const dummyAccount =
  {
    "sqlLogin":null,
    "userLogin":null,
    "server":
      {
        "id":0,
        "code":"TEST",
        "name":"ServerTest",
        "ipLocale":"0.0.0.0",
        "nomDns":"aucun",
        "description":"Utilisé pour les tests",
        "canAddDatabase":0
      }
  };

class AccountsList extends Component {

  state = {
    dialogserveraccess: false,
    dialogdeleteaccount: false,
    dialogaddaccount: false,
    dialogmodifyaccount: false,
    accountSelected: dummyAccount,
  };



  handleClose = (name) => {
    this.setState({ [name]: false });
  };


  addAccount = (account) => {
    this.setState({ accountSelected: account });
    this.setState({ dialogaddaccount: true });
  };
  addAccountConfirmed = (password, serverId) => {
    this.props.handleAddAccount(password, serverId);
    this.setState({ dialogaddaccount: false });
  };

  modifyAccount = (account) => {
    this.setState({ accountSelected: account });
    this.setState({ dialogmodifyaccount: true });
  };
  modifyAccountConfirmed = (sqlLogin, password, serverId) => {
    this.props.handleModifyAccount(sqlLogin, password, serverId);
    this.setState({ dialogmodifyaccount: false });
  };

  handleCloseDeleteAccount = () => {
    this.setState({ dialogdeleteaccount: false });
  };
  deleteAccount = (account) => {
    this.setState({ accountSelected: account });
    this.setState({ dialogdeleteaccount: true });
  };
  deleteAccountConfirmed = () => {
    this.props.handleDeleteAccount(this.state.accountSelected.sqlLogin, this.state.accountSelected.server.id);
    this.setState({ accountSelected: dummyAccount });
    this.setState({ dialogdeleteaccount: false });
  };

  serverAccess = (account) => {
    this.setState({ accountSelected: account });
    this.setState({ dialogserveraccess: true });
  };


  render() {

    const { classes, accounts } = this.props;
    const { accountSelected, dialogserveraccess, dialogdeleteaccount, dialogaddaccount,
            dialogmodifyaccount } = this.state;

    return(
      <div>
        <Grid
          container
          spacing={3}
        >
          {accounts.map(account => (
            <AccountCard
              key={account.server.id + account.sqlLogin}
              classes={classes}
              account={account}
              handleAddAccount={this.addAccount}
              handleModifyAccount={this.modifyAccount}
              handleDeleteAccount={this.deleteAccount}
              handleServerAccess={this.serverAccess}
            />
          ))}
        </Grid>

        <DialogServerAccess
          server={accountSelected.server}
          open={dialogserveraccess}
          onClose={this.handleClose}
        />

        <DialogDelete
          title={'Suppression de compte'}
          open={dialogdeleteaccount}
          onClose={this.handleCloseDeleteAccount}
          onActionValidate={this.deleteAccountConfirmed}
        >
          Supprimer le compte <strong>'{accountSelected.sqlLogin}'</strong> pour le serveur <strong>{accountSelected.server.nomDns}</strong> ?
        </DialogDelete>

        <DialogAddAccount
          classes={classes}
          accountSelected={accountSelected}
          open={dialogaddaccount}
          onClose={this.handleClose}
          onActionValidate={this.addAccountConfirmed}
        />
        <DialogModifyAccount
          classes={classes}
          accountSelected={accountSelected}
          open={dialogmodifyaccount}
          onClose={this.handleClose}
          onActionValidate={this.modifyAccountConfirmed}
        />
      </div>
  );
  }
}

AccountsList.propTypes = {
  classes: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  handleAddAccount: PropTypes.func.isRequired,
  handleModifyAccount: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
};

export default AccountsList;