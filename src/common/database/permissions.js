
const permissions = [
  {
    id:1,
    initial: 'A',
    title: 'Administrateur',
    explanations: 'Droit de modification plus la suppression de la base de données et gestion des contributeurs'
  },
  {
    id:2,
    initial: 'M',
    title: 'Modification',
    explanations: "Droit de lecture plus l'ajout/supression de table, vue, trigger, ..."
  },
  {
    id:3,
    initial: 'E',
    title: 'Lecture/Ecriture',
    explanations: "Droit de lecture plus l'écriture des données"
  },
  {
    id:4,
    initial: 'L',
    title: 'Lecture seulement',
    explanations: "Lecture des données uniquement, aucune modification possible"
  },
];



function getPermissionText(permissionId) {
  const permission = permissions.find(p => p.id === permissionId);
  return (permission == null ? 'Aucune' : permission.title);
}
function getPermission(permissionId) {
  const p =  permissions.find(p => p.id === permissionId);
  return (p === undefined ? null : p);
}

export  {permissions, getPermissionText, getPermission};