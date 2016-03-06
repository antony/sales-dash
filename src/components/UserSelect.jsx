'use strict';

import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class UserSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 2};
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <SelectField value={this.state.value} onChange={this.handleChange.bind(this)}>
          <MenuItem value={1} primaryText="Antony Jones"/>
          <MenuItem value={2} primaryText="Alex Elliott"/>
          <MenuItem value={3} primaryText="Rob Clog"/>
        </SelectField>
      </div>
    );
  }
}
