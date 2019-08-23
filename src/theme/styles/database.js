import {lavenderblush, red} from "../../common/colors";

export default theme => ({

  root: {
    margin: '16px',
  },

  list: {
    marginBottom: '16px',
    marginTop: '16px'
  },
  image: {
    width: '50%',
  },
  btnAjouter : {
    marginTop: '10px',
    marginBottom: '10px',
  },
  btnSupprimer : {
    '&:hover': {
      color: theme.palette.danger.dark,
    },
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  errorMessages: {
    height: 50,
    marginTop: theme.spacing(2),
    color: red,
    backgroundColor: lavenderblush
  },
  noErrors: {
    height: 74,
  },
  tab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '30px'
  },
  formControl: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    margin: '8px',
  },
  formControlDisabled: {
    color: theme.palette.primary.dark,
    fontWeight: '500',
    backgroundColor: theme.palette.common.limeblue,
  },
  chip: {
    margin: '4px',
  },
  card: {
    maxWidth: 270,
  },
  cardHeader:{
    backgroundColor: '#C4DDF2',

  },
  media: {
    height: 70,
    //paddingTop: '56.25%', // 16:9
  },
  rightIcon: {
    marginLeft: 'auto',
  },

  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.common.limegrey,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing.unit
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.common.limeblue,
    //backgroundColor: theme.palette.primary.limelight,
    '& $listItemText': {
      color: theme.palette.text.primary
    },
    '& $listItemIcon': {
      color: theme.palette.primary.main,
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: theme.palette.common.grey,
  },
  listItemAvatarPrimary: {
    margin: 10,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
});
