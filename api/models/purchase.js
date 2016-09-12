var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// SCHEMAS
var purchaseSchema   = new Schema({
    id: Number,
    loanId: Number,
    investor: String,
    sold: Number,
    percentage: String
});

module.exports = mongoose.model('Purchase', purchaseSchema);
