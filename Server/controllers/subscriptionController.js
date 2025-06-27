const Subscription = require('../models/Subscription');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

exports.getSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user._id });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subscriptions' });
  }
};

exports.addSubscription = async (req, res) => {
  try {
    const newSub = await Subscription.create({ ...req.body, userId: req.user._id });
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ message: 'Error creating subscription' });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const updated = await Subscription.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating subscription' });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const deleted = await Subscription.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting subscription' });
  }
};

// Helper: send renewal reminder email
const sendRenewalEmail = async (user, subscription) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Upcoming Renewal: ${subscription.name}`,
    html: `<p>Hi ${user.name},</p><p>Your subscription to <b>${subscription.name}</b> will renew on <b>${subscription.nextBillingDate.toDateString()}</b>.<br>Amount: $${subscription.price}<br><br>Login to SubWave to manage your subscriptions.</p>`
  });
};

// Scheduled job: check for renewals in 3 days and send reminders
exports.sendRenewalReminders = async () => {
  const now = new Date();
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const subs = await Subscription.find({ nextBillingDate: { $gte: in3Days, $lt: new Date(in3Days.getTime() + 24 * 60 * 60 * 1000) } });
  for (const sub of subs) {
    const user = await User.findById(sub.userId);
    if (user) {
      await sendRenewalEmail(user, sub);
    }
  }
};

// Invite collaborator by email
exports.inviteCollaborator = async (req, res) => {
  const { subscriptionId, email, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const sub = await Subscription.findById(subscriptionId);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    if (sub.collaborators.some(c => c.user.equals(user._id))) {
      return res.status(400).json({ message: 'User already a collaborator' });
    }
    sub.collaborators.push({ user: user._id, role: role || 'Member' });
    sub.activityLogs.push({ action: 'Invited Collaborator', user: req.user._id, details: `Invited ${email} as ${role || 'Member'}` });
    await sub.save();
    res.json({ message: 'Collaborator invited' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to invite collaborator' });
  }
};

// Update collaborator role
exports.updateCollaboratorRole = async (req, res) => {
  const { subscriptionId, collaboratorId, role } = req.body;
  try {
    const sub = await Subscription.findById(subscriptionId);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    const collab = sub.collaborators.id(collaboratorId);
    if (!collab) return res.status(404).json({ message: 'Collaborator not found' });
    collab.role = role;
    sub.activityLogs.push({ action: 'Updated Collaborator Role', user: req.user._id, details: `Set role to ${role}` });
    await sub.save();
    res.json({ message: 'Collaborator role updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update collaborator role' });
  }
};

// Remove collaborator
exports.removeCollaborator = async (req, res) => {
  const { subscriptionId, collaboratorId } = req.body;
  try {
    const sub = await Subscription.findById(subscriptionId);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    sub.collaborators = sub.collaborators.filter(c => c._id.toString() !== collaboratorId);
    sub.activityLogs.push({ action: 'Removed Collaborator', user: req.user._id, details: `Removed collaborator ${collaboratorId}` });
    await sub.save();
    res.json({ message: 'Collaborator removed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove collaborator' });
  }
};

// Get activity logs
exports.getActivityLogs = async (req, res) => {
  const { subscriptionId } = req.params;
  try {
    const sub = await Subscription.findById(subscriptionId).populate('activityLogs.user', 'name email');
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    res.json(sub.activityLogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch activity logs' });
  }
};

// Analytics: spending by month
exports.getSpendingByMonth = async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user._id });
    const monthly = {};
    subs.forEach(sub => {
      if (!sub.nextBillingDate) return;
      const month = sub.nextBillingDate.getMonth() + 1;
      const year = sub.nextBillingDate.getFullYear();
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      if (!monthly[key]) monthly[key] = 0;
      monthly[key] += sub.price;
    });
    res.json(monthly);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};

// Analytics: category breakdown
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user._id });
    const categories = {};
    subs.forEach(sub => {
      if (!sub.category) return;
      if (!categories[sub.category]) categories[sub.category] = 0;
      categories[sub.category] += sub.price;
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};

// AI-based budgeting suggestions (simple rule-based)
exports.getBudgetSuggestions = async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user._id });
    const suggestions = [];
    const total = subs.reduce((sum, sub) => sum + sub.price, 0);
    if (total > 100) suggestions.push('Your total subscription spending exceeds $100. Consider canceling unused services.');
    const streaming = subs.filter(sub => sub.category === 'Streaming');
    if (streaming.length > 2) suggestions.push('You have more than 2 streaming subscriptions. Consider consolidating.');
    const unused = subs.filter(sub => sub.autoRenewal && sub.nextBillingDate && (new Date() - sub.nextBillingDate) > 30 * 24 * 60 * 60 * 1000);
    if (unused.length > 0) suggestions.push('Some subscriptions have not been renewed in over a month. Review for possible cancellation.');
    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch suggestions' });
  }
};

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
exports.upload = multer({ storage }).single('file');

// Upload file for a subscription
exports.uploadFile = async (req, res) => {
  const { subscriptionId } = req.body;
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  try {
    const sub = await Subscription.findById(subscriptionId);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    const fileUrl = `/uploads/${req.file.filename}`;
    sub.files.push({ filename: req.file.originalname, url: fileUrl });
    sub.activityLogs.push({ action: 'Uploaded File', user: req.user._id, details: req.file.originalname });
    await sub.save();
    res.json({ message: 'File uploaded', file: { filename: req.file.originalname, url: fileUrl } });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload file' });
  }
};

// List files for a subscription
exports.getFiles = async (req, res) => {
  const { subscriptionId } = req.params;
  try {
    const sub = await Subscription.findById(subscriptionId);
    if (!sub) return res.status(404).json({ message: 'Subscription not found' });
    res.json(sub.files);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch files' });
  }
};
