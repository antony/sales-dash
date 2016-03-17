'use strict';

import React from 'react';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import AppBar from 'material-ui/lib/app-bar';
import TabBar from './TabBar';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.styles = {
      containedButton: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }
    }
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar
        title="Create Sale"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <TabBar router={ this.props.route } />
        {this.props.children}
      </div>
      </MuiThemeProvider>
    );
  }

}

export default Layout;
