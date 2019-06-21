import React from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";





function PermissionListItem(props) {

  const {classes, permission, permissionid, onSelectPermission } = props;

  function handleToggle() {
    onSelectPermission(permission.id)
  }


  return (

    <ListItem
      activeClassName={classes.activeListItem}
      className={classes.listItem}
      key={permission.id}
      button
      selected={permissionid===permission.id}
      onClick={handleToggle}
    >
      <ListItemAvatar
        className={classes.listItemIcon}
      >
        <Avatar className={permission.id === 1 ? classes.listItemAvatarPrimary : classes.listItemAvatar}>
          {permission.initial}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={permission.title}
        secondary={permission.explanations}
      />
    </ListItem>
  );
}

PermissionListItem.propTypes = {
  onSelectPermission: PropTypes.func.isRequired,

  classes: PropTypes.object.isRequired,
  permissionid: PropTypes.number.isRequired,
  permission: PropTypes.object.isRequired,
};

export default PermissionListItem;