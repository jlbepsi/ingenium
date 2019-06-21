import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";


const MenuList = props => {
  const { title, classes } = props;

  const menuListItems = renderMenuItems(classes, props.menuList);

  return (
    <List
      component="div"
      disablePadding
      subheader={
        <ListSubheader className={classes.listSubheader}>
          {title}
        </ListSubheader>
      }
    >
      { menuListItems }

    </List>
  );
};


const renderMenuItems = (classes, menuItems) => (
    menuItems.map((menuItem, index) => (
      <ListItem
        key={index}
        activeClassName={classes.activeListItem}
        className={classes.listItem}
        component={NavLink}
        to={menuItem.link}
      >
        <ListItemIcon className={classes.listItemIcon}>
          {menuItem.icon}
        </ListItemIcon>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={menuItem.label}
        />
      </ListItem>
    ))
  );

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  menuList: PropTypes.array.isRequired,
};

export default MenuList