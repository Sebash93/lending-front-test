import React from 'react';
import { observer } from 'mobx-react';
import Purchase from './Purchase';

@observer
class PurchasesList extends React.Component {
  render (){
    let activePurchases = this.props.store.activePurchases,
        activeLoanId = this.props.store.activeLoanId,
        purchases;

    if (activePurchases.length > 0) {
        purchases = activePurchases.map(purchase => {
          return (<Purchase key={purchase._id}
                            data={purchase}
                            store={this.props.store}/>)
        })
    } else if (!activeLoanId) {
      purchases = (<div className="no-purchases no-margin row center-xs middle-xs">
                      Select a Loan to manage
                  </div>)
    } else {
      purchases = <div className="no-purchases no-margin row center-xs middle-xs">
                    Add a new purchase clicking the  <i className="material-icons">add_circle</i>  button
                  </div>
    }

    return (
      <div className="purchases-list">
        {purchases}
      </div>
    )
  }

}

export default PurchasesList;
