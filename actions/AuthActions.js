const Author = require("./../schema/AuthorSchema");
const User = require("./../schema/UserSchema");
const Encrypt = require("./../helper/GetHashedPassword");
const Keys = require("./../jwt/Keys");

validatePerson = async (email, password, type) => {
  //  first validate email
  //  check the email is present or not
  //  validate password

  const person =
    type === "author"
      ? await Author.findOne({ email: email }).select({
          name: 1,
          email: 1,
          phone: 1
        })
      : await User.findOne({ email: email });
  if (!person) return 0;

  // first checking if email is verifed
  if (!person.confirm) return 403;
  //  checking if author has valid password
  const isPersonPasswordValid = await Encrypt.verifyHashedPassword(
    password,
    person.password
  );
  if (!isPersonPasswordValid) return 0;
  const token = await Keys.getJwtToken({ id: person._id, email: person.email });
  person.token = token;
  return person;
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

confirmUserAccount = async id => {
  const user = await User.findById(id);
  user.confirm = true;
  const result = await user.save();
  return result;
};

verifyEmail = async (token, type) => {
  const result = Keys.verifyJwtToken(token);
  if (!result) return 0;
  else {
    const updateSuccessResult =
      type === "author"
        ? await confirmAuhtorAccount(result._id)
        : await confirmUserAccount(result._id);

    if (!updateSuccessResult) return -1;
    else return 200;
  }
};

module.exports.validatePerson = validatePerson;
module.exports.validateToken = validateToken;
module.exports.verifyEmail = verifyEmail;
