'use strict';

import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

class CompanyChooser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <div>
        <AutoComplete
          hintText='Company Name'
          dataSource={this.state.dataSource}
        />
      </div>
    )
  }

}

export default CompanyChooser;
