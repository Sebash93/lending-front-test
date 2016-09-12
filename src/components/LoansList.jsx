import React from 'react';
import { observer } from 'mobx-react';
import Loan from './Loan';
import Services from '../services';

@observer
class LoansList extends React.Component {
  componentWillMount(){
    let hasLoans = this.props.store.loans.length > 0;
    if (!hasLoans) Services.getLoans(this.setLoans);
  }
  render(){
    const loans = this.props.store.loans.map(loan => {
      let date = new Date(loan.date),
          mm = date.getMonth() + 1,
          dd = date.getDate(),
          yyyy = date.getFullYear();

      loan.formatedDate = mm + '/' + dd + '/' + yyyy;
      return (<Loan key={loan.id}
                    data={loan}
                    store={this.props.store}/>)
    })
    return (
      <div className="loans-list">
        {loans}
      </div>
    )
  }

  setLoans = (response) => {
    this.props.store.setLoans(response)
  }
}

export default LoansList;
