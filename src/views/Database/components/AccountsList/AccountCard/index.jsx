import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {Grid, IconButton} from '@material-ui/core';

// Material components
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip";
import CardActions from "@material-ui/core/CardActions";
import AccessIcon from '@material-ui/icons/ExitToApp';
import PasswordIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';

import MySQLImage from './mysql.png'
import SQLServerImage from './sqlserver.png'
import OracleImage from './oracle.png'


class AccountCard extends Component {

  serverAccess = () => {
    this.props.handleServerAccess(this.props.account);
  };
  addAccount = () => {
    this.props.handleAddAccount(this.props.account);
  };
  modifyAccountPwd = () => {
    this.props.handleModifyAccount(this.props.account);
  };
  deleteAccount = () => {
    this.props.handleDeleteAccount(this.props.account);
  };


  render() {
    const {classes, account} = this.props;


    let AccountIcon;
    switch (account.DatabaseServerName.Code.toLowerCase()) {
      case "mysql":
        AccountIcon = MySQLImage;
        break;
      case "sqlserver":
        AccountIcon = SQLServerImage;
        break;
      case "oracle":
        AccountIcon = OracleImage;
        break;
    }

    let cardContent, cardAction = [];
    if (account.SqlLogin) {
      cardContent = <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Login: {account.SqlLogin}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          Serveur : {account.DatabaseServerName.NomDNS}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          {account.nbDatabases===0 ?
          <div>Aucune base de données</div>
          :
          <div>
            <b>Bases de données : {account.nbDatabases}</b>
          </div>
          }
        </Typography>
      </CardContent>;

      cardAction.push(
          <Tooltip title="Accès au serveur">
            <IconButton aria-label="Acces"
                        onClick={(e) => this.serverAccess()}
            >
              <AccessIcon />
            </IconButton>
          </Tooltip>);
      cardAction.push(
          <div className={classes.rightIcon}>
            <Tooltip title="Modifer le mot de passe">
              <IconButton aria-label="Mot de passe"
                          onClick={this.modifyAccountPwd}
              >
                <PasswordIcon />
              </IconButton>
            </Tooltip>
          </div>);

      if (account.nbDatabases === 0) {
        cardAction.push(
          <Tooltip title="Supprimer">
            <IconButton
              aria-label="Supprimer"
              className={classes.btnSupprimer}
              onClick={this.deleteAccount}
            >
              <DeleteIcon/>
            </IconButton>
          </Tooltip>);
      }

    } else {
      cardContent = <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Aucun compte
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          Serveur : {account.DatabaseServerName.NomDNS}
        </Typography>
      </CardContent>;

      cardAction =
        <Tooltip title="Ajouter un compte">
          <IconButton
            color={"primary"}
            aria-label="Ajouter"
            className={classes.rightIcon}
            onClick={this.addAccount}
          >
            <AddIcon className={classes.rightIcon} />
          </IconButton>
        </Tooltip>
    }

    return (
      <Grid
        item
        lg={3}
        md={6}
        xs={12}
      >
        <Card className={classes.card} >

          <CardMedia
            className={classes.media}
            image={AccountIcon}
            title="Compte base de données"
          />

          {cardContent}

          <CardActions>
            {cardAction}
          </CardActions>

        </Card>

      </Grid>
    );
  }
}

AccountCard.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  handleAddAccount: PropTypes.func.isRequired,
  handleModifyAccount: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
  handleServerAccess: PropTypes.func.isRequired,
};

export default AccountCard;


