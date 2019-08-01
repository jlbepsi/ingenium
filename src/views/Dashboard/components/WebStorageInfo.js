import React from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import GoIcon from "@material-ui/icons/KeyboardArrowRight";

import Icon from "@mdi/react";
import {mdiServerNetwork} from "@mdi/js";


function WebStorageInfo(props) {

  function goTo() {
    props.history.push("/webstorage");
  }

  const { classes} = props;

  return (
    <Paper
      className={classes.paper}
    >
      <div className={classes.content}>
        <div className={classes.iconWrapper}>
          <Icon
            path={mdiServerNetwork}
            size={3}
            color={'#d9534f'}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.value}
            variant="h1"
          >
            Actif
          </Typography>
          <Typography
            className={classes.title}
            variant="body2"
          >
            Espace Web
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
          onClick={goTo}
        >
          Voir le détail
          <GoIcon />
        </Button>
      </div>
    </Paper>
  )
}

WebStorageInfo.propTypes = {
  classeName: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withRouter(WebStorageInfo);