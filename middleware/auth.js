const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log("Authenticating token");
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]; // Typically "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // decoded payload is now available on req.user
        next();
    } catch (error) {
        res.status(403).json({ message: "Token is not valid" });
    }
}

module.exports = authenticateToken ;
