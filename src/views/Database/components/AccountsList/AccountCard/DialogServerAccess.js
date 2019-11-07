import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Button from "@material-ui/core/Button/index";
import {Divider, Typography} from "@material-ui/core";

function DialogServerAccess(props) {

  const { onClose, server, ...other } = props;

  function handleClose () {
    onClose('dialogserveraccess');
  }

  // {"Id":4,"Code":"SQLSERVER","Name":"SQL Server 2","IPLocale":"192.168.100.161","PortLocal":1433,"NomDNS":"sqlserver2.montpellier.epsi.fr",
  // "Description":"","CanAddDatabase":1}

  function getServerDescription() {
    let serverDescription = '';
    switch (server.code.toLowerCase()) {
      case "sqlserver":
        serverDescription =
          <Typography variant="body2">
            L'accès à SQL Server se fait depuis <a href="https://docs.microsoft.com/fr-fr/sql/ssms/download-sql-server-management-studio-ssms" target="_blank" rel="noopener noreferrer">SQL Server Management Studio</a>.<br />
          </Typography>
        break;
      case "oracle":
        serverDescription =
          <Typography variant="body2">
            L'accès à Oracle se fait depuis <a href="https://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.html" target="_blank"rel="noopener noreferrer">SQL Developer</a>.<br />
          </Typography>
        break;
      case "mysql":
        serverDescription =
          <Typography variant="body2">
            L'accès à MySQL se fait depuis un navigateur web à l'URL <a href="https://mysql.montpellier.epsi.fr/" target="_blank"rel="noopener noreferrer">https://mysql.montpellier.epsi.fr/</a>
          </Typography>
        break;
  }
  return serverDescription;
}


  function getAdditionnalInfo() {
    switch (server.code.toLowerCase()) {
      case "oracle":
        return "<li>SID: <code>bdaolap</code></li>";
      case "sqlserver":
      case "mysql":
      default:
        return "";
    }
  }

  return (
      <Dialog
        onClose={handleClose}
        {...other}
      >
        <DialogTitle id="form-dialog-title">Accès au serveur {server.name}</DialogTitle>
        <DialogContent>
          {getServerDescription()}

          <br />
          <Divider />
          <br />

          <Typography variant="body2">
            <p>Pour vous connecter à une base de données, vous devez utiliser les informations suivantes :</p>

            <p><b>Depuis l'extérieur</b></p>
            <ul>
              <li>Identifiant : <i>le login de la base de données</i></li>
              <li>Mot de passe: <i>le mot de passe associé au login de la base de données</i></li>
              <li>Nom d'hôte: <code>{server.nomDns}</code></li>
              <li>Port: <code>{server.portExterne}</code></li>
              {getAdditionnalInfo()}
            </ul>
            <p>Depuis votre espace Web</p>
            <ul>
              <li>Identifiant : <i>le login de la base de données</i></li>
              <li>Mot de passe: <i>le mot de passe associé au login de la base de données</i></li>
              <li>Nom d'hôte: <code>{server.nomDnslocal}</code></li>
              <li>Port: <code>{server.portLocal}</code></li>
              {getAdditionnalInfo()}
            </ul>
          </Typography>
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
  server: PropTypes.object.isRequired,
};

export default DialogServerAccess;