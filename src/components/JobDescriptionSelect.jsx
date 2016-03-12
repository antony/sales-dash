'use strict';

import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class JobDescriptionSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    let menuItems = ['Same Day', 'Next Day', 'Economy Pal.', 'Sea Export', 'Int. Courier', 'Road Import'].map((desc, i) => {
      return <MenuItem value={i} key={i} primaryText={desc} />
    });
    this.state.dataSource = menuItems;
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event, index, value) {
    this.state.value = value;
    this.props.onChange(event, index, value);
  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText='Job Description'
          value={this.state.value}
          errorText={this.state.errorText}
          onChange={ this.handleOnChange }>
          {this.state.dataSource}
        </SelectField>
      </div>
    );
  }
}
