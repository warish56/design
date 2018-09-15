const Author = require("./../schema/AuthorSchema");
const Encrypt = require("./../helper/GetHashedPassword");
const Keys = require("./../jwt/Keys");

validateAuthor = async (email, password) => {
  //  first validate email
  //  check the email is present or not
  //  validate password

  const author = await Author.findOne({ email: email });
  if (!author) return 0;

  // first checking if email is verifed
  if (!author.confirm) return 403;
  //  checking if author has valid password
  const isAuthorPasswordValid = await Encrypt.verifyHashedPassword(
    password,
    author.password
  );
  if (!isAuthorPasswordValid) return 0;
  const token = await Keys.getJwtToken({ id: author._id, email: author.email });
  return token;
};

validateToken = () => {
  return (req, res, next) => {
    if (!req.header("design_token")) {
      res.status(400).send("No token found");
      return;
    }
    try {
      const decodedToken = Keys.verifyJwtToken(req.header("design_token"));
      if (decodedToken) {
        req.user = decodedToken;
        next();
      }
    } catch (ex) {
      console.log(ex);
      res.status(401).send("Invalid token");
    }
  };
};

confirmAuhtorAccount = async id => {
  const author = await Author.findById(id);
  author.confirm = true;
  const result = await author.save();
  return result;
};

verifyEmail = async token => {
  const result = Keys.verifyJwtToken(token);
  if (!result) return 0;
  else {
    const updateSuccessResult = await confirmAuhtorAccount(result._id);
    return updateSuccessResult;
  }
};

module.exports.validateAuthor = validateAuthor;
module.exports.validateToken = validateToken;
module.exports.verifyEmail = verifyEmail;
