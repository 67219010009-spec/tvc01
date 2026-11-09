const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const header = req.header.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if(!token) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized: no token', data: null });
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token', data: null });
    }
}
    
function requireRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 'error', message: 'Forbidden', data: null });
        }
        next();
    }
}

module.exports = { verifyToken, requireRole };