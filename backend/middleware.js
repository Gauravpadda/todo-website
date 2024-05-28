const jwt = require("jsonwebtoken");
const { user } = require("./db");

const jwtPassword = "gauravpadda";

function usermiddleware(req, res, next) {
    try {
        const jwttoken = req.headers.authorization;
        if (!jwttoken) {
            return res.status(403).send("No token provided");
        }

        const token = jwttoken.split(" ")[1];
        if (!token) {
            return res.status(403).send("Invalid token format");
        }

        const verification = jwt.verify(token, jwtPassword);
        req.user = verification; // Attach the verification result to the request object
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Log the error for debugging
        res.status(403).send("Invalid token");
    }
}

module.exports = usermiddleware;
