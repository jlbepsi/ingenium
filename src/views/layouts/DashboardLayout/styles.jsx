export default theme => ({
  topbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 'auto',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  topbarShift: {
    marginLeft: '219px',
    width: 'calc(-219px + 100vw)'
  },
  drawerPaper: {
    zIndex: 1200,
    width: '219'
  },
  sidebar: {
    width: '218px'
  },
  content: {
    marginTop: '64px',
    //backgroundColor: theme.palette.background.default,
    backgroundColor: theme.palette.background.light,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: '218px'
  }
});
