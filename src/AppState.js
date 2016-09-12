import { observable } from 'mobx';

export class AppState {
    @observable loans = [];
    @observable activeLoanId = '';
    @observable activeLoan = '';
    @observable activePurchases = [];
    @observable editingPurchaseId = '';
    @observable editingPurchase = [];
    @observable addingPurchaseId = '';

  	setActiveLoan(loanId) {
      this.activeLoanId = loanId;
      this.editingPurchaseId =  '';
      this.addingPurchaseId =  '';
      for (var i = 0; i < this.loans.length; i++) {
        if(this.loans[i].id == loanId) {
          this.activeLoan = this.loans[i];
          break;
        }
      }
    }
    setActivePurchase(loanId, purchaseId) {
      let loan = this.loans[loanId];
      this.activePurchases = loan.purchases[purchaseId];
    }
    setLoans(loans){
      this.loans = loans
    }
    setPurchases(loanId, purchases){
      for (var i = 0; i < this.loans.length; i++) {
        if(this.loans[i].id == loanId) {
          this.loans[i].purchases = purchases;
          break;
        }
      }
      this.activePurchases = purchases;
    }
    setEditPurchase(purchaseId){
      this.editingPurchaseId = purchaseId
      let loan = this.activeLoan;
      for (var i = 0; i < loan.purchases.length; i++) {
        if(loan.purchases[i]._id == purchaseId) {
          this.editingPurchase = loan.purchases[i];
          break;
        }
      }
    }
    setAddPurchase(loanId){
      this.addingPurchaseId = loanId
    }
}

export default AppState;
