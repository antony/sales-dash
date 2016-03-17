'use strict';

import React from 'react';
import Paper from 'material-ui/lib/paper';

class Dashboard extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.styles = {
      paper: {
        width: '90%',
        margin: 20,
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
      }
    }
  }

  render() {
    return (
      <Paper style={this.styles.paper} zDepth={2}>
        <h2>Dashy Boardo</h2>
      </Paper>
    );
  }
}

export default Dashboard;
