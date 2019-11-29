import React from 'react';


function PrinterMac(props) {

  const {printer} = props;

  return (
    <div>
      <p>Installer l'imprimante sous Mac</p>
      <ul>
        <li>1 - Ouvrir les paramètres</li>
        <li>2 - Entrer l'addresse <code>http://imprimantes.montpellier.epsi.fr:631/printers/{printer.title}</code></li>
        <li>3 - Cliquer sur Ajouter</li>
      </ul>
    </div>
  );
}

export default PrinterMac;