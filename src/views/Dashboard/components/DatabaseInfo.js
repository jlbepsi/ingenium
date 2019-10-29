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
import CircularProgress from "@material-ui/core/CircularProgress";


function DatabaseInfo(props) {

  function goTo() {
    props.history.push("/database");
  }

  const [nbDatabases, setNbDatabases] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // API
  const databasesAPI = new DatabasesAPI();

  const { classes, profile  } = props;

  useEffect( () => {
    /*
     * Chargement des bases de données
     */
    setLoading(true);
    //this.setState({isLoadingDatabases: true});
    databasesAPI.getDatabases(profile.sub)
      .then(data => {
        setLoading(false);
        setNbDatabases(data.length);
      })
      .catch(err => {
        setLoading(false);
        setNbDatabases(0);
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
            { loading ?
              <CircularProgress /> :
              <div>{nbDatabases}</div>
            }
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