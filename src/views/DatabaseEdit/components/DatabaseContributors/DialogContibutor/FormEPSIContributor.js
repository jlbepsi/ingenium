import React, {useEffect} from "react";
import PropTypes from "prop-types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


import ClasseSelect from "../../../../share/ClasseSelect";
import UtilisateursAPI from "../../../../../services/UtilisateursAPI";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import InfoIcon from '@material-ui/icons/Info';
import AccountsAPI from "../../../../../services/AccountsAPI";

function FormEPSIContributor(props) {

  const [classeSelected, setClasseSelected] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [serverAccounts, setServerAccounts] = React.useState([]);
  const [usersList, setUsersList] = React.useState([]);
  const [usersSelectDisabled, setUsersSelectDisabled] = React.useState(true);

  // API
  const accountsAPI = new AccountsAPI();
  // API Users
  const utilisateursAPI = new UtilisateursAPI();

  const { classes, loginsql, serverid } = props;

  useEffect( () => {
    // Obtention des utilisateur du serveur de cette base de données
    //this.setState({isLoadingDatabases: true});
    accountsAPI.getServerAccounts(serverid)
      .then(data => {
        setServerAccounts(data);
        updateUsersList(users, data);
      })
      .catch(err => {
      });
    }, []
  );

  function handleChangeMember(event, child) {
    props.onChangeLogin(event.target.value, child.props.children)
  }

  function handleChangeClasse(value) {
    setClasseSelected(value);
    setUsersSelectDisabled(true)

    utilisateursAPI.getUsersClasse(value)
      .then(data => {
        setUsers(data);
        updateUsersList(data, serverAccounts);
      });
  }

  function updateUsersList(usersClasse, serverUsersAccounts) {

    // On met l'attribut active à faux pour tout le monde
    usersClasse.forEach( (user => {
      user.active = false;
    }));

    // Pour chaque utilisateur du serveur, on met l'attribut active à vrai
    serverUsersAccounts.forEach( (userAccount => {
      let user = usersClasse.find( u => u.login === userAccount.UserLogin);

      if (user) {
        user.active = true;
      }
    }));

    setUsersList(usersClasse);
    setUsersSelectDisabled(false);
  }

  return(

    <div>
      <SnackbarContent
        className={classes.snackMessage}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.snackMessageContent}>
            <InfoIcon /> &nbsp;
            Seuls les étudiants ayant créé un compte sur ce serveur sont actif !
          </span>
        }
      />
      <ClasseSelect
        classes={classes}
        classeSelected={classeSelected}
        onChange={handleChangeClasse}
      />

      <FormControl
        fullWidth
        className={classes.formControlSelect}
        disabled={usersSelectDisabled}
      >
        <InputLabel shrink htmlFor="member">
          Membre
        </InputLabel>
        <Select
          id="member"
          value={loginsql}
          onChange={handleChangeMember}
        >
          {usersList.map( user => (
            <MenuItem value={user.login} disabled={! user.active} >{user.nomComplet}</MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}


FormEPSIContributor.propTypes = {
  classes: PropTypes.object.isRequired,
  loginsql: PropTypes.string,
  onChangeLogin: PropTypes.func.isRequired,
};

export default FormEPSIContributor;