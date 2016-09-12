import React from 'react';
import { observer } from 'mobx-react';
import Services from '../services';

@observer
class EditPurchase extends React.Component {
  state = {
    investor: this.props.store.editingPurchase.investor,
    sold: this.props.store.editingPurchase.sold,
    id: this.props.store.editingPurchase._id,
  }
  render() {
    return (
      <div className="purchase-edit row bottom-xs no-margin">
        <div className="col-xs-4">
          <select name="investor" id="investor" value={this.state.investor} onChange={this.handleInvestorChange}>
            <option value="" disabled>Select an investor</option>
            <option value="Y Combinator">Y Combinator</option>
            <option value="Techstars">Techstars</option>
            <option value="DreamIT Ventures">DreamIT Ventures</option>
            <option value="Seedcamp">Seedcamp</option>
            <option value="Imagine K12">Imagine K12</option>
          </select>
        </div>
        <div className="col-xs-2 col-xs-offset-1">
          <label htmlFor="sell-amount" className="input-label">Amount to sell</label>
          <input type="text" value={this.state.sold} onChange={this.handleSoldChange}/>
        </div>
        <div className="col-xs-2 col-xs-offset-1">
          <label htmlFor="left-amount" className="input-label">Left amount</label><br/>
          <span className="left-amount">$0</span>
        </div>
        <div className="col-xs-2 actions">
          <button className="round save" onClick={this.savePurchase}>
            <i className="material-icons">save</i>
          </button>
          <button className="round delete" onClick={this.deletePurchase}>
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
    )
  }
  handleInvestorChange = (event) => {
   this.setState({investor: event.target.value})
  }
  handleSoldChange = (event) => {
    this.setState({sold: event.target.value})
  }
  savePurchase = () => {
    let purchase = {
      _id: this.state.id,
      investor: this.state.investor,
      sold: this.state.sold,
      loanId: this.props.store.activeLoanId,
      percentage: ((this.state.sold/this.props.store.activeLoan.amount) * 100).toFixed(2)
    }
    let activeLoanId = this.props.store.activeLoanId;
    console.log(purchase);
    Services.editPurchase(activeLoanId, purchase, this.setPurchases);
  }
  deletePurchase = () => {
    console.log(this.state);
    let purchaseId = this.state.id,
        activeLoanId = this.props.store.activeLoanId;
    console.log('Deleting', purchaseId);
    Services.deletePurchase(activeLoanId, {id: purchaseId}, this.setPurchases);
  }
  setPurchases = (purchases) => {
    let activeLoanId = this.props.store.activeLoanId
    this.props.store.setPurchases(activeLoanId, purchases);
    this.props.store.setActiveLoan(activeLoanId);
  }
}

export default EditPurchase;
