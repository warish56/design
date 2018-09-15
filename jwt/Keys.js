const jwt = require("jsonwebtoken");
const config = require("config");

getJwtToken = async details => {
  const result = await jwt.sign(details, config.get("jwtPrivateKey"));
  return result;
};

verifyJwtToken = key => {
  return jwt.verify(key, config.get("jwtPrivateKey"));
};

module.exports.getJwtToken = getJwtToken;
module.exports.verifyJwtToken = verifyJwtToken;
