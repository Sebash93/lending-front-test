import React from 'react';
import { observer } from 'mobx-react';
import BoardHeadings from './BoardHeadings';
import BoardContent from './BoardContent';
import RemainingBar from './RemainingBar';

@observer
class Board extends React.Component {
  render(){
    let activeLoanId = this.props.store.activeLoanId,
        actionButtonClass = "action-button"

    if (!activeLoanId) actionButtonClass += ' hide';
    return (
      <div className="board no-padding col-xs-8">
        <div className="board-header">
          <div className="product-id row no-margin">
            <span>Product ID {activeLoanId}</span>
          </div>
          <BoardHeadings store={this.props.store} />
          <button className={actionButtonClass} onClick={this.setAddPurchase}>
            <i className="material-icons">add</i>
          </button>
        </div>
        <BoardContent store={this.props.store} />
        <RemainingBar store={this.props.store} />
      </div>
    );
  }
  setAddPurchase = () => {
    let loanId = this.props.store.activeLoanId;
    this.props.store.setAddPurchase(loanId);
  }
}

export default Board;
