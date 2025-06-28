const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  categories: {
    Streaming: { type: Number, default: 0 },
    Productivity: { type: Number, default: 0 },
    Finance: { type: Number, default: 0 },
    Entertainment: { type: Number, default: 0 },
    Education: { type: Number, default: 0 },
    Other: { type: Number, default: 0 }
  },
  spent: {
    type: Number,
    default: 0
  },
  remaining: {
    type: Number,
    default: 0
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Calculate spent and remaining before saving
budgetSchema.pre('save', function(next) {
  this.spent = Object.values(this.categories).reduce((sum, val) => sum + (val || 0), 0);
  this.remaining = this.total - this.spent;
  next();
});

module.exports = mongoose.model('Budget', budgetSchema); 