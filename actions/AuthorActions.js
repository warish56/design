const Author = require("./../schema/AuthorSchema");
const Encrypt = require("./../encrypt_decrypt_Password/Password");
const SendMail = require("./../email/SendMail");
const Keys = require("./../jwt/Keys");

addAuthor = async params => {
  // create a hashed password
  // send email verification link
  const isAuthorPresent = await Author.findOne({ email: params.email });
  if (isAuthorPresent)
    throw new Error("Author is Already Registered With Same Email -400");

  const dataObject = {
    name: params.name,
    description: params.description,
    email: params.email,
    phone: params.phone,
    password: await Encrypt.getHashedPassword(params.password)
  };

  // Not required Field checking
  if (params.experience) dataObject.experience = params.experience;
  const author = new Author(dataObject);
  const result = await author.save();
  if (!result) throw new Error("Internal Server Error -500");
  const token = await Keys.getJwtToken({
    _id: result._id,
    email: result.email
  });
  await SendMail.sendVerifyEmail(params.email, token, "author");

  return result;
};

getAuthor = async id => {
  const result = Author.findById(id).select("-password");
  if (!result) throw new Error("Invalid Author Id - 404");
  return result;
};

updateAuthor = async (id, params) => {
  const queryResult = await Author.findById(id);
  if (!queryResult) throw new Error(`Author Not Found -404`);
  const newAuthorObject = {
    ...queryResult,
    description: params.description,
    phone: params.phone,
    password: await Encrypt.getHashedPassword(params.password)
  };
  if (params.experience) newAuthorObjec.experience = params.experience;

  queryResult.set(newAuthorObject);
  const result = await queryResult.save();
  if (!result) throw new Error("Internal Server Error -500");
  return result;
};

module.exports.addAuthor = addAuthor;
module.exports.getAuthor = getAuthor;
module.exports.updateAuthor = updateAuthor;
