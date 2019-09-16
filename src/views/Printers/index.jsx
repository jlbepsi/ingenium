import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {StepContent, Typography, withStyles} from '@material-ui/core/index';

// Material components
import { Grid } from '@material-ui/core/index';

// Shared layouts
import DashboardLayout from '../layouts/DashboardLayout';
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// icons
import {
  SettingsEthernet as SettingsEthernetIcon,
  Wifi as WifiIcon,
  Web as WebIcon,
} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";


import PrinterCard from './components/PrinterCard/index'

// Liste des produits VMWare
import printers from './printers';

// Component styles
const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 4,
  },
  printers: {
    marginTop: 16,
    marginBottom: 16,
  },
  displayText: {
    marginBottom: 16,
  },
  displayTextHeader: {
    marginTop: 16,
    marginBottom: 16,
  },
  tab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


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

class Index extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  renderPrinters() {

    if (printers.length === 0) {
      return (
        <Typography variant="h6">Aucun produit n'est disponible.</Typography>
      );
    }

    return (
      <Grid
        container
        spacing={3}
      >
        {printers.map(printer => (
          <Grid
            item
            key={printer.id}
            lg={4}
            md={6}
            xs={12}
          >
            <PrinterCard printer={printer} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const tabValue = this.state.value;

    return (
      <DashboardLayout title="Imprimantes">
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Imprimantes disponibles
          </Typography>
          <Divider />

          <div className={classes.printers}>{this.renderPrinters()}</div>

          <Typography variant="subtitle2" gutterBottom>
            Comment se connecter aux imprimantes ?
          </Typography>
          <Typography
            className={classes.displayText}
            variant="body1"
          >
            <ul>
              <li>Si vous êtes en filaire : choisissez l'option Impression en filaire <SettingsEthernetIcon /> </li>
              <li>Si vous êtes en Wifi : choisissez l'option Impression via le Wifi <WifiIcon /> <strong>(option recommandée)</strong></li>
              <li>Si vous êtes fan du Bureau Virtuel : choisissez l'option Impression avec le Bureau Virtuel <WebIcon /></li>
            </ul>
          </Typography>

          <Paper square className={classes.tab}>
            <Tabs
              value={tabValue}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<SettingsEthernetIcon />} label="Impression filaire" />
              <Tab icon={<WifiIcon />} label="Impression Wifi" />
              <Tab icon={<WebIcon />} label="Impression Bureau Virtuel" />
            </Tabs>

            {tabValue === 0 && <TabContainer>

              <p><b>Attention: vous devez impérativement être connecté <u>en filaire</u>.</b></p>
              <Typography variant="subtitle2" gutterBottom>
                Installation d'une imprimante avec Windows
              </Typography>

              <Typography variant="body1"
                          className={classes.displayTextHeader}
              >
                Aller dans le menu <code>Menu Démarrer -> Périphériques et imprimantes -> Ajout d’imprimante -> Ajouter une imprimante réseau  -> L’imprimante que je veux n’est pas répertoriée</code><br />
                Choisissez l’option "Ajouter une imprimante à l'aide d'une adresse TCP/IP ..."
                <p>Entrez l'adresse IP de l'imprimante souhaitée</p>

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

              <Typography variant="subtitle2" gutterBottom>
                Installation d'une imprimante avec Ubuntu
              </Typography>

              <Typography variant="body1"
                          className={classes.displayTextHeader}
              >
                Aller dans le menu <code>Menu Système -> Administration -> Impression puis ajouter l’imprimante</code><br />
                Vous devez voir apparaitre l’écran suivant :<br />
                Entrez l'adresse IP de l'imprimante souhaitée puis appuyer sur suivant.<br />
                Vous devez choisir les pilotes appropriés dans la base de données.<br />

                <h5>Installation d'une imprimante avec Mac</h5>
                <p>Vous devez d'abord télécharger sur le site HP les drivers PCL 6 correspondant à l'imprimante :</p>
                <ul>
                  <li><a href="https://support.hp.com/fr-fr/drivers/selfservice/hp-laserjet-enterprise-p3015-printer-series/3815797" target="_blank">HP 3010/3015 : Laserjet P3010</a></li>
                </ul>
                <p>Ensuite, vous faites une recherche d'imprimantes (ou indiquer l'adresse IP) puis vous l'installez.</p>
              </Typography>
            </TabContainer>}

            {tabValue === 1 && <TabContainer>


              <Typography variant="subtitle2" gutterBottom>
                Vous pouvez imprimer en filaire ou en en Wifi (via le protocole IPP)
              </Typography>

              <Typography variant="body1"
                          className={classes.displayTextHeader}
              >
                <p>Pour cela vous devez renseigner l'adresse HTTP de l'imprimante: </p>

                <p>Vous devez d'abord télécharger sur le site HP les drivers correspondant à l'imprimante :</p>
                <ul>
                  <li><a href="https://support.hp.com/fr-fr/drivers/selfservice/hp-laserjet-enterprise-p3015-printer-series/3815797" target="_blank">HP 3010/3015 : Laserjet P3010</a></li>
                </ul>
                <p>Vous devez ensuite :</p>
                <ul>
                  <li>Ouvir un navigateur Web</li>
                  <li>Aller à l'adresse <a href="http://imprimantes.montpellier.epsi.fr/printers/ipp_0001.asp" target="_blank">http://imprimantes.montpellier.epsi.fr/printers/ipp_0001.asp</a></li>
                  <li>Entrer l'identifiant <code>userMTP</code> et le mot de passe <code>123ABC</code></li>
                </ul>

                <p>Installer l'imprimante sous Windows</p>
                <ul>
                  <li>Ouvrir le panneau de configuration</li>
                  <li>Ajouter une imprimante</li>
                  <li>Choisir l'option "Sélectionner une imprimante par son nom" puis renseigner l'une des addresses ci-dessous</li>
                  <ul>
                    <li>IMP-EPMTP-S6-1: <code>http://imprimantes.montpellier.epsi.fr/printers/IMP-EPMTP-S6-1/.printer</code></li>
                    <li>IMP-EPMTP-S6-2: <code>http://imprimantes.montpellier.epsi.fr/printers/IMP-EPMTP-S6-2/.printer</code></li>
                    <li>IMP-EPMTP-S6-3: <code>http://imprimantes.montpellier.epsi.fr/printers/IMP-EPMTP-S6-3/.printer</code></li>
                  </ul>
                  <li>Exemple:
                    <img src="/images/printers/rechercher_imprimante.png" alt="Imprimantes" /><br />
                  </li>
                </ul>
              </Typography>
            </TabContainer>}

            {tabValue === 2 && <TabContainer>
              <Typography variant="subtitle2" gutterBottom>
                Procédure de connexion
              </Typography>

              <Typography variant="body1"
                          className={classes.displayTextHeader}
              >
                <p>
                  Dans un premier temps, il faut installer le <a href="http://www.citrix.fr/downloads/citrix-receiver/receiver-easy-install/detect-my-device-and-install-receiver.html" target="_blank">plugin citrix receiver</a> .<br />
                  Une fois installé, vous pouvez vous connecter sur le site : <a href="https://cloudeduc.com" target="_blank">https://cloudeduc.com</a>.<br />
                  Informations de connexion :
                  <ul>
                    <li>Identifiant : <b>groupe-pedago\</b><i>votre login</i></li>
                    <li>Mot de passe: <i>votre mot de passe</i></li>
                  </ul>
                </p>
              </Typography>

              <Typography variant="subtitle2" gutterBottom>
                Accéder à votre environnement de bureau
              </Typography>

              <Typography variant="body1"
                          className={classes.displayTextHeader}
              >
                <table>
                  <tr>
                    <td>
                      Vous arriverez par défaut sur une interface vous proposant de cliquer sur <b> « Adobe CC Workspace » </b>.<br />
                      <img src="/images/bureauvirtuel/cloud1.png" alt="" /><br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Vous aurez alors accès à tous vos fichiers et applications tels que la <b>suite Adobe</b></p>
                      <p>Il faut accepter l'utilisation de votre poste depuis Citrix</p>
                      <img src="/images/bureauvirtuel/cloud2.png" alt="" /><br />
                      <p>Il faut aussi accepter l'accès aux documents de votre poste depuis Citrix</p>
                      <img src="/images/bureauvirtuel/cloud3.png" alt="" /><br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Vous avez aussi <b>accès aux imprimantes</b> de l'école :</p>
                      <ul>
                        <li>ced-eptmp-m501 : <b>Croix-Verte</b></li>
                        <li>ced-eptmp-s5 : <b>Apothicaire</b></li>
                        <li>ced-eptmp-s6 : <b>Apothicaire</b></li>
                      </ul>
                      <p>Exemple d'impression depuis Adobe Reader</p>
                      <img src="/images/bureauvirtuel/cloud4.png" alt="" /><br />
                    </td>
                  </tr>
                </table>

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


        </div>
      </DashboardLayout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
