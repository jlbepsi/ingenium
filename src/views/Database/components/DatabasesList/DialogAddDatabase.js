import React, {useEffect} from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {Divider, Typography} from "@material-ui/core";



import List from '@material-ui/core/List';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import ButtonStyled from "../../../share/ButtonStyled";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import AccountListItem from "../AccountListItem";

function DialogAddDatabase(props) {

  const [errors, setErrors] = React.useState(
    [
      'Le nom doit être renseigné',
      'Un compte doit être sélectionné'
    ]
  );

  const [dbName, setDbName] = React.useState('');
  const [accountId, setAccountId] = React.useState('');
  const [btnAddDisabled, setBtnAddDisabled] = React.useState(true);

  useEffect( () => {
      verifyBtnAddDisabled()
    }, [dbName, accountId]
  );

  const { classes, accounts, onClose, onActionValidate, ...other } = props;

  const handleChangeDbName = event => {
    const name = event.target.value;
    setDbName(name);
  };

  function handleAction () {
    onActionValidate(dbName, accountId);
    setDbName('');
    setAccountId('');
  }
  function handleChangeAccountId(value) {
    setAccountId(value);
  }

  function verifyBtnAddDisabled() {
    let errorsList = [];

    if (dbName.length === 0) {
      errorsList.push('Le nom doit être renseigné');
    }else if (dbName.length < 6) {
      errorsList.push('La longueur du nom doit être supérieure ou égale à 6');
    } else if (! dbName.match("^[a-zA-Z0-9][a-zA-Z0-9_.]+$")) {
      errorsList.push("Le nom ne doit pas comporter de caractères spéciaux");
    }

    if (accountId.length === 0) {
      errorsList.push("Un compte doit être sélectionné");
    }
    setErrors(errorsList);

    setBtnAddDisabled(errorsList.length > 0);
  }

  function handleClose () {
    onClose('dialogadddatabase');
  }

  function displayErrors() {
    if (errors.length === 0) {
      return (<div className={classes.noErrors} >&nbsp;</div>)
    }

    return (
      <div className={classes.errorMessages} >
        <ul>
          {errors.map( (error, index) => (
            <li key={index} ><strong>{error}</strong></li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={true}
      {...other}
    >
      <DialogTitle id="form-dialog-title">Ajout d'une base de données</DialogTitle>

      <DialogContent>

        <Typography variant={"h5"}>
          Sélectionner un compte
        </Typography>
        <Divider />

        <List>
          {accounts.map( account => (
            <AccountListItem
              key={account.DatabaseServerName.Id}
              classes={classes}
              account={account}
              accountId={accountId}
              onSelectAccount={handleChangeAccountId}
              />
            ))}
        </List>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="explanation-content"
            id="explanation-header"
          >
            <Typography className={classes.heading}>Pourquoi je ne vois pas tous les comptes ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Cette liste n'affiche que les comptes pour lesquels:
            </Typography>
            <br />>
            <ul>
              <li>vous avez créé un identifiant</li>
              <li>vous pouvez créer une bases de données (Oracle ne le permet pas).</li>
            </ul>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <TextField
          required
          id="dbname"
          label="Nom de la base de données"
          error={dbName.length === 0}
          onChange={handleChangeDbName}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <br />
        {displayErrors()}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Annuler
        </Button>


        <ButtonStyled
          text='Ajouter'
          variant={"success"}
          disabled={btnAddDisabled}
          onClick={handleAction}
        />

      </DialogActions>
    </Dialog>
  );
}

DialogAddDatabase.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
};

export default DialogAddDatabase;