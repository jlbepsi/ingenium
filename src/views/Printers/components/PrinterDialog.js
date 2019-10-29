import React from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {SettingsEthernet as SettingsEthernetIcon, Web as WebIcon, Wifi as WifiIcon} from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import PropTypes  from "prop-types";
import PrinterWindows from "./PrinterWindows";
import PrinterMac from "./PrinterMac";
import PrinterLinux from "./PrinterLinux";



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function PrinterDialog(props) {
  const [tabValue, setTabValue] = React.useState(1);

  const { classes, onClose, open, printer } = props;

  function handleChange(event, value) {
    setTabValue(value);
  }
  function handleClose() {
    onClose();
  }

  if (printer === null) {
    return (<Dialog
        fullWidth={true}
        maxWidth={"lg"}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
      >
        <DialogTitle id="dialog-title">Installer l'imprimante </DialogTitle>
      </Dialog>
      )
  }

  function isFilaireDisabled() {
    return printer.typeacces.indexOf('Filaire') < 0;
  }
  function isWifiDisabled() {
    return printer.typeacces.indexOf('Wifi') < 0;
  }
  function isBureauVirtuelDisabled() {
    return printer.typeacces.indexOf('Bureau') < 0;
  }

  function showImprimanteFilaire() {
    const plateform = window.navigator.platform;

    let text = '<div></div>';

    if (plateform.indexOf('Windows') >= 0) {
      text = <div>
        <Typography variant="subtitle2" gutterBottom>
          Installation d'une imprimante avec Windows
        </Typography>

        <Typography variant="body1"
                    className={classes.displayTextHeader}
        >
          Aller dans le menu <code>Menu Démarrer -> Périphériques et imprimantes -> Ajout d’imprimante -> Ajouter une imprimante réseau  -> L’imprimante que je veux n’est pas répertoriée</code><br />
          Choisissez l’option "Ajouter une imprimante à l'aide d'une adresse TCP/IP ..."
          <p>Entrez l'adresse IP <code>{printer.adresseip}</code></p>

          <h5>En cas de problème</h5>
          <p>
            Avec Windows 8.x, l'installation et/ou l'impression échoue parfois. Il faut relancer le "Spouleur d'impression".<br />
            Pour relancer le "Spouleur d'impression":
          </p>
          <ul>
            <li>Ouvrir la console des Services. (En ligne de commande, taper : <code>services.msc</code>)</li>
            <li>Trouver dans la liste le "Spouleur d'impression"</li>
            <li>Relancer le service</li>
          </ul>
        </Typography>
      </div>
    } else  if (plateform.indexOf('Mac') >= 0) {
      text = <div>
        <Typography variant="subtitle2" gutterBottom>
          Installation d'une imprimante avec Mac
        </Typography>

        <Typography variant="body1"
                    className={classes.displayTextHeader}
        >
          <p>Vous devez d'abord télécharger sur le site HP les drivers PCL 6 correspondant à l'imprimante :</p>
          <ul>
            <li><a href="https://support.hp.com/fr-fr/drivers/selfservice/hp-laserjet-enterprise-p3015-printer-series/3815797" target="_blank" rel="noopener noreferrer">HP 3010/3015 : Laserjet P3010</a></li>
          </ul>
          <p>Ensuite, vous faites une recherche d'imprimantes (ou indiquer l'adresse IP) puis vous l'installez.</p>
        </Typography>
      </div>
    } else  { //if (plateform.indexOf('Linux') >= 0)
      text = <div>
        <Typography variant="subtitle2" gutterBottom>
          Installation d'une imprimante avec Ubuntu
        </Typography>

        <Typography variant="body1"
                    className={classes.displayTextHeader}
        >
          Aller dans le menu <code>Paramètres</code> puis <code>Périphériques</code> puis ajouter l’imprimante<br/>
          Vous devez voir apparaitre l’écran suivant :<br/>
          Entrez l'adresse IP <code>{printer.adresseip}</code> puis appuyer sur suivant.<br/>
          Vous devez choisir les pilotes appropriés dans la base de données.<br/>
        </Typography>
      </div>
    }

    return text;
  }
  function showImprimanteWifi() {

    const plateform = window.navigator.platform;
    console.log("Plateforme=" + plateform)

    let text = '';
    if (plateform.indexOf('Win32') >= 0 || plateform.indexOf('Windows') >= 0) {
      text =  <PrinterWindows
                printer = {printer}
              />;
    } else  if (plateform.indexOf('Mac') >= 0) {
      text =  <PrinterMac
                printer = {printer}
              />;
    } else {
      // Linux
      text =  <PrinterLinux
                printer = {printer}
              />;
    }

    return text;
  }

  let tabSelected = tabValue;
  if (tabSelected === 0 && isFilaireDisabled()) {
    tabSelected = 1;
  }
  if (tabSelected === 1 && isWifiDisabled()) {
    tabSelected = 2;
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      open={open}
    >
      <DialogTitle id="dialog-title">Installer l'imprimante {printer.title}</DialogTitle>

      <Paper square className={classes.tab}>
        <Tabs
          value={tabSelected}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            icon={<SettingsEthernetIcon/>}
            label="Impression filaire"
            disabled={isFilaireDisabled()}
          />
          <Tab
            icon={<WifiIcon/>}
            label="Impression Wifi"
            disabled={isWifiDisabled()}
          />
          <Tab
            icon={<WebIcon/>}
            label="Impression Bureau Virtuel"
            disabled={isBureauVirtuelDisabled()}
          />
        </Tabs>

        {tabSelected === 0 && <TabContainer>

          <p><b>Attention: vous devez impérativement être connecté <u>en filaire</u>.</b></p>

          {showImprimanteFilaire()}

        </TabContainer>}

        {tabSelected === 1 && <TabContainer>
          <Typography variant="subtitle2" gutterBottom>
            Vous pouvez imprimer en Wifi (via le protocole IPP)
          </Typography>

          <Typography variant="body1"
          className={classes.displayTextHeader}
          >

            {showImprimanteWifi()}

          </Typography>
        </TabContainer>}

        {tabSelected === 2 && <TabContainer>
          <Typography variant="subtitle2" gutterBottom>
            Procédure de connexion
          </Typography>

          <Typography variant="body2"
                      className={classes.displayTextHeader}
          >
              Dans un premier temps, il faut installer le <a href="http://www.citrix.fr/downloads/citrix-receiver/receiver-easy-install/detect-my-device-and-install-receiver.html" target="_blank" rel="noopener noreferrer">plugin citrix receiver</a> .<br />
              Une fois installé, vous pouvez vous connecter sur le site : <a href="https://cloudeduc.com" target="_blank" rel="noopener noreferrer">https://cloudeduc.com</a>.<br />
              Informations de connexion :
              <ul>
                <li>Identifiant : <b>groupe-pedago\</b><i>votre login</i></li>
                <li>Mot de passe: <i>votre mot de passe</i></li>
              </ul>
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Accéder à votre environnement de bureau
          </Typography>

          <Typography variant="body2"
                      className={classes.displayTextHeader}
          >
            Vous arriverez par défaut sur une interface vous proposant de cliquer sur <b> « Adobe CC Workspace » </b>.<br />
                  <img src="/images/bureauvirtuel/cloud1.png" alt="" />

                  <p>Vous aurez alors accès à tous vos fichiers et applications tels que la <b>suite Adobe</b></p>
                  <p>Il faut accepter l'utilisation de votre poste depuis Citrix</p>
                  <img src="/images/bureauvirtuel/cloud2.png" alt="" /><br />
                  <p>Il faut aussi accepter l'accès aux documents de votre poste depuis Citrix</p>
                  <img src="/images/bureauvirtuel/cloud3.png" alt="" /><br />

                  <p>Vous avez aussi <b>accès aux imprimantes</b> de l'école :</p>
                  <ul>
                    <li>ced-eptmp-m501 : <b>Croix-Verte</b></li>
                    <li>ced-eptmp-s5 : <b>Apothicaire</b></li>
                    <li>ced-eptmp-s6 : <b>Apothicaire</b></li>
                  </ul>
                  <p>Exemple d'impression depuis Adobe Reader</p>
                  <img src="/images/bureauvirtuel/cloud4.png" alt="" /><br />

          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Assistance
          </Typography>

          <Typography variant="body1"
                      className={classes.displayTextHeader}
          >
            <p>
              Pour bénéficier du service Cloud, vous devez obligatoirement avoir un compte utilisateur sur cette infrastructure. <br />
              Cette demande est faite par le service pédagogique de votre école. Les identifiants seront les mêmes que votre compte ecampus.<br /><br />
              Si vous rencontrez des problèmes pour vous y connecter, vous pouvez nous contacter sur <a href="mailto:support@campus-cd.net">support@campus-cd.net</a>.<br />
              N’hésitez pas à nous faire des retours sur votre ressentie ainsi que sur les améliorations ou services que nous pouvons vous apporter.<br />
              Le lancement des applications peut mettre jusqu’à 1 minute pour se lancer suivant la performance de votre matériel et votre liaison Internet.
            </p>

          </Typography>

        </TabContainer>}
      </Paper>
    </Dialog>
  );
}


PrinterDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  printer: PropTypes.object.isRequired
};


export default PrinterDialog;