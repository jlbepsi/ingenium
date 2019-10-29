export default theme => ({
  root: {
    maxWidth: '100%',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  image: {
    width: '40%',
  },
  title: {
    fontSize: '15px',
    lineHeight: '18px',
    textAlign: 'right',
    marginTop: theme.spacing.unit * 2
  },
  description: {
    lineHeight: '14px',
    height: theme.spacing.unit * 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit
  },
  displayIcon: {
    color: theme.palette.text.secondary
  },
  displayText: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  endDateIcon: {
    marginLeft: 'auto',
    color: theme.palette.text.secondary
  },
});
