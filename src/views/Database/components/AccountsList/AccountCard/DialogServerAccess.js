import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {Divider, Typography} from "@material-ui/core";

function DialogServerAccess(props) {

  const { onClose, serverName, ...other } = props;

  function handleClose () {
    onClose('dialogserveraccess');
  }

  let serverDescription = '', serverNameUI = '';
  switch (serverName.toLowerCase()) {
    case "mysql":
      serverNameUI = 'MySQL';
      serverDescription = <div>

        <Typography variant="body2">
          L'accès à MySQL se fait depuis un navigateur web à l'URL <a href="https://mysql.montpellier.epsi.fr/" target="_blank">https://mysql.montpellier.epsi.fr/</a>
        </Typography>
        <br />
        <Divider />
        <br />

        <Typography variant="body2">
            Pour vous connecter à une base de données MySQL, vous devez utiliser les informations suivantes :
          <ul>
            <li>Identifiant : <i>le login de la base de données</i></li>
            <li>Mot de passe: <i>le mot de passe associé au login de la base de données</i></li>
            <li>Nom d'hôte: <code>mysql.montpellier.epsi.fr</code></li>
            <li>Port: <code>5206</code></li>
          </ul>
        </Typography>

      </div>;
      break;
    case "sqlserver":
      serverNameUI = 'SQL Server';
      serverDescription = <div>

        <Typography variant="body2">
          L'accès à SQL Server se fait depuis <a href="https://docs.microsoft.com/fr-fr/sql/ssms/download-sql-server-management-studio-ssms" target="_blank">SQL Server Management Studio</a>.<br />
        </Typography>
        <br />
        <Divider />
        <br />

        <Typography variant="body2">
          Pour vous connecter à une base de données SQL Server, vous devez utiliser les informations suivantes :
          <ul>
            <li>Identifiant : <i>le login de la base de données</i></li>
            <li>Mot de passe: <i>le mot de passe associé au login de la base de données</i></li>
            <li>Nom d'hôte: <code>sqlserver.montpellier.epsi.fr</code></li>
            <li>Port: <code>4433</code></li>
          </ul>
        </Typography>

      </div>;
      break;
    case "oracle":
      serverNameUI = 'Oracle';
      serverDescription = <div>

        <Typography variant="body2">
          L'accès à Oracle se fait depuis <a href="https://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.html" target="_blank">SQL Developer</a>.<br />
        </Typography>
        <br />
        <Divider />
        <br />

        <Typography variant="body2">
          Pour vous connecter à une base de données Oracle, vous devez utiliser les informations suivantes :
          <ul>
            <li>Identifiant : <i>le login de la base de données</i></li>
            <li>Mot de passe: <i>le mot de passe associé au login de la base de données</i></li>
            <li>Nom d'hôte: <code>oracle.montpellier.epsi.fr</code></li>
            <li>Port: <code>4521</code></li>
            <li>SID: <code>bdaolap</code></li>

          </ul>
        </Typography>

      </div>;
      break;
  }

  return (
      <Dialog
        onClose={handleClose}
        {...other}
      >
        <DialogTitle id="form-dialog-title">Accès au serveur {serverNameUI}</DialogTitle>
        <DialogContent>
          {serverDescription}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    );
}

DialogServerAccess.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  serverName: PropTypes.string.isRequired,
};

export default DialogServerAccess;