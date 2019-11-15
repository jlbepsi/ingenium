import {lavenderblush, red} from "../../common/colors";
import { amber } from '@material-ui/core/colors';


import palette from '../../theme/palette';

const styles = theme => ({
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
      color: palette.danger.dark,
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
    backgroundColor: palette.background.paper,
    marginBottom: '30px'
  },
  formControl: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    margin: '8px',
  },
  formControlSelect: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  formControlDisabled: {
    color: palette.primary.dark,
    fontWeight: '500',
    backgroundColor: palette.common.limeblue,
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
      backgroundColor: palette.common.limegrey,
      borderLeft: `4px solid ${palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: palette.primary.main,
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing.unit
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${palette.primary.main}`,
    borderRadius: '4px',
    backgroundColor: palette.common.limeblue,
    //backgroundColor: palette.primary.limelight,
    '& $listItemText': {
      color: palette.text.primary
    },
    '& $listItemIcon': {
      color: palette.primary.main,
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: palette.common.grey,
  },
  listItemAvatarPrimary: {
    margin: 10,
    color: '#fff',
    backgroundColor: palette.primary.main,
  },
  listItemText: {
    fontWeight: 500,
    color: palette.text.secondary,
  },

  snackMessage: {
    margin: '8px',
    backgroundColor: amber[700],
  },

  snackMessageContent: {
    backgroundColor: amber[700],
    display: 'flex',
    alignItems: 'center',
  },
});
export default styles;