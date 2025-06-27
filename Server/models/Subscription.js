const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  category: String,
  price: Number,
  billingCycle: { type: String, enum: ['Monthly', 'Yearly', 'Custom'] },
  nextBillingDate: Date,
  autoRenewal: Boolean,
  collaborators: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['Owner', 'Admin', 'Member'], default: 'Member' }
    }
  ],
  activityLogs: [
    {
      action: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now },
      details: String
    }
  ],
  files: [
    {
      filename: String,
      url: String,
      uploadedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);

