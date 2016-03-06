'use strict';

import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

class CompanyChooser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      value: null
    };
  }

  handleChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText='Company Name'
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleChange.bind(this)}
        />
      </div>
    )
  }

}

export default CompanyChooser;
