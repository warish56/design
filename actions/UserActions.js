const mongoose = require("mongoose");
const User = require("./../schema/UserSchema");
const Encrypt = require("./../encrypt_decrypt_Password/Password");
const SendMail = require("./../email/SendMail");
const Keys = require("./../jwt/Keys");

addUser = async params => {
  const user = await User.findOne({ email: params.email });
  if (user) throw new Error("User Already registered With The same Email -400");

  const dataObject = {
    name: params.name,
    email: params.email,
    phone: params.phone,
    password: await Encrypt.getHashedPassword(params.password)
  };

  const newUser = new User(dataObject);
  const result = await newUser.save();
  if (!result) throw new Error("Internal Server Error -500");

  const token = await Keys.getJwtToken({
    _id: result._id,
    email: result.email
  });
  await SendMail.sendVerifyEmail(params.email, token, "user");
  return result;
};

module.exports.addUser = addUser;
