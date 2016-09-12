var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// CONFIG
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;
var router = express.Router();

// CONNECT TO DB
var mongoDBUri = 'mongodb://lendingRoot:d37hstps@ds029446.mlab.com:29446/lending-front';
mongoose.connect(mongoDBUri);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoDBUri);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// IMPORT MODELS
var Loan = require('./models/loan');
var Purchase = require('./models/purchase');

// HELPER FUNCTIONS
var calcPercentage = function(loanId, amountSold) {
  Loan.findOne({id: loanId}, function(err, loan) {
    if (!err) return amountSold/loan.amount * 100;
  });
};

var getPurchasesOfLoan = function (loanId) {
  Purchase.find({loanId: loanId}, function(err, loans) {
      if (!err) return loans;
  });
};

var recalculateLoan = function (loanId, callback) {
  Purchase.find({loanId: loanId}, function(err, purchases) {
      if (!err) {
        var loanSold = 0
        purchases.forEach(function(purchase) {
          loanSold =+ purchase.sold;
        });

        Loan.findOne({id: loanId}, function(err, loan) {
          if (!err) {
            loan.remaining = loan.amount - loanSold;
            loan.save(function(err) {
              callback(err)
            });
          }
        });
      }
  });
}

// ROUTING
router.route('/loans')
.get(function(req, res) {
    Loan.find(function(err, loans) {
        if (err) res.send(err);
        res.json(loans);
    });
});

router.route('/loans/purchases/:loan_id')
.get(function(req, res) {
    Purchase.find({loanId: req.params.loan_id}, function(err, loans) {
        if (err) res.send(err);
        res.json(loans);
    });
})

.post(function(req, res) {
  console.log('Request', req);
  var purchase = new Purchase();

  purchase.loanId = req.body.loanId;
  purchase.investor = req.body.investor;
  purchase.sold = req.body.sold;
  purchase.percentage = req.body.percentage;

  console.log('Result', purchase);
  purchase.save(function(err) {
    if (err) res.send(err);
    Purchase.find({loanId: req.body.loanId}, function(err, purchases) {
        if (!err) {
          recalculateLoan(req.body.loanId, function (err) {
            if (!err) res.json(purchases);
          })
        }
    });
  });
})

.put(function(req, res) {
  Purchase.findOne({_id: req.body._id}, function(err, purchase) {

    purchase.loanId = req.body.loanId;
    purchase.investor = req.body.investor;
    purchase.sold = req.body.sold;
    purchase.percentage = req.body.percentage;

    purchase.save(function(err) {
      if (err) res.send(err);

      Purchase.find({loanId: req.body.loanId}, function(err, purchases) {
        if (!err) {
          recalculateLoan(req.body.loanId, function (err) {
            if (!err) res.json(purchases);
          })
        }
      });
    });
  });
})

.delete(function(req, res) {
  console.log('deleting', req.body);
  Purchase.remove({ _id: req.body.id }, function(err, purchase) {
      if (err) {
        res.send(err);
      } else {
        Purchase.find({loanId: req.params.loan_id}, function(err, purchases) {
          if (!err) {
            recalculateLoan(req.params.loan_id, function (err) {
              if (!err) res.json(purchases);
            })
          }
        });
      }
  });
});

app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
