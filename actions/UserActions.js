const mongoose = require("mongoose");
const User = require("./../schema/UserSchema");
const Encrypt = require("./../helper/GetHashedPassword");
const SendMail = require("./../email/SendMail");
const Keys = require("./../jwt/Keys");

addUser = async params => {
  const user = await User.findOne({ email: params.email });
  if (user) return 0;

  const dataObject = {
    name: params.name,
    email: params.email,
    phone: params.phone,
    password: await Encrypt.getHashedPassword(params.password)
  };

  const newUser = new User(dataObject);
  const result = await newUser.save();
  if (result) {
    const token = await Keys.getJwtToken({
      _id: result._id,
      email: result.email
    });
    await SendMail(params.email, token, "user");
  }

  return result;
};

module.exports.addUser = addUser;
