import React from 'react';


function PrinterLinux(props) {

  const {printer} = props;

  const driverfile = "/files/printers/" + printer.driverlinux;
  const image3 = "/images/printers/hplinux_install.3." + printer.model + ".png";

  return (<div>

      <p>Vous devez d'abord <a href={driverfile} target="_blank" rel="noopener noreferrer">télécharger le driver de l'imprimante</a>.</p>


      <p>Installer l'imprimante sous Linux</p>
      <ul>
        <li>1 - Ouvrir <code>Paramètres</code> puis <code>Périphériques</code>. En bas de la fenêtre cliquer sur<code>Paramètres d'imprimantes supplémentaires</code></li>
        <li>2 - Entrer l'addresse <code>http://imprimantes.montpellier.epsi.fr:631/printers/{printer.title}</code></li>
        <li>3 - Cliquer sur Ajouter</li>
        <li><img src={"/images/printers/hplinux_install.2.png"}/> </li>
        <li><img src={image3}/> </li>
      </ul>
    </div>
  );
}

export default PrinterLinux;