const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Invalid token");
  }
  try {
    const decodedUser = jwt.verify(token, "secret_key");
    req.user = decodedUser.user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = auth;
