const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if ( !token ) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;

    if (req.user.access < 1) {
      return res.status(403).json({ msg: 'User not authorized' })
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}