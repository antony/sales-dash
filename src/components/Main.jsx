'use strict';

import React from 'react';
import Freezer from 'freezer-js';
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
    this.state = new Freezer({
      user: 1
    });
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

  componentDidMount() {
    let me = this;
    this.state.on('update', () => { me.forceUpdate() });

    let fields = ['user', 'company', 'bookingDate', 'saleDate', 'jobDescription', 'saleAmount', 'jobCost'];

    for(let field of fields) {
      this.state.on(`sale:set:${field}`, (value) => {
        console.log('Setting', field, 'to', value);
        this.state.get().set(field, value);
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let form = this.state.get();
    console.log(form);

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

  generateHandlerFor(field) {
    return (event, value) => {
      let newValue = value || event.target.value;
      this.state.trigger(`sale:set:${field}`, newValue);
    }
  }

  generateDateHandler(field) {
    return (event, value) => {
      this.state.trigger(`sale:set:${field}`, value.toISOString());
    }
  }

  generateDropdownHandlerFor(field) {
    return (event, index, value) => {
      this.state.trigger(`sale:set:${field}`, value);
    }
  }

  generateNewRequestHandlerFor(field) {
    return (value) => {
      console.log('GOg here.');
      this.state.trigger(`sale:set:${field}`, value);
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
          <Paper style={this.styles.paper} zDepth={2}>
          <h2>Enter Sale</h2>
            <form className="saleForm" onSubmit={this.handleSubmit.bind(this)}>
              <UserSelect ref="user" value={ this.state.get().user } onChange={ this.generateDropdownHandlerFor('user') } />
              <CompanyChooser ref="company" onUpdateInput={ this.generateNewRequestHandlerFor('company') } onNewRequest={ this.generateNewRequestHandlerFor('company') } />
              <DatePicker ref="bookingDate" onChange={ this.generateDateHandler('bookingDate') } errorText={this.state.errorText} floatingLabelText='First Booking' />
              <DatePicker ref="saleDate" onChange={ this.generateDateHandler('saleDate') } errorText={this.state.errorText} floatingLabelText='Sale Date' />
              <JobDescriptionSelect ref="jobDescription" onChange={ this.generateDropdownHandlerFor('jobDescription') } />
              <TextField ref="saleAmount" onChange={ this.generateHandlerFor('saleAmount') } errorText={this.state.errorText} floatingLabelText='Sale Amount' />
              <br />
              <TextField ref="jobCost" onChange={ this.generateHandlerFor('jobCost') } errorText={this.state.errorText} floatingLabelText='Job Cost' />
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
