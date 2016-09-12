import React from 'react';
import { observer } from 'mobx-react';
import NumberFormat from 'react-number-format';
import ClassNames from 'classnames';

@observer
class Loan extends React.Component {
  render(){
    let loanClass = 'loan row';
    if (this.props.store.activeLoanId == this.props.data.id) loanClass += ' active';

    return(
      <div className={loanClass} onClick={this.setActiveLoan}>
        <div className="col-xs-6">
          <label className="product-id-label">Product ID</label><br/>
          <span className="product-id">{this.props.data.id}</span>
        </div>
        <div className="col-xs-6 text-right">
          <span className="advance">Advance</span><br/>
          <span className="date">{this.props.data.formatedDate}</span><br/>
          <span>
            <NumberFormat className="amount" value={this.props.data.amount} displayType={'text'} thousandSeperator={true} prefix={'$'} />
          </span>
        </div>
        <hr/>
      </div>
    )
  }
  setActiveLoan = () => {
    this.props.store.setActiveLoan(this.props.data.id);
  }
}

export default Loan;
