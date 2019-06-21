import React, {useEffect} from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";





function AccountListItem(props) {

  const {classes, account, accountId, onSelectAccount } = props;

  function handleToggle() {
    if (onSelectAccount !== undefined)
      onSelectAccount(account.DatabaseServerName.Id + '-' + account.SqlLogin)
  }


  return (

    <ListItem
      activeClassName={classes.activeListItem}
      className={classes.listItem}
      key={account.DatabaseServerName.Id}
      button
      selected={accountId===account.DatabaseServerName.Id + '-' + account.SqlLogin}
      onClick={handleToggle}
    >
      <ListItemAvatar
        className={classes.listItemIcon}
      >
        <img
          alt="Database"
          src={'/images/databases/' + account.DatabaseServerName.Code.toLowerCase() + '.png'}
        />
      </ListItemAvatar>
      <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={account.DatabaseServerName.NomDNS + " (" + account.SqlLogin + ")"}
        secondary={account.DatabaseServerName.Description}
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