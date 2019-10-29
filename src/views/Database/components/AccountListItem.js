import React from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";





function AccountListItem(props) {

  const {classes, account, accountId, onSelectAccount } = props;

  function handleToggle() {
    if (onSelectAccount !== undefined)
      onSelectAccount(account.server.id); // + '-' + account.sqlLogin)
  }


  return (

    <ListItem
      activeClassName={classes.activeListItem}
      className={classes.listItem}
      key={account.server.id}
      button
      selected={accountId===account.server.id}
      onClick={handleToggle}
    >
      <ListItemAvatar
        className={classes.listItemIcon}
      >
        <img
          alt="Database"
          src={'/images/databases/' + account.server.code.toLowerCase() + '.png'}
        />
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={account.server.nomDns}
        secondary={account.server.description}
      />
    </ListItem>
  );
}

AccountListItem.propTypes = {
  onSelectAccount: PropTypes.func,
  accountId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
};

export default AccountListItem;