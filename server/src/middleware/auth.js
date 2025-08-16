const jwt = require('jsonwebtoken');

function parseToken(req) {
  const authHeader = req.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  return token || null;
}

function optionalAuth(req, res, next) {
  const token = parseToken(req);
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
  } catch (err) {
    // ignore invalid token in optional auth
  }
  next();
}

function protect(req, res, next) {
  const token = parseToken(req);
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

module.exports = { protect, optionalAuth };


