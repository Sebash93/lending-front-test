import React from 'react';
import LoansList from './LoansList';

class Sidebar extends React.Component {
  render () {
    return (
      <div className="sidebar col-xs-4 no-padding">
        <div className="header">
          <small>Select a product to syndicate</small>
        </div>
        <LoansList store={this.props.store} />
      </div>
    );
  }
}

export default Sidebar;
