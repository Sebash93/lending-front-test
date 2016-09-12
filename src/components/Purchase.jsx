import React from 'react';
import { observer } from 'mobx-react';

class Purchase extends React.Component {
  render() {
    let data = this.props.data
    return (
      <div className="purchase row middle-xs no-margin">
        <div className="col-xs-3">{data.investor}</div>
        <div className="col-xs-2">{data.sold}</div>
        <div className="col-xs-2">{data.percentage}</div>
        <div className="actions col-xs-2 center-xs">
          <button className="round edit">
            <i className="material-icons" onClick={this.setEditMode}>mode_edit</i>
          </button>
        </div>
      </div>
    )
  }
  setEditMode = () => {
    let purchaseId = this.props.data._id;
    this.props.store.setEditPurchase(purchaseId)
  }
}

export default Purchase;
