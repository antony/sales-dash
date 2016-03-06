'use strict';

import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class JobDescriptionSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 2
    };
    let menuItems = ['Same Day', 'Next Day', 'Economy Pal.', 'Sea Export', 'Int. Courier', 'Road Import'].map((desc, i) => {
      return <MenuItem value={i} key={i} primaryText={desc} />
    });
    this.state.dataSource = menuItems;
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText='Job Description'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}>
          {this.state.dataSource}
        </SelectField>
      </div>
    );
  }
}
