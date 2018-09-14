const Author = require("./../schema/AuthorSchema");
const Encrypt = require("./../helper/GetHashedPassword");
const config = require("config");
const jwt = require("jsonwebtoken");

validateAuthor = async (email, password) => {
  //  first validate email
  //  check the email is present or not
  //  validate password

  const author = await Author.findOne({ email: email });

  if (!author) return 0;
  const isAuthorPasswordValid = Encrypt.verifyHashedPassword(
    password,
    author.password
  );
  if (!isAuthorPasswordValid) return 0;
  const token = await jwt.sign(
    { id: author._id, email: author.email },
    // config.get("jwtPrivateKey")
    "5161716516516"
  );
  return token;
};

validateToken = () => {
  return (req, res, next) => {
    if (!req.header("design_token")) {
      res.status(400).send("No token found");
      return;
    }
    try {
      if (jwt.verify(req.header("design_token"), "5161716516516")) next();
    } catch (ex) {
      res.status(401).send("Invalid token");
    }
  };
};

module.exports.validateAuthor = validateAuthor;
module.exports.validateToken = validateToken;
