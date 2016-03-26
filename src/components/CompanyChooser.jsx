'use strict';

import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';
import reqwest from 'reqwest';

class CompanyChooser extends React.Component {

  componentDidMount() {
    reqwest({
      url: '/api/companies',
      type: 'json'
    })
    .then((resp) => {
      this.state.dataSource = resp;
    })
    .catch((e) => {
      console.error('Definitely an error.', e);
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      value: null
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(t) {
    this.props.onUpdateInput(t);
  };

  render() {
    return (
      <div>
        <AutoComplete
          onUpdateInput={ this.handleUpdateInput }
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
