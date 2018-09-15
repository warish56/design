const mongoose = require("mongoose");

validate = function(fieldname, value) {
  let errors = [];

  this.required = () => {
    if (!value) errors = [...errors, `${fieldname} is required`];
    return this;
  };

  this.isId = () => {
    if (!mongoose.Types.ObjectId.isValid(value))
      errors = [...errors, `${fieldname} is Not  Valid`];
    return this;
  };

  this.notEmpty = () => {
    if (value && value.length < 1)
      errors = [...errors, `${fieldname} should not be empty`];
    return this;
  };

  this.min = min => {
    if (value && value < min)
      errors = [...errors, `${fieldname}  should be minimum ${min} `];
    return this;
  };

  this.max = max => {
    if (value && value > max)
      errors = [...errors, `${fieldname} should be maximum ${max}`];
    return this;
  };

  this.minlength = min => {
    if (value && value.length < min)
      errors = [
        ...errors,
        `${fieldname} length should be minimum ${min} characters`
      ];
    return this;
  };

  this.maxlength = max => {
    if (value && value.length > max)
      errors = [
        ...errors,
        `${fieldname} length should be maximum ${max}characters`
      ];
    return this;
  };

  this.isValid = () => {
    return errors;
  };
};

module.exports = validate;
