import React from 'react';
import { observer } from 'mobx-react';
import PurchasesList from './PurchasesList';
import EditPurchase from './EditPurchase';
import AddPurchase from './AddPurchase';
import Services from '../services';

@observer
class BoardContent extends React.Component {
  componentWillReact() {
    let activeLoanId = this.props.store.activeLoanId;
    if (activeLoanId) Services.getPurchases(activeLoanId, this.setPurchases);
  }
  render() {
    let activeLoan = this.props.store.activeLoanId,
        editingPurchase = this.props.store.editingPurchaseId,
        addingPurchase = this.props.store.addingPurchaseId,
        view

      if (addingPurchase) {
        view = <AddPurchase store={this.props.store} />
      } else if (editingPurchase) {
        view = <EditPurchase store={this.props.store} />
      } else {
        view = <PurchasesList store={this.props.store} />
      }

    return (
      <div className="board-content">
      {view}
      </div>
    )
  }
  setPurchases = (purchases) => {
    let activeLoanId = this.props.store.activeLoanId
    this.props.store.setPurchases(activeLoanId, purchases);
  }
}

export default BoardContent;
