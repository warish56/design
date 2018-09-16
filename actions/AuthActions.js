const Author = require("./../schema/AuthorSchema");
const User = require("./../schema/UserSchema");
const Encrypt = require("../encrypt_decrypt_Password/Password");
const Keys = require("./../jwt/Keys");
const SendMail = require("./../email/SendMail");

//  Middleware
validateToken = () => {
  return (req, res, next) => {
    if (!req.header("design_token")) {
      res.status(400).send("No token found");
      return;
    }
    try {
      const decodedToken = Keys.verifyJwtToken(req.header("design_token"));
      if (decodedToken.type === "user") {
        res.status(403).send("Unauthorized");
        return;
      }
      req.user = decodedToken;
      next();
    } catch (ex) {
      console.log(ex);
      res.status(401).send("Invalid token");
    }
  };
};

verifyResetPasswordToken = () => {
  return (req, res, next) => {
    if (!req.params.token) {
      res.status(400).send("No token found");
      return;
    }
    try {
      const decodedToken = Keys.verifyJwtToken(req.params.token);
      req.token = decodedToken;
      next();
    } catch (ex) {
      res.status(401).send("Invalid token");
    }
  };
};

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
      : await User.findOne({ email: email }).select({
          name: 1,
          email: 1,
          phone: 1
        });
  if (!person) throw new Error("Invalid crdentials -404");

  // first checking if email is verifed
  if (!person.confirm) throw new Error("Please verify Your Email -403");
  //  checking if author has valid password
  const isPersonPasswordValid = await Encrypt.verifyHashedPassword(
    password,
    person.password
  );
  if (!isPersonPasswordValid) throw new Error("Invalid crdentials -404");
  const token = await Keys.getJwtToken({
    id: person._id,
    email: person.email,
    type
  });
  person.token = token;
  return person;
};

confirmAuhtorAccount = async id => {
  const author = await Author.findById(id);
  if (!author) throw new Error("Author Not Found -404");
  author.confirm = true;
  const result = await author.save();
  return result;
};

confirmUserAccount = async id => {
  const user = await User.findById(id);
  if (!user) throw new Error("User Not Found -404");
  user.confirm = true;
  const result = await user.save();
  return result;
};

verifyEmail = async (token, type) => {
  const result = Keys.verifyJwtToken(token);
  if (!result) throw new Error("Invalid Token - 400");
  else {
    const updateSuccessResult =
      type === "author"
        ? await confirmAuhtorAccount(result._id)
        : await confirmUserAccount(result._id);

    if (!updateSuccessResult) throw new Error("User Not Found -404");
    else return 200;
  }
};

sendResetPasswordLink = async (email, type) => {
  const token = await Keys.getJwtToken({ email, type });
  if (!token) throw new Error("Internal Server Error -500");
  const result = await SendMail.sendResetEmail(email, token, type);
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

resetPassword = async (token, password) => {
  const person =
    token.type === "author"
      ? await Author.findOne({ email: token.email }).select({
          email: 1,
          password: 1
        })
      : await User.findOne({ email: token.email }).select({
          email: 1,
          password: 1
        });
  if (!person) throw new Error("User Not Fount -404");
  person.password = await Encrypt.getHashedPassword(password);
  const result = await person.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

module.exports.validatePerson = validatePerson;
module.exports.validateToken = validateToken;
module.exports.verifyEmail = verifyEmail;
module.exports.resetPassword = resetPassword;
module.exports.verifyResetPasswordToken = verifyResetPasswordToken;
module.exports.sendResetPasswordLink = sendResetPasswordLink;
