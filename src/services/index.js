let config = {
  apiKey: "AIzaSyBbRPNTlobweMINVL_nvQAwIkytjxou2lE",
  authDomain: "lending-front-test.firebaseapp.com",
  databaseURL: "https://lending-front-test.firebaseio.com",
  storageBucket: "lending-front-test.appspot.com",
};

firebase.initializeApp(config);

const END_POINT = "http://localhost:8080/api";

const Services = {
  getLoans(callback){
    fetch(`${END_POINT}/loans`)
      .then((response) => {
        return response.json()
      })
      .then(callback)
  },
  getPurchases(loanId, callback){
    fetch(`${END_POINT}/loans/purchases/${loanId}`)
      .then((response) => {
        return response.json()
      })
      .then(callback)
  },
  editPurchase(loanId, purchase, callback){
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(purchase)
    }
    fetch(`${END_POINT}/loans/purchases/${loanId}`, options)
      .then((response) => {
        return response.json()
      })
      .then(callback)
  },
  addPurchase(loanId, purchase, callback){
    console.log(purchase);
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(purchase)
    }
    fetch(`${END_POINT}/loans/purchases/${loanId}`,  options)
      .then((response) => {
        return response.json()
      })
      .then(callback)
  },
  deletePurchase(loanId, purchaseId, callback){
    let options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify(purchaseId)
    }
    fetch(`${END_POINT}/loans/purchases/${loanId}`,  options)
      .then((response) => {
        return response.json()
      })
      .then(callback)
  }
}

export default Services
