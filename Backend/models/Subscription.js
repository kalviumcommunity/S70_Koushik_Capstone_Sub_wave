const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  category: String,
  price: Number,
  billingCycle: { type: String, enum: ['Monthly', 'Yearly', 'Custom'] },
  nextBillingDate: Date,
  autoRenewal: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);

