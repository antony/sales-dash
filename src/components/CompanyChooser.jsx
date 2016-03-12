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

  render() {
    return (
      <div>
        <AutoComplete
          onUpdateInput={ this.props.onUpdateInput }
          onNewRequest={ this.props.onNewRequest }
          floatingLabelText='Company Name'
          dataSource={this.state.dataSource}
          errorText={this.state.errorText}
        />
      </div>
    )
  }

}

export default CompanyChooser;
