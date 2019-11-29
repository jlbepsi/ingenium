import React, { Component } from 'react';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from './theme';

// Routes
import Routes from './Routes'

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';


export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    );
  }
}
