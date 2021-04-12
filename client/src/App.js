import {
  colors,
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
// Redux
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import './App.css';
import GlobalStyles from './components/layout/GlobalStyles';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
import store from './store';
// import theme from './theme';
import setAuthToken from './utils/setAuthToken';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      light: '#F4F6F8',
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },

  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    },
    MuiStepper: {
      root: {
        backgroundColor: '#F4F6F8'
      }
    }
  },

  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
});

const App = () => {
  const classes = useStyles();

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
