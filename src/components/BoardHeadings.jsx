import React from 'react';
import { observer } from 'mobx-react';
import LoansList from './LoansList';

@observer
class BoardHeadings extends React.Component {
  render(){
    let activeLoan = this.props.store.activeLoanId,
        editing = this.props.store.editingPurchaseId,
        adding = this.props.store.addingPurchaseId,
        view;

    if (adding) {
      view =  <div className="headings row no-margin">
                <div className="col-xs-12">Add a purchase</div>
              </div>
    } else if (editing) {
      view = <div className="headings row no-margin">
              <div className="col-xs-12">Edit the purchase</div>
            </div>
    } else {
      view = <div className="headings row no-margin">
              <div className="col-xs-3">Investor name</div>
              <div className="col-xs-2">Sold</div>
              <div className="col-xs-2">% Purchased</div>
            </div>
    }
    return(
      <div>
        {view}
      </div>)
  }

}

export default BoardHeadings;
