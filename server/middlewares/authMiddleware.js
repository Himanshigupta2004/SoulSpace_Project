const jwt = require("jsonwebtoken");

module.exports.authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token is not valid" });
    req.user = user; 
    next();
  });
};
