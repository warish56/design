const validate = require("./BodyValidation");

validateResetPassword = () => {
  return (req, res, next) => {
    try {
      req.errors = [
        ...new validate("Password", req.body.password)
          .required()
          .minlength(6)
          .isValid()
      ];

      if (req.errors.length > 0) return res.status(400).send(req.errors[0]);
      else next();
    } catch (er) {
      res.status(500).send("Internal Server error");
      return;
    }
  };
};

module.exports = validateResetPassword;
