'use strict';

import React from 'react';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import CompanyChooser from './CompanyChooser';
import UserSelect from './UserSelect';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Create Sale"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <h2>Enter Sale</h2>
          <CompanyChooser />
          <UserSelect />
          <RaisedButton
            label="Enter Sale"
            primary={true}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
