import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';
import { browserHistory } from 'react-router'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class TabBar extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleActive = this.handleActive.bind(this);
  }

  handleActive(tab) {
    browserHistory.push(tab.props.route);
  }

  render() {
    return (
      <Tabs>
        <Tab label="Dashboard" onActive={ this.handleActive } route="/dashboard" />
        <Tab label="Add Sale" onActive={ this.handleActive } route="/create" />
      </Tabs>
    )
  };

}

export default TabBar;
