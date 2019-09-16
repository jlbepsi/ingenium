import React from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import GoIcon from "@material-ui/icons/KeyboardArrowRight";

import Icon from "@mdi/react";
import {mdiAccount} from "@mdi/js";
import Link from "@material-ui/core/Link";



function SuiviPPEInfo(props) {
  const { classes, profile } = props;

  return (
    <Paper
      className={classes.paper}
    >
      <div className={classes.content}>
        <div className={classes.iconWrapper}>
          <Icon
            path={mdiAccount}
            size={3}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.value}
            variant="h1"
          >
            { profile.btsparcours }
          </Typography>
          <Typography
            className={classes.title}
            variant="body2"
          >
            BTS SIO
          </Typography>
        </div>
      </div>
      <Divider />
      <div className={classes.footer}>

        <Button
          variant="outlined"
          color={"primary"}
          fullWidth
          size={"small"}
        >
          <Link target="_blank"  href='https://newsuivippe.montpellier.epsi.fr' rel="noopener">Accéder au site</Link>
          <GoIcon />
        </Button>
      </div>
    </Paper>
  )
}

SuiviPPEInfo.propTypes = {
  classeName: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withRouter(SuiviPPEInfo);