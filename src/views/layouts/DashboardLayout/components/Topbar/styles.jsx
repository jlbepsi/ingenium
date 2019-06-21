export default theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.common.lightblue,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit
  },
  menuButton: {
    color: theme.palette.common.white,
    marginLeft: '-4px'
  },
  signOutButton: {
    color: theme.palette.common.white,
    marginLeft: 'auto'
  }
});
