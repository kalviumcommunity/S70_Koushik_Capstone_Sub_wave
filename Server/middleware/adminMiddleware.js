const adminMiddleware = (req, res, next) => {
  // Check if user exists and is admin
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};

module.exports = adminMiddleware; 