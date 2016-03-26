'use strict';

import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class UserSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    console.log(this.state);
  }

  handleOnChange(event, index, value) {
    this.state.value = value;
    this.props.onChange(event, index, value);
  }

  render() {
    return (
      <div>
        <SelectField value={ this.state.value } onChange={ this.handleOnChange } floatingLabelText="Your Name">
            <MenuItem value="ant@enzy.org" primaryText="Antony Jones"/>
            <MenuItem value="alex@orbital-direct.co.uk" primaryText="Alex Elliott"/>
            <MenuItem value="rob@cl.og" primaryText="Rob Clog"/>
        </SelectField>
      </div>
    );
  }
}
