var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// SCHEMAS
var loanSchema   = new Schema({
    id: Number,
    date: String,
    amount: Number,
    remaining: Number
});

module.exports = mongoose.model('Loan', loanSchema);
