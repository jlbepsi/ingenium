import React, {useEffect} from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {Divider, Typography} from "@material-ui/core";



import List from '@material-ui/core/List';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ButtonStyled from "../../../../share/ButtonStyled";
import FormEPSIContributor from "./FormEPSIContributor";
import FormOtherContributor from "./FormOtherContributor";
import PermissionListItem from "../../PermissionListItem";


function DialogAddContributor(props) {

  const NAME_EMPTY = 1;
  const NAME_LENGTH_INF = 1 << 2;
  const PASSWORD_EMPTY = 1 << 3;
  const PASSWORD_LENGTH_INF = 1 << 4;
  const PASSWORDCONFIRM_EMPTY = 1 << 5;
  const PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY = 1 << 6;
  const PERMISSION_EMPTY = 1 << 7;

  const [errors, setErrors] = React.useState( []);
  const [loginsql, setLoginsql] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [permissionid, setPermissionid] = React.useState(0);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [btnAddDisabled, setBtnAddDisabled] = React.useState(
    NAME_EMPTY | NAME_LENGTH_INF | PASSWORD_EMPTY | PASSWORD_LENGTH_INF |
    PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY | PERMISSION_EMPTY
  );


  useEffect( () => {
      verifyBtnAddDisabled()
    }, [loginsql, password, passwordConfirm, permissionid]
  );

  const { classes, permissions, serverId, onClose, onActionValidate, ...other } = props;

  function handleSubmit () {
    onActionValidate(loginsql, fullname, password, permissionid);

    setLoginsql('');
    setFullname('');
    setPassword('');
    setPermissionid(0);
  }

  function handleClose () {
    onClose('dialogaddcontributor');
  }

  function handleChangeTab(event, value) {
    setTabIndex(value);
  }
  function handleChangeLoginsql(loginsql, fullname) {
    setLoginsql(loginsql);
    setFullname(fullname);
  }
  function handleChangePassword(value) {
    setPassword(value);
  }
  function handleChangePasswordConfirm(value) {
    setPasswordConfirm(value);
  }
  function handleChangePermissionid(value) {
    setPermissionid(value);
  }

  function verifyBtnAddDisabled() {

    let errorsList = [];
    let disabled = 0x0;

    if (loginsql.length === 0) {
      disabled |= NAME_EMPTY;
      errorsList.push('Le nom doit être renseigné');
    } else  if (loginsql.length < 6) {
      disabled |= NAME_LENGTH_INF;
      errorsList.push('La longueur du nom doit être supérieure à 6');
    }

    if (tabIndex !== 0) {
      // Other Contributor
      if (password.length === 0) {
        disabled |= PASSWORD_EMPTY;
        errorsList.push('Le mot de passe doit être renseigné');
      } else if (password.length < 6) {
        disabled |= PASSWORD_LENGTH_INF;
        errorsList.push('La longueur du mot de passe doit être supérieure à 6');
      }
      if (passwordConfirm.length === 0) {
        disabled |= PASSWORDCONFIRM_EMPTY;
        errorsList.push('La confirmation du mot de passe doit être renseigné');
      } else if(passwordConfirm !== password) {
        disabled |= PASSWORD_NOT_EQUAL_PASSWORDCONFIRM_EMPTY;
        errorsList.push('Les mot de passe doivent être identique');
      }
    }

    if (permissionid === 0) {
      disabled |= PERMISSION_EMPTY;
      errorsList.push("Un type de compte doit être sélectionné");
    }
    setErrors(errorsList);
    setBtnAddDisabled(disabled);
  }

  function displayErrors() {
    if (errors.length === 0) {
      return (<div className={classes.noErrors} >&nbsp;</div>)
    }

    return (
      <div className={classes.errorMessages} >
        <ul>
          {errors.map( (error, index) => (
            <li key={index}><strong>{error}</strong></li>
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
      <DialogTitle id="form-dialog-title">Ajout d'un contributeur</DialogTitle>

      <DialogContent>

        <div className={classes.tab}>
          <Tabs
            value={tabIndex}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Contributeur EPSI" />
            <Tab label="Autre contributeur" />
          </Tabs>

          {tabIndex === 0 &&
            <FormEPSIContributor
              classes={classes}
              loginsql={loginsql}
              serverId={serverId}
              onChangeLogin={handleChangeLoginsql}
            />
          }

          {tabIndex === 1 &&
            <FormOtherContributor
              classes={classes}
              loginsql={loginsql}
              password={password}
              errorValues={btnAddDisabled}
              onChangeLogin={handleChangeLoginsql}
              onChangePassword={handleChangePassword}
              onChangePasswordConfirm={handleChangePasswordConfirm}
            />
          }
        </div>


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

        {displayErrors()}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Annuler
        </Button>


        <ButtonStyled
          text='Ajouter'
          variant={"success"}
          disabled={btnAddDisabled !== 0x0}
          onClick={handleSubmit}
        />

      </DialogActions>
    </Dialog>
  );
}

DialogAddContributor.propTypes = {
  open: PropTypes.bool.isRequired,
  permissions: PropTypes.array.isRequired,
  loginsql: PropTypes.string.isRequired,
  permissionid: PropTypes.number.isRequired,

  onClose: PropTypes.func,
  onActionValidate: PropTypes.func.isRequired,
};

export default DialogAddContributor;