const validate = require("./BodyValidation");

validateDesignes = () => {
  return (req, res, next) => {
    try {
      req.errors = [
        ...new validate("Name", req.body.name).required().isValid(),
        ...new validate("Description", req.body.description)
          .required()
          .minlength(10)
          .isValid(),
        ...new validate("Author", req.body.author)
          .required()
          .isId()
          .isValid(),
        ...new validate("Likes", req.body.likes).min(0).isValid(),
        ...new validate("Tag", req.body.tag)
          .required()
          .notEmpty()
          .isValid(),
        ...new validate("Image link", req.file).required().isValid()
      ];
      console.log(req.errors);
      if (req.errors.length > 0) return res.status(400).send(req.errors[0]);
      else next();
    } catch (er) {
      console.log(er);
      return res.status(500).send("Internal Server error");
    }
  };
};

module.exports = validateDesignes;
