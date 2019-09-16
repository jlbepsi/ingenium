import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import GoIcon from "@material-ui/icons/KeyboardArrowRight";
import Icon from "@mdi/react";
import {mdiDatabase} from "@mdi/js";
import DatabasesAPI from "../../../services/DatabasesAPI";


function DatabaseInfo(props) {

  function goTo() {
    props.history.push("/database");
  }

  const [nbDatabases, setNbDatabases] = React.useState("...");

  // API
  const databasesAPI = new DatabasesAPI();

  const { classes, profile  } = props;

  useEffect( () => {
    /*
     * Chargement des bases de données
     */
    //this.setState({isLoadingDatabases: true});
    databasesAPI.getDatabases(profile.sub)
      .then(data => {
        setNbDatabases(data.length);
        //this.setState({isLoadingDatabases: false});
      })
      .catch(err => {
        setNbDatabases(0);
        //this.setState({isLoadingDatabases: false});
      });

    }, []
  );


  return (
    <Paper
      className={classes.paper}
    >
      <div className={classes.content}>
        <div className={classes.iconWrapper}>
          <Icon
            path={mdiDatabase}
            size={3}
            color={'#007ACE'}
          />
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.value}
            variant="h1"
          >
            {nbDatabases}
          </Typography>
          <Typography
            className={classes.title}
            variant="body2"
          >
            Base de données
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

DatabaseInfo.propTypes = {
  classeName: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withRouter(DatabaseInfo);