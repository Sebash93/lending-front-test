import React from 'react';
import { observer } from 'mobx-react';

@observer
class RemainingBar extends React.Component {
  render() {
    let loan = this.props.store.activeLoan,
        totalAmount = loan.amount,
        remaining = loan.remaining,
        remainingClass = "remaining row no-margin",
        barStyle,
        barWidth;

    if (!totalAmount) remainingClass += " hide";

    if (totalAmount && remaining) {
      barWidth = 100 - Math.round((remaining/totalAmount)*100)
    }

    return (
      <div className={remainingClass}>
        <div className="col-xs-12">
          Remaining amount {remaining} of {totalAmount}
        </div>
        <div className="progress-bar col-xs-12">
          <div className="bar">
            <div className="progression" style={{"width": barWidth + "%"}}></div>
          </div>
          <div className="indicators row between-xs no-margin">
            <label>0%</label>
            <label>100%</label>
          </div>
        </div>
      </div>
    );
  }
}

export default RemainingBar;
