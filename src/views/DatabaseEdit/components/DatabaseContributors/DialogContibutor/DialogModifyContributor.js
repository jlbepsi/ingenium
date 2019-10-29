import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {Divider, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import List from '@material-ui/core/List';

import ButtonStyled from "../../../../share/ButtonStyled";
import FormModifyOtherContributor from "./FormModifyOtherContributor";
import PermissionListItem from "../../PermissionListItem";


function DialogModifyContributor(props) {

  const [password, setPassword] = React.useState('');
  const [btnAddDisabled, setBtnAddDisabled] = React.useState(false);

  const { classes, permissions, permissionid,
    onClose, onActionValidate, onChangePermission, ...other } = props;

  function handleSubmit () {
    onActionValidate(props.loginsql, password, props.permissionid);
  }

  function handleClose () {
    onClose('dialogmodifycontributor');
  }

  function handleChangePassword(value) {
    setPassword(value);
    setBtnAddDisabled(value === undefined);
  }

  function handleChangePermissionid(value) {
    onChangePermission(value)
  }

  function displayContributor() {
    let contributorForm;
    if (props.userFullName === null || props.userFullName === undefined) {
      contributorForm =
        <FormModifyOtherContributor
          classes={props.classes}
          loginsql={props.loginsql}
          password={password}
          onChangePassword={handleChangePassword}
        />
    } else {
      contributorForm =
        <TextField
          id="idContrib"
          label="Nom complet ou Login SQL"
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={true}

          value={props.userFullName}
        />
    }

    return contributorForm;
  }

  return (
    <Dialog
      onClose={handleClose}
      fullWidth={true}
      {...other}
    >
      <DialogTitle id="form-dialog-title">Modification du contributeur</DialogTitle>

      <DialogContent>

        <Typography variant={"h5"}>
          Contributeur
        </Typography>
        {displayContributor()}

        <Typography variant={"h5"}>
          Sélectionner un type de permission
        </Typography>
        <Divider />

        <List>

          {permissions.map( permission => (
            <PermissionListItem
              key={permission.id}
              classes={classes}
              permission={permission}
              permissionid={permissionid}
              onSelectPermission={handleChangePermissionid}
            />

            ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Annuler
        </Button>


        <ButtonStyled
          text='Modifier'
          variant={"success"}
          disabled={btnAddDisabled}
          onClick={handleSubmit}
        />

      </DialogActions>
    </Dialog>
  );
}

DialogModifyContributor.propTypes = {
  open: PropTypes.bool.isRequired,
  permissions: PropTypes.array.isRequired,
  loginsql: PropTypes.string.isRequired,
  userFullName: PropTypes.string,
  permissionid: PropTypes.number.isRequired,

  onClose: PropTypes.func,
  onChangePermission: PropTypes.func.isRequired,
  onActionValidate: PropTypes.func.isRequired,
};

export default DialogModifyContributor;