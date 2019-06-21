import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import {Button} from "@material-ui/core";
import {amber, green} from "@material-ui/core/colors";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  none: {
  },
  success: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  error: {
    backgroundColor: '#dc3545',
    '&:hover': {
      backgroundColor: '#c82333',
    },
  },
  warning: {
    backgroundColor: amber[700],
    '&:hover': {
      backgroundColor: amber[800],
    },
  },
  info: {
    backgroundColor: '#1fa2b7',
    '&:hover': {
      backgroundColor: '#138496',
    },
  },
});


let ButtonStyled = props => {
  const {classes, className, text, variant, ...other} = props;
  const Icon = variantIcon[variant];

  return (
    <Button
      variant="contained"
      color="primary"
      className={classNames(classes[variant], className)}
      {...other}
    >
      <Icon/>&nbsp;
      {text}
    </Button>
  );
};


ButtonStyled.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(ButtonStyled);