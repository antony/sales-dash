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

  handleSubmit(e) {
    e.preventDefault();
    let form = {
      user: this.refs.user.state.value,
      company: this.refs.company.state.value,
      bookingDate: this.refs.bookingDate.state.value,
      saleDate: this.refs.saleDate.state.value,
      jobDescription: this.refs.jobDescription.state.value,
      saleAmount: this.refs.saleAmount.state.value,
      jobCost: this.refs.jobCost.state.value
    };

    console.log(form);
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
          <form className="saleForm" onSubmit={this.handleSubmit.bind(this)}>
            <UserSelect ref="user" />
            <CompanyChooser ref="company" />
            <DatePicker ref="bookingDate" floatingLabelText='First Booking' />
            <DatePicker  ref="saleDate" floatingLabelText='Sale Date' />
            <JobDescriptionSelect ref="jobDescription" />
            <TextField ref="saleAmount" floatingLabelText='Sale Amount' />
            <br />
            <TextField ref="jobCost" floatingLabelText='Job Cost' />
            <br />
            <RaisedButton
              label="Enter Sale"
              primary={true}
              type="submit"
            >
            </RaisedButton>
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
