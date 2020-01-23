import React from 'react';


function PrinterWindows(props) {

  const {printer} = props;
  const driverfile = "/files/printers/" + printer.driverwindows;

  return (
    <div>
      <p>Vous devez d'abord <a href={driverfile} target="_blank" rel="noopener noreferrer">télécharger et installer le driver de l'imprimante</a>.</p>

      <p>Installer l'imprimante sous Windows</p>
      <ul>
        <li>1 - Ouvrir le panneau de configuration</li>
        <li>2 - Ajouter une imprimante</li>
        <li>3 - Choisir "Je ne trouve pas l'imprimante ..." puis choisir l'option "Sélectionner une imprimante par son nom"</li>
        <li>4 - Entrer l'addresse <code>http://imprimantes.montpellier.epsi.fr:631/printers/{printer.title}</code>
          <br />Exemple: <br /><img src={"/images/printers/hpwin_install.1.png"} alt="Imprimantes"/>
        </li>
        <li>5 - Pour le driver, choisissez "Disque fourni" puis sélectionnez le répertoire d'installation du driver</li>
        <li>6 - Dans la liste, choississez "HP LaserJet Pro M501 PCL-6 puis "OK" et terminer l'opération</li>
      </ul>
    </div>
  );
}

export default PrinterWindows;
