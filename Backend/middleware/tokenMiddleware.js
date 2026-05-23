const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {

    try {
        // console.log(req.headers);
        
        const authHeader = req.headers.authorization;
        // console.log('authHeader :' + authHeader);
        
        // No token
        if (!authHeader) {
            return res.status(401).json({
                error: "No token provided",
            });
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : authHeader;

        // console.log(authHeader);

        const decoded = jwt.verify(token, secretKey);

        req.data = decoded;
        
        next();

    } catch (error) {

        return res.status(403).json({
            error: "Invalid token",
        });

    }
}

module.exports = verifyToken;