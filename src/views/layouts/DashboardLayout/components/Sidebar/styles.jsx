import {white} from "../../../../../common/colors";


import palette from '../../../../../theme/palette';

export default theme => ({
  root: {
    backgroundColor: palette.common.lightgrey,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '63px',
    flexShrink: 0
  },
  logoLink: {
    fontSize: 0
  },
  logoImage: {
    cursor: 'pointer'
  },
  logoDivider: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  nameText: {
    marginTop: theme.spacing(2)
  },
  listSubheader: {
    color: white,
    backgroundColor: palette.subheader,
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: palette.common.limegrey,
      borderRadius: '4px',
    },
  },
  activeListItem: {
    borderRadius: '4px',
    backgroundColor: palette.common.limeblue,
    '& $listItemText': {
      color: palette.primary.dark,
    },
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    color: palette.text.secondary,
  },
});
