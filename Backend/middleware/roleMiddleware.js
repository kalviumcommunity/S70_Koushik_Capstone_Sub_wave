const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user?.role;
  
      if (!userRole) {
        return res.status(403).json({ message: 'User role not found. Access denied.' });
      }
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'You do not have permission to access this resource.' });
      }
  
      next(); // User has the required role, proceed
    };
  };
  
  module.exports = roleMiddleware;
  