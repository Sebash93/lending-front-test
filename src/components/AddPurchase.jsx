import React from 'react';
import { observer } from 'mobx-react';
import Services from '../services';

class AddPurchase extends React.Component {
  state = {
    investor: '',
    sold: ''
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
          <input type="text"  value={this.state.sold} onChange={this.handleSoldChange} />
        </div>
        <div className="col-xs-2 col-xs-offset-1">
          <label htmlFor="left-amount" className="input-label">Left amount</label><br/>
          <span className="left-amount">$0</span>
        </div>
        <div className="col-xs-2 actions">
          <button className="round save" onClick={this.savePurchase}>
            <i className="material-icons">save</i>
          </button>
          <button className="round delete" onClick={this.close}>
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
  close = () => {
    this.props.store.setAddPurchase('')
  }
  savePurchase = () => {
    let purchase = {
      investor: this.state.investor,
      sold: this.state.sold,
      loanId: this.props.store.activeLoanId,
      percentage: ((this.state.sold/this.props.store.activeLoan.amount) * 100).toFixed(2)
    },
        activeLoanId = this.props.store.activeLoanId;
    Services.addPurchase(activeLoanId, purchase, this.setPurchases);
  }
  setPurchases = (purchases) => {
    let activeLoanId = this.props.store.activeLoanId
    this.props.store.setPurchases(activeLoanId, purchases);
    this.props.store.setActiveLoan(activeLoanId);
  }
}

export default AddPurchase;
