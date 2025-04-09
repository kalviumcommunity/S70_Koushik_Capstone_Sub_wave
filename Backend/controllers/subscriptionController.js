const Subscription = require('../models/Subscription');



exports.getSubscriptions = async (req, res) => {   
  const subs = await Subscription.find({ userId: req.user._id });
  res.json(subs);
};

exports.addSubscription = async (req, res) => {
  const newSub = await Subscription.create({ ...req.body, userId: req.user._id });
  res.status(201).json(newSub);
};

exports.updateSubscription = async (req, res) => {
  const updated = await Subscription.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteSubscription = async (req, res) => {
  await Subscription.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.status(204).end();
};
