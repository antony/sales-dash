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
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import JobDescriptionSelect from './JobDescriptionSelect';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
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
      },
      paper: {
          width: 600,
          margin: 20,
          padding: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let form = {};
    Object.keys(this.refs).map((field) => {
      form[field] = this.refs[field].state.value;
    });

    $.ajax({
      type: "POST",
      url: '/api/sale',
      data: form,
      dataType: 'json',
      success: function() {
        console.log('done');
      },
      error: function(resp, a, b) {
        let json = JSON.parse(resp.responseText);

        for (let key of json.validation.keys) {
          this.refs[key].setState({errorText: 'Error Here'});
        }

      }.bind(this)
    });
  }

  handleUpdate(field, evt, value) {
    let newValue = value || evt.target.value;
    newValue = (typeof newValue === 'Date') ? newValue.toISOString() : newValue;
    this.refs[field].setState({value: newValue});
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Create Sale"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Paper style={this.styles.paper} zDepth={2}>
          <h2>Enter Sale</h2>
            <form className="saleForm" onSubmit={this.handleSubmit.bind(this)}>
              <UserSelect ref="user" />
              <CompanyChooser ref="company" />
              <DatePicker ref="bookingDate" onChange={this.handleUpdate.bind(this, 'bookingDate')} errorText={this.state.errorText} floatingLabelText='First Booking' />
              <DatePicker ref="saleDate" onChange={this.handleUpdate.bind(this, 'saleDate')} errorText={this.state.errorText} floatingLabelText='Sale Date' />
              <JobDescriptionSelect ref="jobDescription" />
              <TextField ref="saleAmount" onChange={this.handleUpdate.bind(this, 'saleAmount')} errorText={this.state.errorText} floatingLabelText='Sale Amount' />
              <br />
              <TextField ref="jobCost" onChange={this.handleUpdate.bind(this, 'jobCost')} errorText={this.state.errorText} floatingLabelText='Job Cost' />
              <br />
              <RaisedButton
                label="Enter Sale"
                primary={true}
                type="submit"
              >
              </RaisedButton>
            </form>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
