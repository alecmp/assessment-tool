import { List, ListItem, ListItemText } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';
import { logout, deleteAccount } from '../../actions/auth';

const drawerWidth = 240;

const Navbar = ({ auth: { isAuthenticated }, logout, deleteAccount }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('Assessment Tool');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    link: {
      '& a': {
        color: theme.palette.common.white
      }
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none'
    },
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    },
    logoText: {
      fontSize: '20px'
    },
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  }));

  const classes = useStyles();

  const authLinks = (
    <Button
      onClick={logout}
      href="#!"
      textDecoration="none"
      className={classes.menuButton}
      color="inherit"
    >
      Logout
    </Button>
  );

  const guestLinks = (
    <ul>
      <li></li>
      <li></li>
    </ul>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  const renderNavBar = () => {
    if (isAuthenticated) {
      return (
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Link
                component={LinkRouter}
                to="/"
                color="inherit"
                variant="h6"
                className={classes.title}
              >
                Assessment Tool
              </Link>
              {/*  <LinkRouter to="/" className={classes.linkText}>
                <Button
                  variant="text"
                  color="inherit"
                  size="large"
                  className={classes.logoText}
                >
                  DEVRABBY
                </Button>
              </LinkRouter> */}
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={LinkRouter}
                to="/about"
              >
                <ListItemText>About</ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => deleteAccount()}
              >
                <ListItemText>Delete account</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>

              <Link
                component={LinkRouter}
                to="/"
                color="inherit"
                underline="none"
                textDecoration="none"
                variant="h6"
                className={classes.title}
              >
                Assessment Tool
              </Link>

              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            </Toolbar>
          </AppBar>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                component={LinkRouter}
                to="/about"
              >
                <ListItemText>About</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </div>
      );
    }
  };

  return <>{renderNavBar()}</>;
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, deleteAccount })(Navbar);
