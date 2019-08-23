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
    "SqlLogin":null,
    "UserLogin":null,
    "DatabaseServerName":
      {
        "Id":0,
        "Code":"TEST",
        "Name":"ServerTest",
        "IPLocale":"0.0.0.0",
        "NomDNS":"aucun",
        "Description":"Utilisé pour les tests",
        "CanAddDatabase":0
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
  addAccountConfirmed = (password, serverid) => {
    this.props.handleAddAccount(password, serverid);
    this.setState({ dialogaddaccount: false });
  };

  modifyAccount = (account) => {
    this.setState({ accountSelected: account });
    this.setState({ dialogmodifyaccount: true });
  };
  modifyAccountConfirmed = (sqllogin, password, serverid) => {
    this.props.handleModifyAccount(sqllogin, password, serverid);
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
    this.props.handleDeleteAccount(this.state.accountSelected.SqlLogin, this.state.accountSelected.DatabaseServerName.Id);
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
              key={account.DatabaseServerName.Id + account.SqlLogin}
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
          serverName={accountSelected.DatabaseServerName.Code}
          open={dialogserveraccess}
          onClose={this.handleClose}
        />

        <DialogDelete
          title={'Suppression de compte'}
          open={dialogdeleteaccount}
          onClose={this.handleCloseDeleteAccount}
          onActionValidate={this.deleteAccountConfirmed}
        >
          Supprimer le compte <strong>'{accountSelected.SqlLogin}'</strong> pour le serveur <strong>{accountSelected.DatabaseServerName.NomDNS}</strong> ?
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