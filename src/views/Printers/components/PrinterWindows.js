import React from 'react';


function PrinterWindows(props) {

  const {printer} = props;

  return (
    <div>
      <p>Vous devez d'abord <a href="/files/printers/{printer.driverwindows}" target="_blank">télécharger le driver de l'imprimante</a>.</p>

      <p>Installer l'imprimante sous Windows</p>
      <ul>
        <li>1 - Ouvrir le panneau de configuration</li>
        <li>2 - Ajouter une imprimante</li>
        <li>3 - Choisir l'option "Sélectionner une imprimante par son nom"</li>
        <li>4 - Entrer l'addresse <code>http://imprimantes.montpellier.epsi.fr:631/printers/{printer.title}</code> Exemple:
          <img src="/images/printers/rechercher_imprimante.png" alt="Imprimantes"/><br/>
        </li>
      </ul>
    </div>
  );
}

export default PrinterWindows;
