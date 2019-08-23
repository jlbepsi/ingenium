import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
} from '@material-ui/icons';

// Component styles
import styles from './styles';

import MenuList from './MenuList'

import Icon from "@mdi/react";
import { mdiDatabase, mdiWeb, mdiOpenInNew, mdiMicrosoft, mdiDeveloperBoard, mdiGithubCircle,
         mdiDomain, mdiPrinter, mdiFaceAgent} from '@mdi/js'
import AuthService from "../../../../../services/Security/AuthService";


class Sidebar extends Component {
  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    // Obtention de l'utilsateur connecté
    const profile = AuthService.getProfile();
    let userClasse = "Etudiant";
    switch (profile.classe) {
      case 'INT_PROF':
        userClasse = 'Professeur';
        break;
      case 'INT_ADMIN':
        userClasse = 'Professeur';
        break;
    }

    let menuListUser = [
      {
        label: 'Base de données',
        link: '/database',
        icon: <Icon path={mdiDatabase} size={1}/>
      },
      {
        label: 'Espace Web',
        link: '/webstorage',
        icon: <Icon path={mdiWeb} size={1}/>
      },
      ,
    ];

    if (profile.bts) {
      menuListUser.push({
        label: 'Suivi PPE',
        link: '/suivippe',
        icon: <Icon path={mdiOpenInNew} size={1}/>
      })
    }

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
            <img
              alt="EPSI-WIS logo"
              className={classes.logoImage}
              src="/images/logo_epsi-wis.png"
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <PeopleIcon className={classes.icon} />
          </Link>
          <Typography
            className={classes.nameText}
            variant="h6"
          >
            {profile.sub}
          </Typography>
          <Typography
            className={classes.bioText}
            variant="caption"
          >
            {userClasse}
          </Typography>
        </div>

        <Divider className={classes.profileDivider} />

        <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>
        </List>

        <Divider className={classes.listDivider} />
        <MenuList
          classes={classes}
          title='Services'
          menuList={menuListUser}
        />

        <Divider className={classes.listDivider} />
        <MenuList
          classes={classes}
          title='Logiciels'
          menuList={[
            {
              label: 'Microsoft',
              link: '/microsoft',
              icon: <Icon path={mdiMicrosoft} size={1}/>
            },
            {
              label: 'Intellij',
              link: '/intellij',
              icon: <Icon path={mdiDeveloperBoard} size={1}/>
            },
            {
              label: 'GitHub',
              link: '/github',
              icon: <Icon path={mdiGithubCircle} size={1}/>
            },
            {
              label: 'VMWare',
              link: '/vmware',
              icon: <Icon path={mdiDomain} size={1}/>
            },
          ]}
        />

        <Divider className={classes.listDivider} />
        <MenuList
          classes={classes}
          title='Ressources'
          menuList={[
            {
              label: 'Imprimantes',
              link: '/printers',
              icon: <Icon path={mdiPrinter} size={1}/>
            },
            {
              label: 'Supports',
              link: '/supports',
              icon: <Icon path={mdiFaceAgent} size={1}/>
            },
          ]}
        />

      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
