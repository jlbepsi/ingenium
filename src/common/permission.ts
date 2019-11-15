interface Permission {
  id: number
  initial: 'A' | 'M' | 'E' | 'L'
  title: string
  description: string
}

export const permissions: Permission[] = [
  {
    id: 1,
    initial: 'A',
    title: 'Administrateur',
    description: 'Droit de modification plus la suppression de la base de données et gestion des contributeurs',
  },
  {
    id: 2,
    initial: 'M',
    title: 'Modification',
    description: 'Droit de lecture plus l\'ajout/supression de table, vue, trigger, ...',
  },
  {
    id: 3,
    initial: 'E',
    title: 'Lecture/Ecriture',
    description: 'Droit de lecture plus l\'écriture des données',
  },
  {
    id: 4,
    initial: 'L',
    title: 'Lecture seulement',
    description: 'Lecture des données uniquement, aucune modification possible',
  },
]

export const findPermission = (permissionId: number): Permission | null => {
  return permissions.find(p => p.id === permissionId) || null
}

export const findPermissionTitle = (permissionId: number) => {
  const permission = findPermission(permissionId)
  return permission === null ? 'Aucune' : permission.title
}

