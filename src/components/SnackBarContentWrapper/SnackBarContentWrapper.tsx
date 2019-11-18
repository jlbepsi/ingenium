import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles, Theme } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default ({ className, message, onClose, variant, ...props }: Props) => {
  const classes = useStyles()
  const Icon = variantIcon[variant]

  const handleCloseButtonClick = () => onClose()

  const actionButtons = (onClose === undefined ? [] : (
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={handleCloseButtonClick}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>
  ))

  return (
    <SnackbarContent
      className={`${classes[variant]} ${className}`}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </span>
      )}
      action={actionButtons}
      {...props}
    />
  )
}

interface Props {
  className?: string
  message: string
  onClose: Function
  variant: 'success' | 'warning' | 'error' | 'info'
}