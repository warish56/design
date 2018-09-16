const validate = require("./BodyValidation");

validateUser = () => {
  return (req, res, next) => {
    try {
      req.errors = [
        ...new validate("Name", req.body.name)
          .required()
          .minlength(3)
          .isValid(),
        ...new validate("Password", req.body.password)
          .required()
          .minlength(6)
          .isValid(),
        ...new validate("Phone", req.body.phone).required().isValid(),
        ...new validate("Email", req.body.email).required().isValid()
      ];
      console.log(req.errors);
      if (req.errors.length > 0) return res.status(400).send(req.errors[0]);
      else next();
    } catch (er) {
      res.status(500).send("Internal Server error");
      return;
    }
  };
};

module.exports = validateUser;
