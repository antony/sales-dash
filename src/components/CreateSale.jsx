'use strict';

import React from 'react';
import Freezer from 'freezer-js';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import CompanyChooser from './CompanyChooser';
import UserSelect from './UserSelect';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import JobDescriptionSelect from './JobDescriptionSelect';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import reqwest from 'reqwest';

class CreateSale extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = new Freezer({
      user: 1
    });
    this.styles = {
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

    reqwest({
      method: 'POST',
      url: '/api/sale',
      data: this.state.get()
    })
    .then((result) => {
      console.log('Happy!');
    })
    .catch((e, json) => {
      for (let key of json.validation.keys) {
        this.refs[key].setState({errorText: 'Error Here'});
      }
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
      this.state.trigger(`sale:set:${field}`, value.toDateString());
    }
  }

  generateDropdownHandlerFor(field) {
    return (event, index, value) => {
      this.state.trigger(`sale:set:${field}`, value);
    }
  }

  generateNewRequestHandlerFor(field) {
    return (value) => {
      this.state.trigger(`sale:set:${field}`, value);
    }
  }

  render() {

    return (
      <Paper style={this.styles.paper} zDepth={2}>
        <h2>Enter Sale</h2>
          <form className="saleForm" onSubmit={this.handleSubmit.bind(this)}>
            <UserSelect ref="user" value={ this.state.get().user } onChange={ this.generateDropdownHandlerFor('user') } />
            <CompanyChooser ref="company" onUpdateInput={ this.generateNewRequestHandlerFor('company') } onNewRequest={ this.generateNewRequestHandlerFor('company') } />
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
    );
  }
}

export default CreateSale;
